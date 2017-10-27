let SRC_DIR = './src/'; // 源文件目录
let DEV_DIR = './dev/'; // 开发文件存放目录
let DIST_DIR = './dist/'; // 发布文件存放目录
let DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件

let Config = {
  src: SRC_DIR,
  dev: DEV_DIR,
  dist: DIST_DIR,
  dist_files: DIST_FILES,
  html: {
    src: SRC_DIR + '*.html',
    dev: DEV_DIR,
    dist: DIST_DIR
  },
  assets: {
    src: SRC_DIR + 'assets/**/*', // assets目录：./src/assets
    dev: DEV_DIR + 'assets',
    dist: DIST_DIR + 'assets' // assets文件build后存放的目录：./dist/assets
  },
  css: {
    src: SRC_DIR + 'css/**/*.css', // CSS目录：./src/css/
    dev: DEV_DIR + 'css',
    dist: DIST_DIR + 'css' // CSS文件build后存放的目录：./dist/css
  },
  sass: {
    src: SRC_DIR + 'sass/**/*.scss', // SASS目录：./src/sass/
    dev: DEV_DIR + 'css',
    dist: DIST_DIR + 'css' // SASS文件生成CSS后存放的目录：./dist/css
  },
  js: {
    src: SRC_DIR + 'js/**/*.js', // JS目录：./src/js/
    dev: DEV_DIR + 'js',
    dist: DIST_DIR + 'js', // JS文件build后存放的目录：./dist/js
  },
  img: {
    src: SRC_DIR + 'images/**/*', // images目录：./src/images/
    dev: DEV_DIR + 'images',
    dist: DIST_DIR + 'images' // images文件build后存放的目录：./dist/images
  }
};

module.exports = Config;
