const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer'); //自动添加浏览器前缀
const sass = require('gulp-sass'); //sass编译
const sequence = require('gulp-sequence'); //启动任务的命令
const browserify = require('gulp-browserify'); //模块化的打包
const webserver = require('gulp-webserver'); //web服务热启动
const chokidar = require('chokidar'); //文件监听

const config = require('./config.js');

gulp.task('js', () => {
    gulp.src(config.dev.js.entry)
        .pipe(gulp.dest(config.dev.js.output))
})
gulp.task('css', () => {
    gulp.src(config.dev.css.entry)
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.dev.css.output))
})

gulp.task('html', () => {
    gulp.src(config.dev.html.entry)
        .pipe(gulp.dest(config.dev.html.output))
})

gulp.task('scss', () => {
    gulp.src(config.dev.scss.entry)
        .pipe(sass())
        .pipe(gulp.dest(config.dev.scss.output))
})

gulp.task('static', () => {
    gulp.src(config.dev.static.entry)
        .pipe(gulp.dest(config.dev.static.output))
})

gulp.task('htmlServer', () => {
    gulp.src(config.dev.html.entry)
        .pipe(gulp.dest(config.dev.html.output))
        .on('end', () => {
            sequence(['server'], () => {
                console.log('启动服务')
            })
        })
})

gulp.task('server', () => {
    gulp.src(config.dev.path)
        .pipe(webServer({
            host: config.dev.host,
            port: config.dev.port,
            open: config.dev.open,
            livereload: config.dev.livereload,
            directoryListing: config.dev.directoryListing,
            middleware: require('../mock/index.js')
        }))
})

gulp.task("taskListen", () => {
    chokidar.watch(config.dev.js.entry).on('all', () => {
        sequence(['js'], () => {
            console.log('js监听成功')
        })
    })
    chokidar.watch(config.dev.css.entry).on('all', () => {
        sequence('css', () => {
            console.log('css监听成功')
        })
    })
})

gulp.task('copy', ['js', 'css', 'scss', 'static'], () => {
    console.log('copy成功')
})

gulp.task('dev', () => {
    sequence(['taskListen'], () => {
        console.log('监听成功')
    })
    sequence(['copy'], () => {
        sequence(['htmlServer'], () => {})
    })
})