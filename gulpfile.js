var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  babel = require("gulp-babel"),
  concat = require("gulp-concat"),
  browserSync = require('browser-sync').create();

// Browser-Sync
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
});
// Reload
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// Build Bootstrap Theme
gulp.task('sass', function() {
  return gulp.src(['scss/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: [
      'Chrome >= 35',
      'Firefox >= 38',
      'Edge >= 12',
      'Explorer >= 10',
      'iOS >= 8',
      'Safari >= 8',
      'Android 2.3',
      'Android >= 4',
      'Opera >= 12']})]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
});

// Babel
gulp.task('babel', function() {
  gulp.src('javascripts/babel/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('custom.js'))
      .pipe(babel().on('error', onError))
      .pipe(gulp.dest('javascripts'))
      .pipe(browserSync.stream())
});

// Auto Watch
gulp.task('watch', ['sass', 'babel', 'browser-sync'], function() {
  gulp.watch(['scss/*.scss'], ['sass']);
  gulp.watch('javascripts/babel/*.js', ['babel']);
  gulp.watch('**/*.html', ['bs-reload']);
});

gulp.task('default', ['watch']);

// Make sure to not break watch when error occurs
function onError(err) {
  console.log(err);
  this.emit('end');
}
