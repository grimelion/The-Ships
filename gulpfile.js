const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const spawn = require('child_process').spawn;

let typescript = ts.createProject('tsconfig.json');

gulp.task('sass', () => {
    return gulp.src([
            'src/client/css/app.scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('build/client/css'));       
});

gulp.task('static', () => {
    return gulp.src([
            'src/client/**/*.html'
        ])
        .pipe(gulp.dest('build/client'));
});

gulp.task('vendors', () => {
    return gulp.src([
            'node_modules/lodash/lodash.min.js', 
            'node_modules/three/build/three.min.js' 
        ])
        .pipe(gulp.dest('build/client/js'));
});

gulp.task('client', ['static', 'vendors', 'sass'], () => {
    return gulp.src([
            'src/client/**/*.ts'
        ])
        .pipe(webpack({
            module: {
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        query: {
                            silent: true
                        }
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
        .pipe(gulp.dest('build/client/js'));
});

gulp.task('server', () => {
    return gulp.src([
            'src/server/**/*.ts'
        ])
        .pipe(typescript())
        .pipe(gulp.dest('build/server'));
});

gulp.task('default', ['client', 'server']);