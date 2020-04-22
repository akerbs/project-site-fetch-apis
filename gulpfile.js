const { task, series, parallel, watch } = require('gulp');
const mode = require('./gulp/helpers/mode');

const settings = { mode };

// task modules
const css = require('./gulp/tasks/css')(settings);
const server = require('./gulp/tasks/server')(settings);
const js = require('./gulp/tasks/js')(settings);
const fonts = require('./gulp/tasks/fonts')(settings);
const size = require('./gulp/tasks/size')(settings);
const images = require('./gulp/tasks/images')(settings);

task('watcher', () => {
  watch(
    ['./dev/assets/scss/**/*.scss', './dev/assets/scss/*.scss'],
    series(css.task, server.reload)
  );
  watch(['./dev/assets/fonts/**'], series(fonts.task, server.reload));

  watch(['./dev/assets/js/*.js'], series(js.task, server.reload));

  watch(['./**/*.html', './*.html'], series(server.reload));
  console.log('STRG + C to close');
});

if (mode.dev) {
  // - DEVELOPMENT MODE
  // Standard - Task kann direkt über den Konsolenbefehl "gulp" aufgerufen
  task(
    'default',
    series(
      parallel(css.task, js.task),
      images.task,
      fonts.task,
      parallel(server.task, 'watcher')
    )
  );
} else {
  // - PRODUCTION MODE
  task(
    'default',
    series(
      parallel(css.task, js.task),
      images.task,
      fonts.task,
      js.build.compress,
      size.task
    )
  );
}

task('test', (done) => {
  console.log('Test Gulp Task.');
  done(); // Task fertig
});
