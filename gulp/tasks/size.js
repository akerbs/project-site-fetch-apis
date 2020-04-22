/**
 * Size Report
 */
const { src } = require('gulp');
const sizeReport = require('gulp-sizereport');

module.exports = (settings) => {
  const sourceFiles = './assets/**/*.+(css|js)';

  const size = (done) => {
    src(sourceFiles).pipe(sizeReport());
    done();
  };

  return {
    task: size
  };
};
