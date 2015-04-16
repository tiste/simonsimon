gulp        = require('gulp')
runSequence = require('run-sequence')
clean       = require('gulp-clean')
connect     = require('gulp-connect')
usemin      = require('gulp-usemin')
jade        = require('gulp-jade')
stylus      = require('gulp-stylus')
uglify      = require('gulp-uglify')
minifyCss   = require('gulp-minify-css')
wiredep     = require('wiredep').stream

paths =
  jade: 'app/**/*.jade'
  stylus: 'app/styles/**/*.styl'
  images: 'app/images/**/*'

gulp.task 'clean', ->
  gulp.src('dist', read: false)
      .pipe(clean())

gulp.task 'connect', ->
  connect.server
    root: 'dist'
    livereload: true
    middleware: (connect) ->
      [
        connect().use(
          '/bower_components',
          connect.static('./bower_components')
        )
        connect.static('app')
      ]

gulp.task 'usemin', ->
  gulp.src('dist/index.html')
      .pipe(usemin
        css: [minifyCss()]
        jsVendor: [uglify()]
        jsScripts: [uglify()]
      )
      .pipe(gulp.dest('dist/'))

gulp.task 'jade', ->
  gulp.src(paths.jade)
      .pipe(jade())
      .pipe(gulp.dest('dist'))

gulp.task 'stylus', ->
  gulp.src(paths.stylus)
      .pipe(stylus(use: require('nib')()))
      .pipe(gulp.dest('dist/styles'))
      .pipe(connect.reload())

gulp.task 'images', ->
  gulp.src(paths.images)
      .pipe(gulp.dest('dist/images'))

gulp.task 'bower', ->
  gulp.src('app/index.jade')
      .pipe(wiredep(ignorePath: /\.\.\//))
      .pipe(gulp.dest('app'))

gulp.task 'watch', ->
  gulp.watch(paths.jade, ['jade'])
  gulp.watch(paths.stylus, ['stylus'])
  gulp.watch(paths.images, ['images'])


gulp.task 'build', ->
  runSequence 'clean', 'bower', ['jade', 'stylus', 'images'], 'usemin'

gulp.task 'default', ->
  runSequence 'clean', 'bower', ['jade', 'stylus', 'images'], ['connect', 'watch']
