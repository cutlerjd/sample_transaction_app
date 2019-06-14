const devServerHost = process.env.DOCKERIZED === "true" ? 'http://api:3001' : 'http://localhost:3001';

module.exports = {
    css: {
      loaderOptions: {
        sass: {
          data: `@import "@/scss/mytheme.scss";`
        }
      }
    },
    devServer: {
      proxy: {
        '/api/v1': {
          target: devServerHost,
          pathRewrite: {'^/api/v1' : ''},
          ws: true,
          changeOrigin: true
        }
      },
      watchOptions: { // Only needed for Windows hosts
        poll: true
      }
    }
  };
