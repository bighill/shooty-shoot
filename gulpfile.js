var gulp        = require( 'gulp' ),
    jshint      = require( 'gulp-jshint' ),
    less        = require( 'gulp-less' ),
    sourcemaps  = require( 'gulp-sourcemaps' ),
    uglify      = require( 'gulp-uglify' ),
    minifyCss   = require( 'gulp-minify-css' ),
    connect     = require( 'gulp-connect' ),
    concat      = require( 'gulp-concat' );

/*
|
|   define I/O
|
*/
var input  = {
        'js'        : 'src/js/*.js',
        'jsLib'     : [
        ],
        'less'      : 'src/less/css.less',
        'htmlRoot'  : 'public',
        'html'      : 'public/*.html'
    },

    output = {
        'js'        : 'public',
        'jsFile'    : 'js.js',
        'jsLib'     : 'public/js/lib',
        'css'       : 'public'
    },

    watch = {
        'js'    : 'src/js/*.js',
        'less'  : 'src/less/*.less',
        'html'  : 'public/*.html'
    };

/*
|
|   jshint
|
*/
gulp.task('jshint', function()
{
    return gulp.src( input.js )
        .pipe( jshint({ strict: true }) )
        .pipe( jshint.reporter('jshint-stylish') );
});

/*
|
|   js
|
*/
gulp.task('js', function()
{
    return gulp.src( input.js )
        .pipe( sourcemaps.init() )
        .pipe( concat(output.jsFile) )
        .pipe( uglify() )
        .pipe( sourcemaps.write('./maps') )
        .pipe( gulp.dest(output.js) )
        .pipe( connect.reload() );
});

/*
|
|   js lib
|
*/
/*
gulp.task('jslib', function()
{
    gulp.src( input.jsLib )
    .pipe(gulp.dest( output.jsLib )); // simple copy
})
*/

/*
|
|   less
|
*/
gulp.task('css', function()
{
    return gulp.src( input.less )
        .pipe( sourcemaps.init() )
        .pipe( less() )
        .pipe( minifyCss() )
        .pipe( sourcemaps.write('./maps') )
        .pipe( gulp.dest(output.css) )
        .pipe( connect.reload() );
});

/*
|
|   webserver w/ livereload
|
*/
gulp.task('connect', function()
{
    connect.server({
        root        : input.htmlRoot,
        port        : 8080,
        livereload  : true
    });
});

/*
|
|   watch html changes
|
*/
gulp.task('html', function()
{
    gulp.src( input.html )
        .pipe( connect.reload() );
});

/*
|
|   watch
|
*/
gulp.task('watch', function()
{
    gulp.watch( watch.js, ['jshint', 'js'] );
    gulp.watch( watch.less, ['css'] );
    gulp.watch( watch.html, ['html'] );
});

/*
|
|   default
|
*/
/*
gulp.task( 'default', ['jslib', 'connect', 'watch'] );
gulp.task( 'default', ['jshint', 'js', 'css'] );
*/
gulp.task( 'default', ['jshint', 'js', 'css', 'connect', 'watch'] );