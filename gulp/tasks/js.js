/**
 * JS - Task
 */
// const path = require('path');

const { src, dest } = require('gulp');
const browserify = require('browserify'); // import in JS wird möglich (module bundler)
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify'); // js - komprimiert
const babelify = require('babelify'); // ES6 (ECMAScript 2015) in ES5
const stripDebug = require('gulp-strip-debug');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

module.exports = (settings) => {
  const { mode } = settings;

  const js = () => {
    const sourceFile = './dev/assets/js/main.js';
    const targetFolder = 'assets/js';

    return browserify({
      entries: sourceFile,
      debug: mode.dev // Remove sourcemap and debug output for production
    })
      .transform(
        babelify.configure({
          presets: ['@babel/preset-env']
        })
      )
      .bundle()
      .on('error', (err) => {
        console.log(`Error: ${err.message}`);
      })
      .pipe(plumber())
      .pipe(source('main.js'))
      .pipe(dest(targetFolder));
  };

  const compress = (done) => {
    const sourceFile = 'assets/js/main.js';
    const targetFolder = 'assets/js';

    src(sourceFile)
      .pipe(stripDebug())
      // .pipe(
      //   rename({
      //     suffix: '.min'
      //   })
      // )
      .pipe(uglify())
      .pipe(dest(targetFolder));

    done();
  };

  return {
    task: js,
    build: {
      compress
    }
  };
};
