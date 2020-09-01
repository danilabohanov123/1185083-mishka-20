const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const toWebp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const minify = require('gulp-minify');

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

exports.html = html;

//scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(minify())
  .pipe(rename("scripts.min.css"))
  .pipe(gulp.dest('build/js'))
}

exports.scripts = scripts;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/*.js", gulp.series("scripts"));
}

exports.default = gulp.series(
  styles, html, scripts, server, watcher
);

//Making sprite

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

// Images optimization

const images = () => {
  return gulp.src("source/img/**/*.{jpg, png, svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = images;

//Convert to webp

const webp = () => {
  return gulp.src("source/img/**/*.{png, jpg}")
  .pipe(toWebp({quality: 90}))
  .pipe(gulp.dest("build/img"))
}

exports.webp = webp;

//Copy to folder

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
};

exports.copy = copy;

//Delete files

const clean = () => {
  return del("build");
};

exports.clean = clean;

//Build project

const build = gulp.series(
  clean,
  copy,
  styles,
  html,
  scripts,
  sprite
);

exports.build = build;

//Run project

const start = gulp.series(
  build,
  server
);

exports.start = start;
