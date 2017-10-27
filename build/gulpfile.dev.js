import Config from './gulpfile.config.js';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import named from 'vinyl-named';
import browser from 'browser-sync';
import gulpWebpack from 'webpack-stream';
let $ = gulpLoadPlugins();
let browserSync = browser.create();
let reload = browserSync.reload;

//======= 开发环境下 ===============
function dev() {
    /**
     * HTML处理
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.revAppend())
            .pipe(gulp.dest(Config.html.dev))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * assets文件夹下的所有文件处理
     */
    gulp.task('assets:dev', function () {
        return gulp
            .src(Config.assets.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.changed(Config.assets.dev))// 只操作有过修改的文件
            .pipe(gulp.dest(Config.assets.dev))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * SASS样式处理
     */
    gulp.task('sass:dev', function () {
        return gulp.src(Config.sass.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.autoprefixer('last 2 version'))
            .pipe($.sass())// sass编译
            .pipe($.csscomb()) // css排序
            .pipe(gulp.dest(Config.sass.dev))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.autoprefixer('last 2 version'))
            .pipe($.csscomb()) // css排序
            .pipe(gulp.dest(Config.css.dev))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * js处理
     */
    gulp.task('js:dev', function () {
        return gulp.src(['./src/js/index.js'])
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe(named())
            .pipe(gulpWebpack({
                module: {
                    loaders: [{
                        test: /\.js$/,
                        loader: 'babel-loader'
                    }]
                }
            }), null, (err, stats) => {
                log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                    chunks: false
                }))
            })
            .pipe(gulp.dest(Config.js.dev))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * 图片处理
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.changed(Config.img.dev))// 只操作有过修改的文件
            .pipe(gulp.dest(Config.img.dev))
            .pipe(reload({
                stream: true
            }));
    });

    gulp.task('dev', ['html:dev','assets:dev','sass:dev','css:dev','js:dev','images:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dev
            }
            , notify: false
        });
        // Watch .html files
        gulp.watch(Config.html.src, ['html:dev']);
        // Watch assets files
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .scss files
        gulp.watch(Config.sass.src, ['sass:dev']);
        // Watch .css files
        gulp.watch(Config.sass.src, ['css:dev']);
        // Watch .js files
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files
        gulp.watch(Config.img.src, ['images:dev']);
    });
}

//======= gulp dev 开发环境下 ===============
module.exports = dev;
