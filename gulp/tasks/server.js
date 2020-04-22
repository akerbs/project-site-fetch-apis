// server
const browserSync = require('browser-sync').create();
const connect = require('gulp-connect-php');

module.exports = (settings) => {
  const server = (done) => {
    // connect.server({}, () => {
    browserSync.init({
      // proxy: '127.0.0.1:8000'
      server: {
        baseDir: './'
      },
      // port: 8081
      port: process.env.port || 3000
    });
    done();
    // });
  };

  const reload = (done) => {
    browserSync.reload();
    done();
  };

  return {
    task: server,
    reload
  };
};
