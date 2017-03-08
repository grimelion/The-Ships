const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

gulp.task('sass', () => {
    return gulp.src([
            'src/**/*.scss'
        ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build'));       
});

gulp.task('default', () => {
    return gulp.src([
            'src/app/**/*.ts'
        ])
        .pipe(ts({
            module: 'commonjs'
        }))
        .pipe(gulp.dest('build/app'));
});

gulp.task('html', () => {
    return gulp.src([
            'src/app/client/**/*.html'
        ])
        .pipe(gulp.dest('build/app/js'));
});

gulp.task('vendors', () => {
    return gulp.src([
            'node_modules/lodash/lodash.min.js', 
            'node_modules/three/build/three.min.js' 
        ])
        .pipe(gulp.dest('build/app/js'));
});

gulp.task('app', ['vendors'], () => {
    return gulp.src([
            'src/app/client/**/*.ts'
        ])
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            externals: {
                three: 'THREE',
                lodash: '_'
            },
            output: {
                filename: 'app.js'
            }
        }))
        .pipe(gulp.dest('build/app/js'));
});