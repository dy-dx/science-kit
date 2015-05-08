gulp        = require 'gulp'
watchify    = require 'watchify'
browserify  = require 'browserify'
coffeeify   = require 'coffeeify'
browserSync = require 'browser-sync'
source      = require 'vinyl-source-stream'
jade        = require 'gulp-jade'
sass        = require 'gulp-sass'
notify      = require 'gulp-notify'


bundle = (bundler) ->
  bundler.bundle()
    .on 'error', notify.onError('<%= error.message %>')
    .pipe source('bundle.js')
    .pipe gulp.dest('./dist')


gulp.task 'sass', ->
  gulp.src './src/css/**/*.scss'
      .pipe sass()
      .on 'error', notify.onError('<%= error.message %>')
      .pipe gulp.dest('./dist')
      .pipe browserSync.reload(stream: true)


gulp.task 'jade', ->
  gulp.src './src/*.jade'
      .pipe jade(pretty: true)
      .on 'error', notify.onError('<%= error.message %>')
      .pipe gulp.dest('./dist')


gulp.task 'watch', ['sass', 'jade'], ->
  watchify.args.extensions ||= []
  watchify.args.extensions.push '.coffee'
  bundler = watchify(browserify('./src/js/main.coffee', watchify.args))
  bundler.transform(coffeeify)

  bundler.on('update', -> bundle(bundler))

  browserSync
    open: false
    server:
      baseDir: ['.', '.tmp', 'dist']
    port: 3030
    ghostMode: false
    notify: false

  gulp.watch ['src/**/*.scss'], ['sass']
  gulp.watch ['src/**/*.jade'], ['jade']
  gulp.watch ['src/img/**/*'],  browserSync.reload
  gulp.watch ['dist/*.!(css)'], browserSync.reload

  return bundle(bundler)


gulp.task 'build', ['sass', 'jade'], ->
  bundler = browserify('./src/js/main.coffee')
  bundler.transform(coffeeify)
  return bundle(bundler)


gulp.task 'default', ['watch']
