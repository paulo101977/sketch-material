var gulp = require('gulp'),
  watch = require('gulp-watch'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  foreach = require('gulp-foreach'),
  inject = require('gulp-inject-string'),
  runSequence = require('run-sequence'),
  clean = require('gulp-clean'),
  shell = require('gulp-shell'),
  path = require('path');

var browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
  return gulp.src([
    'js/init.js',
    'js/utils/config.js',
    'js/utils/api.js',
    'js/utils/help.js',
    'js/utils/shared.js',
    'js/utils/color.js',
    'js/utils/panel.js',
    'js/utils/import.js',
    'js/components/*.js'
    ])
    .pipe(concat('common.js'))
    .pipe(gulp.dest('../scripts/'));
});

gulp.task('less', function () {
  return gulp.src('./less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('../scripts/panel/assets/css/'));
});

gulp.task('inject:links' , function(){

    return gulp.src(['../scripts/panel/*.html', '!../scripts/panel/index.html'])
      .pipe(
        foreach(function(stream, file){
          //var file = file.path.split('/')[file.path.split('/').length-1]
          var name = path.basename(file.path);
          var fileContent = "<b>"
                              + "<a target='_blank' href='./"+ name +"'>" + name + "</a>"
                            + "</b>"
                            + "<br />"

          return gulp
            .src('../scripts/tmp/index.html')
            .pipe(
              inject.after(
                '<body>',
                  fileContent
              )
            )
            .pipe(gulp.dest('../scripts/tmp/'))
        })
      )
      //.pipe(gulp.dest('./tmp/'));
  })


gulp.task('update', function(){
  return runSequence(
    'scripts',
    'less',
    'copy:html:tmp' ,
    'inject:links',
    'copy:html',
    'copy:plugin'
  )
})

gulp.task('clean', function(){
  return gulp.src('../scripts/tmp/', {read: false})
    .pipe(clean({force: true}));
})


gulp.task('copy:html', function(){
  return gulp
    .src('../scripts/tmp/index.html')
    .pipe(gulp.dest('../scripts/panel/'))
})

gulp.task('copy:html:tmp', function(){
  return gulp
    .src('./index.html')
    .pipe(gulp.dest('../scripts/tmp/'))
})

var originDirectory = "../../../../sketch-material.sketchplugin";
var destDirectory = "$HOME/Library/Application\\ Support/"
+ "com.bohemiancoding.sketch3/Plugins/";

var command = "cp -R " + originDirectory + ' ' + destDirectory;

gulp.task('copy:plugin', shell.task(
  command
))

gulp.task('watch', function () {
  browserSync.init({
      server: "../scripts/panel",
      port: 8080
  });
  gulp.watch(
    [ '../scripts/**/*.html',
      '!../scripts/**/index.html',
      '!../scripts/tmp/'
    ], ['update']).on('change', browserSync.reload);
  gulp.watch(['**/*.js', '!gulpfile.js'], ['update']).on('change', browserSync.reload);
  gulp.watch(['**/*.less'], ['less']).on('update', browserSync.reload);
});
