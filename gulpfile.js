const gulp = require('gulp'); // Initialize gulp 
const imagemin = require('gulp-imagemin');
const filter = require("gulp-filter");
const gzip = require("gulp-gzip");
const minify = require("gulp-minify");
let del = require('del');

gulp.task('clean', function () {
    return del('./dist/**', {force:true});
});

gulp.task("optimize-image", () => {
    return gulp
        .src('src/assets/*.png').pipe(imagemin()).pipe(gulp.dest('dist/FAQS-claro/assets/'));
});

gulp.task("css-gzip", () => {
    return gulp
        .src("dist/FAQS-claro/*")
        .pipe(filter(["**/*.css", "!**/*.br.*", "!**/*.gzip.*"]))
        .pipe(gzip({ append: false }))
        
        .pipe(gulp.dest("dist/FAQS-claro/"));
});

gulp.task('minifyjs', function () {
    return gulp.src('dist/FAQS-claro/*.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true, preserveComments: 'some', mangle:false}))
        .pipe(gzip())
        .pipe(gulp.dest('dist/FAQS-claro/'))
});

