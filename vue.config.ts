module.exports = {
  devServer: {
    proxy: {
      '^/storage/fef677cdf46481c8d96f8cd/2017/02/file_example_XLS_10.xls': {
        target: 'https://file-examples.com/',
        ws: true,
        changeOrigin: true
      },
    }
  }
}