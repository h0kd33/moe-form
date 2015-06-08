'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var livereload = require('gulp-livereload');

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
      '*.html'
    ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Watch Files For Changes & Reload
gulp.task('serve', [], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['./'],
      routes: {
        'bower_components': '../bower_components/'
      }
    }
  });

  gulp.watch(['*.html'], reload);
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['*.html']).on('change', livereload.changed);
});

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
try { require('web-component-tester').gulp.init(gulp); } catch (err) {}
