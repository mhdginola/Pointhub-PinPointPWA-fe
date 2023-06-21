// https://docs.cypress.io/api/introduction/api.html


describe('Create Attendance', () => {
  describe('user not login', () => {
    beforeEach(()=>{
      cy.visit('/attendances')
    })

    it('1.1 create attendance failed, user not login, redirect login page', () => {
      cy.location('pathname').should('eq', '/login')
    })
  })
  describe('user login', () => {
    describe('access camera denied', () => {
      beforeEach(()=>{
        cy.visit('/login')
        cy.get('button.login-google').click()
        cy.visit('/')
        cy.visit('/attendances')
        cy.window().then((win: Window) => {
          cy.stub(win.navigator.mediaDevices, 'getUserMedia')
            .rejects(new Error('Failed to access camera'));
        });
      })

      it('1.2 get access camera failed', () => {
        cy.get('.modal-access-camera-failed').should('be.visible')
        cy.contains('Buka pengaturan perangkat Anda.')
        cy.contains('Cari opsi "Privasi" atau "Keamanan" dan masuk ke dalamnya.')
        cy.contains('Cari opsi "Camera" atau "Izin Camera" dan buka.')
        cy.contains('Aktifkan opsi "Izinkan Aplikasi Mengakses Camera" atau serupa.')
        cy.contains('Anda juga dapat memilih pengaturan yang lebih spesifik untuk setiap aplikasi yang terdaftar di bawah opsi tersebut.')
      })
    })
    describe('access camera success, access location denied', () => {
      beforeEach(()=>{
        cy.visit('/login')
        cy.get('button.login-google').click()
        cy.visit('/')
        cy.visit('/attendances')
        cy.window().then((win: any) => {
          return win.navigator.mediaDevices.getUserMedia({ video: true });
        })
        .then((stream: MediaStream) => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
        });
        cy.window().then((win: Window) => {
          cy.stub(win.navigator.geolocation, 'getCurrentPosition')
            .callsFake((successCallback, errorCallback) => {
              const error = new Error('Failed to retrieve location');
              const positionError = {
                code: 2, // POSITION_UNAVAILABLE
                message: error.message,
              };
              errorCallback(positionError);
            });
        });
      })

      it('1.2 get access location failed', () => {
        cy.get('.modal-access-location-failed').should('be.visible')
        cy.contains('Buka pengaturan perangkat Anda.')
        cy.contains('Cari opsi "Privasi" atau "Keamanan" dan masuk ke dalamnya.')
        cy.contains('Cari opsi "Lokasi" atau "Izin Lokasi" dan buka.')
        cy.contains('Aktifkan opsi "Izinkan Aplikasi Mengakses Lokasi" atau serupa.')
        cy.contains('Anda juga dapat memilih pengaturan yang lebih spesifik untuk setiap aplikasi yang terdaftar di bawah opsi tersebut.')
      })
    })
    describe('access camera success, access location success', () => {
      beforeEach(()=>{
        cy.visit('/login')
        cy.get('button.login-google').click()
        cy.visit('/')
        cy.visit('/attendances')
        cy.window().then((win: any) => {
          return win.navigator.mediaDevices.getUserMedia({ video: true });
        })
        .then((stream: MediaStream) => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();
        });
        cy.window().then((win: Window) => {
          cy.stub(win.navigator.geolocation, 'getCurrentPosition')
            .callsFake((callback) => {
              const position = {
                coords: {
                  latitude: 51.5074, // Replace with the desired latitude
                  longitude: -0.1278, // Replace with the desired longitude
                },
              };
              callback(position);
            });
        });
      })
      it('1.1 create attendance failed, user has no access, redirect dashboard with message no access', () => {
        cy.location('pathname').should('eq', '/')
      })
      it('1.3 create attendance failed, field required, show message field required', () => {
        cy.get('input[name="photo"]').selectFile('')
        cy.get('input[name="location"]').type('')
        cy.get('input[name="tagLocation"]').type('')
        cy.get('form.action-form-attendance').submit()
        cy.get('.modal-add-attendance-failed').should('be.visible')
        cy.contains('required')
      })
      it('1.4 create new tag Location', () => {
        cy.get('button.add-tagLocation').click()
        cy.get('.modal-add-tagLocation').should('be.visible')
        cy.get('form.action-form-tagLocation').submit()
        cy.contains('Create tag location Success')
      })
      it('1.5 create attendance success', () => {
        cy.get('input[name="photo"]').selectFile('cypress/fixtures/red.png')
        cy.get('input[name="location"]').type('1')
        cy.get('input[name="tagLocation"]').type('1')
        cy.get('form.action-form-attendance').submit()
        cy.visit('/')
        cy.get('.modal-add-attendance-success').should('be.visible')
        cy.contains('Create Success')
      })
    })
  })
})
