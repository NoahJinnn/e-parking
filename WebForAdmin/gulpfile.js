'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-csso');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();

let source = 'assets/dev/',
    dest = 'public/client-asset/';

let bootstrapSass = {
    in: './node_modules/bootstrap-sass/',
    new: './node_modules/bootstrap/',
};

// Our scss source folder: .scss files
let scss = {
    in: source + 'sass/main.scss',
    out: dest + 'css/',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.new + 'scss'],
    },
};

// Compile scss
gulp.task('sass', function () {
    return gulp.src(scss.in).pipe(sass(scss.sassOpts)).pipe(minifyCSS()).pipe(gulp.dest(scss.out)).pipe(browserSync.stream());
});

// Build task
gulp.task('build', gulp.series('sass'));

// Watch task
gulp.task('watch', function () {
    browserSync.init({
        proxy: 'http://localhost:3002',
    });
    gulp.watch(source + 'sass/**/*', gulp.series('sass'));
});

// Development task
gulp.task('dev', gulp.series('sass', 'watch'));
