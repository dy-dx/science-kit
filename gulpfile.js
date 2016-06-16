const gulp = require('gulp')
const watchify = require('watchify')
const browserify = require('browserify')
const browserSync = require('browser-sync')
const source = require('vinyl-source-stream')
const jade = require('gulp-jade')
const sass = require('gulp-sass')
const notify = require('gulp-notify')
const babelify = require('babelify')

const bundle = (bundler) => (
  bundler.bundle()
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'))
)

gulp.task('sass', () => (
  gulp.src('./src/css/**/*.scss')
    .pipe(sass())
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
))

gulp.task('jade', () => (
  gulp.src('./src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(gulp.dest('./dist'))
))

gulp.task('watch', ['sass', 'jade'], () => {
  watchify.args.extensions = watchify.args.extensions || []
  watchify.args.extensions.push('.jsx')
  const bundler = watchify(browserify('./src/js/index.js', watchify.args))
  bundler.transform(babelify, { presets: ['es2015-loose', 'stage-0', 'react'] })

  bundler.on('update', () => bundle(bundler))

  browserSync({
    open: false,
    server: {
      baseDir: ['.', '.tmp', 'dist']
    },
    port: 3030,
    ghostMode: false,
    notify: false
  })

  gulp.watch(['src/**/*.scss'], ['sass'])
  gulp.watch(['src/**/*.jade'], ['jade'])
  gulp.watch(['src/img/**/*'], browserSync.reload)
  gulp.watch(['dist/*.!(css)'], browserSync.reload)

  return bundle(bundler)
})

gulp.task('build', ['sass', 'jade'], () => {
  const bundler = browserify('./src/js/index.js', { extensions: ['.jsx'] })
  bundler.transform(babelify, { presets: ['es2015-loose', 'stage-0', 'react'] })
  return bundle(bundler)
})

gulp.task('default', ['watch'])
