'use strict';

const gulp = require("gulp");
const concat = require("gulp-concat");
const minifyJS = require("gulp-uglify");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");
const del = require("del");
const imagemin = require("gulp-imagemin");
const minifyCSS = require('gulp-clean-css');
const serve = require('gulp-serve');

// Reset (delete all content in) the 'dist' folder
gulp.task('clean', function() {
  return del([
    'dist/**'
  ]);
});

// Concatenate and minify all JS files and copy to 'dist/scripts'
gulp.task('scripts', ['clean'], function(){
  return gulp.src([
    'js/circle/autogrow.js',
    'js/circle/circle.js',
    'js/global.js'])
    .pipe(maps.init())
    .pipe(concat("all.min.js"))
    .pipe(minifyJS())
    .pipe(maps.write('./'))
    .pipe(gulp.dest("dist/scripts"));
});

// Compile SCSS to CSS, concatenate and minify, and copy to 'dist/styles'
gulp.task('styles', ['clean'], function(){
  return gulp.src([
    'sass/global.scss',
    'sass/_variables.scss'])
    .pipe(maps.init())
    .pipe(sass())
    .pipe(concat("all.min.css"))
    .pipe(minifyCSS())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/styles'))
});

// Minify all images in image folder and copy to dist/content
gulp.task('images', ['clean'], function() {
  gulp.src('images/*')
         .pipe(imagemin())
         .pipe(gulp.dest('dist/content'))
});

// Serve the build on localhost 3000 after the build has completed
gulp.task('serveBuild', ['build'], serve({
    root: ['./', 'build'],
    port: 3000
  })
);

// Run all tasks
gulp.task('build', ['clean', 'scripts', 'styles', 'images']);

// Make the build task the default gulp task
gulp.task('default', ['build', 'serveBuild']);
