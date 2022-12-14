const { src, dest, parallel, series, watch, on } = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass')(require('sass'));
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");

function server() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
};

function styles() {
    return src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest("src/css"))
        .pipe(browserSync.stream());
};

function startwatch() {
    watch("src/sass/**/*.+(scss|sass)", styles);
    watch("src/*.html").on('change', browserSync.reload);
}

exports.server  = server;
exports.styles  = styles;

exports.default = parallel(styles, server, startwatch);     