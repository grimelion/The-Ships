const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const spawn = require('child_process').spawn;

let typescript = ts.createProject(
    'tsconfig.json',
    {
        target: 'es6'
    }
);

gulp.task('sass', () => {
    return gulp.src([
            'src/front/css/app.scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('build/client/css'));       
});

gulp.task('static', () => {
    return gulp.src([
            'src/front/**/*.html'
        ])
        .pipe(gulp.dest('build/client'));
});

gulp.task('vendors', () => {
    return gulp.src([
            'node_modules/react/dist/react.min.js', 
            'node_modules/react-dom/dist/react-dom.min.js', 
            'node_modules/redux/dist/redux.min.js', 
            'node_modules/lodash/lodash.min.js', 
            'node_modules/three/build/three.min.js' 
        ])
        .pipe(gulp.dest('build/client/js'));
});

gulp.task('client', ['static', 'vendors', 'sass'], () => {
    return gulp.src([
            'src/app/**/*.ts',
            'src/app/**/*.tsx',
            'src/front/**/*.ts',
            'src/front/**/*.tsx',
            'src/components/**/*.ts',
            'src/components/**/*.tsx'
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
            resolve: {
                extensions: ['', '.tsx', '.ts']
            },
            externals: {
                'react': 'React',
                'react-dom': 'ReactDOM',
                'redux': 'Redux',
                'lodash': '_',
                'three': 'THREE'
            },
            output: {
                filename: 'app.js'
            }
        }))
        .pipe(gulp.dest('build/client/js'));
});

gulp.task('server', () => {
    return gulp.src([
            'src/**/*.ts',
            'src/**/*.tsx'
        ])
        .pipe(typescript())
        .pipe(gulp.dest('build/server'));
});

gulp.task('default', ['client', 'server']);