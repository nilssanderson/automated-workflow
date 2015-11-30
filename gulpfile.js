// -------------------
// Add modules
// -------------------

var fs = require('fs');

// Add gulp modules
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    nano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    runSequence = require('gulp-run-sequence'),
    uglify = require('gulp-uglify'),
    styleguide = require('sc5-styleguide'),
    sass = require('gulp-sass');

    // Add postCSS plugins
    var autoprefixer                 = require('autoprefixer'),
        colorguard                   = require('colorguard'),
        cssnext                      = require('cssnext'),
        fontMagician                 = require('postcss-font-magician'),
        precss                       = require('precss'),
        simpleVars                   = require('postcss-simple-vars');


    // Output
    var srcPath = './src/';
    var sassPath = srcPath + '/sass/';
    var cssPath = './css/';

    var buildPath = './build/';

    // Test
    var customerName = 'Gregg\'s Barn';
    var authUsername = 'admin';
    var authPassword = 'admin';


// -------------------
// Start tasks
// -------------------


// Greet
gulp.task('greet', function () {
    console.log('Hello world!');
});


// Fonts
gulp.task('fonts', function() {
    return gulp.src([srcPath + 'fonts/fontawesome-webfont.*'])
      .pipe(gulp.dest(buildPath + 'fonts/'));
});


// SCSS
gulp.task('sass', function () {
  return gulp.src(sassPath + 'index.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(cssPath))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch(sassPath + '**/*.scss', ['sass']);
});


// CSS
gulp.task('css', function() {

    // Use the postCSS plugins
    var processors = [
        autoprefixer({
            browsers: ['last 1 version']
        }),
        colorguard,
        cssnext,
        fontMagician,
        precss,
        simpleVars
    ];

    return gulp.src(srcPath + '**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest(cssPath));

});


  // Minify
  gulp.task('minifyCss', ['css'], function () {

      return gulp.src(cssPath + '**/*.css')
          .pipe(minifyCss())
          .pipe(concat('minified.css'))
          .pipe(gulp.dest(buildPath))
          .pipe(browserSync.stream());

  });


// Production
// gulp.task('production', function() {
//
//     // Use the postCSS plugins
//     var processors = [];
//
//     return gulp.src('./src/*.css')
//         .pipe(postcss(processors))
//         .pipe(nano())
//         .pipe(gulp.dest('./dest'));
//
// });


// Static Server + watching scss/html files
gulp.task('browser-sync-static', function() {

    browserSync.init({
        server: './'
    });

    runSequence(
      'sass',
      'fonts',
      'minifyCss',
      'styleguide');

    gulp.watch(sassPath + '**/*.scss', ['sass','fonts','minifyCss','styleguide']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
});


// Dynamic server
gulp.task('browser-sync-dynamic', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});






// Styleguide

gulp.task('styleguide:generate', function() {
  return gulp.src(sassPath + '**/*.scss')
    .pipe(styleguide.generate({
        basicAuth: {
          username: authUsername,
          password: authPassword
        },
        title: customerName + ' - Styleguide',
        server: true,
        port: 3002,
        rootPath: buildPath + 'docs/',
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(buildPath + 'docs/'));
});

gulp.task('styleguide:applystyles', function() {
  return gulp.src(sassPath + '**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(buildPath + 'docs/'));
});

// gulp.task('watch', ['styleguide'], function() {
//   // Start watching changes and update styleguide whenever changes are detected
//   // Styleguide automatically detects existing server instance
//   gulp.watch(['*.css'], ['styleguide']);
// });

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
