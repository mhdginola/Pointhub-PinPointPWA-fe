import { MediaServices } from './MediaServices'

import { DEFAULT_SIZE_FACTOR, DEFAULT_IMAGE_COMPRESSION, DEFAULT_IMAGE_MIRROR } from './constants'

const DEFAULT_IMAGE_TYPE = MediaServices.IMAGE_TYPES.PNG

export class CameraPhoto {
  public videoElement: any
  public stream: any
  public numberOfMaxResolutionTry: number
  public settings: any
  public cameras: any[]
  public windowURL: any
  public mediaDevices: any
  constructor(videoElement: any) {
    this.videoElement = videoElement
    this.stream = null
    this.numberOfMaxResolutionTry = 0
    this.settings = null
    this.cameras = []

    // Set the right object depending on the browser.
    this.windowURL = MediaServices.getWindowURL()
    this.mediaDevices = MediaServices.getNavigatorMediaDevices()
  }

  _getStreamDevice(idealCameraDevice: any, idealResolution: any) {
    return new Promise((resolve, reject) => {
      let constraints = MediaServices.getIdealConstraints(idealCameraDevice, idealResolution)

      this.mediaDevices
        .getUserMedia(constraints)
        .then((stream: any) => {
          this._gotStream(stream)
          resolve(stream)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  _getStreamDeviceMaxResolution(idealCameraDevice: any) {
    let constraints = MediaServices.getMaxResolutionConstraints(
      idealCameraDevice,
      this.numberOfMaxResolutionTry
    )

    // all the trying is done...
    if (constraints == null) {
      let idealResolution = {}
      return this._getStreamDevice(idealCameraDevice, idealResolution)
    }

    return new Promise((resolve, reject) => {
      this.mediaDevices
        .getUserMedia(constraints)
        .then((stream: any) => {
          this._gotStream(stream)
          resolve(stream)
        })
        .catch((error: any) => {
          setTimeout(() => {
            this.numberOfMaxResolutionTry += 1
            this._getStreamDeviceMaxResolution(idealCameraDevice).catch(() => {
              reject(error)
            })
          }, 20)
        })
    })
  }

  _setVideoSrc(stream: any) {
    if ('srcObject' in this.videoElement) {
      this.videoElement.srcObject = stream
    } else {
      // using URL.createObjectURL() as fallback for old browsers
      let videoSrc = this.windowURL.createObjectURL(stream)
      this.videoElement.src = videoSrc
    }
  }

  _setSettings(stream: any) {
    // default setting is null
    this.settings = null
    const tracks = stream && stream.getTracks ? stream.getTracks() : []

    if (tracks.length > 0 && tracks[0].getSettings) {
      this.settings = tracks[0].getSettings()
    }
  }

  _enumerateCamerasPromise() {
    return new Promise((resolve, reject) => {
      // only make shure the camera is sarted

      let cameras: any[] = []
      this.mediaDevices
        .enumerateDevices()
        .then(function (devices: any) {
          devices.forEach(function (device: any) {
            if (device.kind === 'videoinput' && device.deviceId) {
              cameras.push(device)
            }
          })
          resolve(cameras)
        })
        .catch(function (err: any) {
          reject(err)
        })
    })
  }

  _gotStream(stream: any) {
    this.stream = stream
    this._setSettings(stream)
    this._setVideoSrc(stream)
  }

  getCameraSettings() {
    return this.settings
  }

  enumerateCameras() {
    // If the camera is already started, return only the promise.
    if (this.stream) {
      return this._enumerateCamerasPromise()
    }

    // We don't know if the camera is granted so we need to start
    // and stop the camera and then return the promise.
    return this.stopCamera()
      .then(() => {})
      .catch(() => {})
      .then(() => {
        const constraints = { video: true }
        return this.mediaDevices
          .getUserMedia(constraints)
          .then((stream: any) => {
            // Wait 20 ms before stop the camera.
            setTimeout(() => {
              stream.getTracks().forEach(function (track: any) {
                track.stop()
              })
            }, 20)
          })
          .then(() => {})
          .catch(() => {})
          .then(() => {
            return this._enumerateCamerasPromise()
          })
      })
  }

  startCamera(idealCameraDevice: any, idealResolution: any) {
    // stop the stream before playing it.
    return (
      this.stopCamera()
        .then(() => {})
        .catch(() => {})
        // Always called (when the promise is done)
        .then(() => {
          return this._getStreamDevice(idealCameraDevice, idealResolution)
        })
    )
  }

  startCameraMaxResolution(idealCameraDevice = '') {
    this.numberOfMaxResolutionTry = 0
    // stop the stream before playing it.
    return (
      this.stopCamera()
        .then(() => {})
        .catch(() => {})
        // Always called (when the promise is done)
        .then(() => {
          return this._getStreamDeviceMaxResolution(idealCameraDevice)
        })
    )
  }

  getDataUri(userConfig: any) {
    let config = {
      sizeFactor: userConfig.sizeFactor === undefined ? DEFAULT_SIZE_FACTOR : userConfig.sizeFactor,
      imageType: userConfig.imageType === undefined ? DEFAULT_IMAGE_TYPE : userConfig.imageType,
      imageCompression:
        userConfig.imageCompression === undefined
          ? DEFAULT_IMAGE_COMPRESSION
          : userConfig.imageCompression,
      isImageMirror:
        userConfig.isImageMirror === undefined ? DEFAULT_IMAGE_MIRROR : userConfig.isImageMirror
    }

    let dataUri = MediaServices.getDataUri(this.videoElement, config)
    return dataUri
  }

  stopCamera() {
    return new Promise((resolve, reject) => {
      if (this.stream) {
        this.stream.getTracks().forEach(function (track: any) {
          track.stop()
        })
        this.videoElement.src = ''
        this.stream = null
        this._setSettings(null)
        resolve(true)
      }
      reject(Error('no stream to stop!'))
    })
  }
}
