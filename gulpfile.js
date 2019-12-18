'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
  del = require('del'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  htmlreplace = require('gulp-html-replace'),
  cssmin = require('gulp-cssmin');

const { series, parallel } = require('gulp');

gulp.task('concatScripts', function() {
  return gulp
    .src([
      'assets/js/vendor/jquery-3.3.1.min.js',
      'assets/js/vendor/popper.min.js',
      'assets/js/vendor/bootstrap.min.js',
      'assets/js/vendor/owl.carousel.min.js',
    ])
    .pipe(maps.init())
    .pipe(concat('main.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('assets/js'))
    .pipe(browserSync.stream());
});

gulp.task(
  'minifyScripts',
  series('concatScripts', function() {
    return gulp
      .src('assets/js/main.js')
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest('docs/assets/js'));
  })
);

gulp.task('compileSass', function() {
  return gulp
    .src('assets/css/main.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

gulp.task(
  'minifyCss',
  series('compileSass', function() {
    return gulp
      .src('assets/css/main.css')
      .pipe(cssmin())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('docs/assets/css'));
  })
);

gulp.task('minifyImages', function() {
  return gulp
    .src('assets/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/assets/img'));
});

gulp.task('watchFiles', function() {
  gulp.watch('assets/css/**/*.scss', series('compileSass'));
  gulp.watch('assets/js/*.js', series('concatScripts'));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
});

gulp.task('clean', function() {
  return del(['docs', 'assets/css/main.css*', 'assets/js/main*.js*']);
});

gulp.task('renameSources', function() {
  return gulp
    .src('*.html')
    .pipe(
      htmlreplace({
        js: 'assets/js/main.min.js',
        css: 'assets/css/main.min.css',
      })
    )
    .pipe(gulp.dest('docs/'));
});

gulp.task(
  'build',
  series(['minifyScripts', 'minifyCss'], function() {
    return gulp
      .src(
        [
          '*.html',
          '*.php',
          '*.css',
          'favicon.ico',
          'assets/css/theme.css',
          'assets/js/theme.js',
          'assets/fonts/**',
        ],
        {
          base: './',
        }
      )
      .pipe(gulp.dest('docs'));
  })
);

gulp.task('serve', function(done) {
  browserSync.init({
    server: './',
  });

  gulp.watch('assets/css/**/*.scss', series('watchFiles'));
  gulp.watch('*.html').on('change', browserSync.reload);
  done();
});

gulp.task(
  'default',
  series(['clean', 'build', 'minifyImages', 'renameSources'])
);
