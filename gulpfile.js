const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');
const fork = require('child_process').fork;

let server;

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
        .pipe(sass().on('error', sass.logError))
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
            'node_modules/msgpack-lite/dist/msgpack.min.js', 
            'node_modules/react/dist/react.min.js', 
            'node_modules/react-dom/dist/react-dom.min.js', 
            'node_modules/redux/dist/redux.min.js', 
            'node_modules/lodash/lodash.min.js', 
            'node_modules/three/build/three.js',
            'node_modules/socket.io-client/dist/socket.io.min.js' 
        ])
        .pipe(gulp.dest('build/client/js'));
});

gulp.task('js', () => {
    return gulp.src([
            'src/app/**/*.ts',
            'src/app/**/*.tsx',
            'src/front/**/*.ts',
            'src/front/**/*.tsx',
            'src/components/**/*.ts',
            'src/components/**/*.tsx',
            'src/graphic/**/*.ts',
            'src/graphic/**/*.tsx',
            'src/game/**/*.ts',
            'src/game/**/*.tsx',
            'src/tools/**/*.ts',
            'src/tools/**/*.tsx'
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
                extensions: ['', '.tsx', '.ts', '.js', '.jsx']
            },
            externals: {
                'msgpack-lite': 'msgpack',
                'react': 'React',
                'react-dom': 'ReactDOM',
                'redux': 'Redux',
                'lodash': '_',
                'three': 'THREE',
                'socket.io-client': 'io'
            },
            output: {
                filename: 'app.js'
            }
        }))
        .pipe(gulp.dest('build/client/js'));
});

gulp.task('client', ['static', 'vendors', 'sass', 'js']);

gulp.task('server', () => {
    return gulp.src([
            'src/**/*.ts',
            'src/**/*.tsx'
        ])
        .pipe(typescript())
        .pipe(gulp.dest('build/server'));
});

gulp.task('default', ['client', 'server'], () => {
    server = fork('build/server/server/base.js');
    gulp.watch(['src/front/css/**/*.scss'], ['sass']);
    gulp.watch([
            'src/app/**/*.ts',
            'src/app/**/*.tsx',
            'src/front/**/*.ts',
            'src/front/**/*.tsx',
            'src/components/**/*.ts',
            'src/components/**/*.tsx',
            'src/graphic/**/*.js',
            'src/graphic/**/*.ts',
            'src/graphic/**/*.tsx',
            'src/game/**/*.ts',
            'src/game/**/*.tsx',
            'src/tools/**/*.ts',
            'src/tools/**/*.tsx'
        ], ['js']);
});