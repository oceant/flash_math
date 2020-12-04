// generated on 2016-12-11 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const compass = require('compass-importer');
const saveLicense = require('uglify-save-license');
const ejsLint = require('ejs-lint');
const runSequence = require('run-sequence');

gulp.task("ejs", ()=> {
    return gulp.src("development/templates/pages/**/*.ejs")
        .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
        .pipe($.ejs())
        .pipe($.rename({
            extname: '.html'
        }))
        .pipe(gulp.dest('app')); //appディレクトリ内に書き出すことでbrowserSyncによるライブプレビューに反映
});

gulp.task('styles', () => {
  return gulp.src('development/assets/styles/pages/**/*.scss')
    .pipe($.plumber({errorHandler: $.notify.onError("Error: <%= error.message %>")}))
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.'],
      importer: compass
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('development/assets/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      ignore: ['development/assets/scripts/vendor/*.js']
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('app/scripts'))
    .pipe(reload({stream: true}));
});

gulp.task('fonts', () => {
  return gulp.src('development/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest('app/fonts'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

const lintOptions = {
    globals: [
        '$',
        'google'
    ]
};

gulp.task('lint', lint(['development/assets/scripts/**/*.js', '!development/assets/scripts/vendor/**/*.js', '!development/assets/scripts/plugins/**/*.js'], lintOptions));



gulp.task('ejs-lint', () => {
  return ejsLint('development/templates/**/*.ejs');
});

gulp.task('html', () => {
  return (
    gulp
      .src(['.tmp/**/*.html'])
      .pipe($.useref({ searchPath: ['.tmp', 'node_modules'] }))
      .pipe($.if('*.js', $.uglify({ output: { comments: saveLicense } })))
      // .pipe($.if('*.css', $.cssnano({zindex: false})))
      .pipe($.if('*.html', $.htmlmin({ collapseWhitespace: false })))
      .pipe(gulp.dest('dist'))
  );
});

gulp.task('images', () => {
  return gulp.src('development/assets/images/**/*')
    .pipe(gulp.dest('app/images'));
});

gulp.task('clean', del.bind(null, ['dist']));


gulp.task('default', gulp.series(gulp.parallel('lint', 'styles', 'scripts', 'ejs', 'images', 'fonts'), () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['app', 'node_modules']
    }
  });

  gulp.watch([
    'app/**/*.html',
    'app/images/**/*'
  ]).on('change', reload);

  gulp.watch('development/assets/styles/**/*.scss', gulp.task('styles'));
  gulp.watch('development/assets/scripts/**/*.js', gulp.task('scripts'));
  gulp.watch('development/assets/images/**/*.*', gulp.task('images'));
  gulp.watch('development/templates/**/*.ejs', gulp.task('ejs'));
}));
