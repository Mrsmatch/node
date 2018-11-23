var pathDir = "./src";
var devSrc = "./devSrc";
var bulid = "./bulidSrc";

let baseConfig = (output) => {
    return {
        js: {
            entry: [`${pathDir}/js/**/*.js`],
            output: `${output}/js`
        },
        css: {
            entry: [`${pathDir}/css/**/*.css`],
            output: `${output}/css`
        },
        scss: {
            entry: [`${pathDir}/css/**/*.scss`],
            output: `${output}/css`
        },
        static: {
            entry: [`${pathDir}/static/**/*`],
            output: `${output}/static`
        },
        html: {
            entry: [`${pathDir}/html/**/*.html`],
            output: `${output}/html`
        }

    }
}

module.exports = {
    dev: {
        host: "127.0.0.1",
        port: 5500,
        path: devSrc,
        open: "/html/index.html",
        livereload: true,
        directoryListing: true,

        ...baseConfig(devSrc)
    }
}