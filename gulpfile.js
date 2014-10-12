
// imports
var gulp = require('gulp');
var ngcompile = require('gulp-ngcompile');
var ngtemplates = require('gulp-ngtemplates');
var concat = require('gulp-concat');
var jade = require('gulp-jade')
var es = require('event-stream');
// end of imports.

var config = {
	src: 'client/**.js',
	tpl: 'client/**.jade',
	dest: 'static/js'
};

gulp.task('angular', function () {

	var tpl = gulp.src('client/**.jade')
		// compile to javascript.
		.pipe(jade())
		.pipe(ngtemplates());

	var src = gulp.src('client/**.js');

	es.concat(tpl, src)
		.pipe(ngcompile('app'))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(config.dest));

});

gulp.task('default', ['angular']);
