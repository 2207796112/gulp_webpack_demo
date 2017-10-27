import Config from './gulpfile.config.js';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import named from 'vinyl-named';
import browser from 'browser-sync';
import gulpWebpack from 'webpack-stream';
import pngquant from 'imagemin-pngquant';
let $ = gulpLoadPlugins();
let browserSync = browser.create();
let reload = browserSync.reload;

//======= 开发环境下 ===============
function prod() {
    /**
     * HTML处理
     */
    gulp.task('html', function () {
        let options = {
            removeComments: true, // 清除HTML注释
            collapseWhitespace: true, // 压缩HTML
            collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
            minifyJS: true, // 压缩页面JS
            minifyCSS: true // 压缩页面CSS
        };
        return gulp.src(Config.html.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.revAppend())
            .pipe($.htmlmin(options))
            .pipe(gulp.dest(Config.html.dist));
    });
    /**
     * assets文件夹下的所有文件处理
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.changed(Config.assets.dist))// 只操作有过修改的文件
            .pipe(gulp.dest(Config.assets.dist));
    });
    /**
     * SASS样式处理
     */
    gulp.task('sass', function () {
        return gulp.src(Config.sass.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.autoprefixer('last 2 version'))
            .pipe($.sass())
            .pipe($.csscomb()) // css排序
            .pipe(gulp.dest(Config.sass.dist))
            .pipe($.rename({
                suffix: '.min'
            })) //rename压缩后的文件名
            .pipe($.cssnano()) //执行压缩
            .pipe(gulp.dest(Config.sass.dist));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.autoprefixer('last 2 version'))
            .pipe($.csscomb()) // css排序
            .pipe(gulp.dest(Config.css.dist))
            .pipe($.rename({
                suffix: '.min'
            })) //rename压缩后的文件名
            .pipe($.cssnano()) //执行压缩
            .pipe(gulp.dest(Config.css.dist));
    });
    /**
     * js处理
     */
    gulp.task('js', function () {
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
            .pipe(gulp.dest(Config.js.dist))
            .pipe($.rename({
                suffix: '.min'
            }))
            .pipe($.uglify())
            .pipe(gulp.dest(Config.js.dist));
    });
    /**
     * 图片处理
     */
    gulp.task('images', function () {

        return gulp.src(Config.img.src)
            .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')})) // 错误提示
            .pipe($.changed(Config.img.dist))// 只操作有过修改的文件
            .pipe($.cache($.imagemin({
                progressive: true,// 无损压缩JPG图片
                svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
                use: [pngquant()] // 使用pngquant深度压缩png图片的imagemin插件
            })))
            .pipe(gulp.dest(Config.img.dist));
    });

    gulp.task('build', ['html', 'sass','css','js', 'assets','images']);
/*    gulp.task('build', ['html', 'sass','css', 'js', 'assets','images']);*/
}

//======= gulp dev 开发环境下 ===============
module.exports = prod;
