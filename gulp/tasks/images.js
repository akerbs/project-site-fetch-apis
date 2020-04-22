/**
 * Build Images
 */
const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin');
const path = require('path');
const plumber = require('gulp-plumber');
const imageminJpegtran = require('imagemin-jpegtran');

module.exports = (settings) => {
  const images = (done) => {
    const sourceFiles = [
      './dev/assets/images/**/*.+(jpg|jpeg|gif|png|svg)',
      './dev/assets/images/*.+(jpg|jpeg|gif|png|svg)'
    ];
    const targetFolder = 'assets/images';

    src(sourceFiles)
      .pipe(plumber())
      .pipe(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imageminJpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
          })
        ])
      )
      .pipe(dest(targetFolder));

    done();
  };

  return {
    task: images
  };
};
