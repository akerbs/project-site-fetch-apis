/**
 * Build font assets
 * */
const { src, dest } = require('gulp');
const path = require('path');

module.exports = (settings) => {
  const fonts = (done) => {
    const sourceFiles = './dev/assets/fonts/**';
    const targetFolder = './assets/fonts';

    src(sourceFiles).pipe(dest(targetFolder));
    done();
  };
  return {
    task: fonts
  };
};
