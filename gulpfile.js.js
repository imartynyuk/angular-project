var gulp = require('gulp'),
    sass = require('gulp-sass'),
    spritesmith = require("gulp.spritesmith"),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean');

//Scss
gulp.task('scss', function () {
    gulp.src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({errLogToConsole: true}))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('app/css'));
});

// Sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('app/images/sprite/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            imgPath: '../images/sprite.png',
            cssName: '_sprite.scss',
            cssFormat: 'scss',
            algorithm: 'left-right',
        }));

    spriteData.img.pipe(gulp.dest('app/images/'));
    spriteData.css.pipe(gulp.dest('app/scss/'));
});

// Clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

// Watch
gulp.task('watch', function () {
    gulp.watch('app/images/sprite/**/*.*', ['sprite']);
    gulp.watch('app/scss/*.scss', ['scss']);
});

// Build
gulp.task('build', ['clean', 'sprite', 'scss'], function () {
    var assets = useref.assets();
    
    gulp.src([
        'app/**/.htaccess',
        'app/**/*.*',
        '!app/*.html',
        '!app/scss/**/*.*',
        '!app/css/**/*.*',
        '!app/js/**/*.js'
    ]).pipe(gulp.dest('dist'));
    
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});