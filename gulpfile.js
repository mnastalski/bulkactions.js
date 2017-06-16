const gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stripDebug = require('gulp-strip-debug');

gulp.task('default', ['build']);


gulp.task('build', function() {
    return gulp.src(['src/*.js'])
        .pipe(concat('bulkactions.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(stripDebug())
        .pipe(uglify({output: {comments: '/^!/'}}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-debug', function() {
    return gulp.src(['src/*.js'])
        .pipe(concat('bulkactions.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});
