const gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('build', function() {
    return gulp.src(['src/*.js'])
        .pipe(concat('bulkactions.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({output: {comments: '/^!/'}}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
