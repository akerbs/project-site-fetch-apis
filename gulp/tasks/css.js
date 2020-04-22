const { src, dest } = require('gulp');
// sass
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');

module.exports = (settings) => {
  const { mode } = settings;

  const css = (done) => {
    const sourceFile = './dev/assets/scss/main.scss';
    const targetFolder = 'assets/css';

    src(sourceFile)
      .pipe(gulpif(mode.dev, sourcemaps.init()))
      .pipe(plumber())
      .pipe(
        sass({
          outputStyle: 'expanded',
          errLogToConsole: true,
          sourceMap: true
        })
      ) // Modulaufruf
      .pipe(autoprefixer())
      .pipe(gulpif(mode.prod, gcmq()))
      .pipe(gulpif(mode.prod, cleanCss()))
      .pipe(gulpif(mode.dev, sourcemaps.write()))
      .pipe(dest(targetFolder));
    done();
  };
  return {
    task: css
  };
};
