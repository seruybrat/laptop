var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    babel        = require('gulp-babel'),
    jshint       = require('gulp-jshint'),
    concat       = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglifyjs'),
    fileinclude  = require('gulp-file-include');
    concat       = require('gulp-concat');

gulp.task('fileinclude', function() {
    gulp.src([
        'src/components/*.html'
        ])
        .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
        }))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({stream: true}))
    });

gulp.task('sass', function() {
    return gulp.src('src/styles/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifycss())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('src/styles/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
    return gulp.src('src/components/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(jshint({'browser': true, 'node': true}))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src',
            index: "index.html"
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/components/*.html', ['fileinclude', browserSync.reload]);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/components/**/*.html', ['fileinclude', browserSync.reload]);
    gulp.watch('src/js/**/*.js', ['scripts', browserSync.reload]);
    gulp.watch('src/components/**/*.js', ['scripts', browserSync.reload]);
});

gulp.task('build', ['sass', 'scripts'], function() {

    var buildCss = gulp.src('src/styles/css/main.css')
    .pipe(gulp.dest('dist/styles/css'));

    var buildImg = gulp.src('src/img/**.*')
    .pipe(gulp.dest('dist/img'));

    var buildJs = gulp.src('src/js/main.min.js')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));

})

gulp.task('default', ['watch']);
