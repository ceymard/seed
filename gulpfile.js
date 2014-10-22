
// imports
var cp = require('child_process');

var gulp = require('gulp');
var gutil = require('./node_modules/gulp/node_modules/gulp-util/index');
var ngcompile = require('gulp-ngcompile');
var ngtemplates = require('gulp-ngtemplates');
var concat = require('gulp-concat');
var jade = require('gulp-jade')
var es = require('event-stream');
// end of imports.

var config = {
	src: 'client/**.js',
	tpl: 'client/**.jade',
	dest: 'static/js',
	srv: ['server/**.js', 'server/**.html', 'runserver.js']
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

var srvproc = null;

gulp.task('spawnserver', ['killserver'], function () {
	gutil.log('** launching server');
	srvproc = cp.spawn(process.execPath, [__dirname + '/runserver.js'], {cwd: __dirname});
	srvproc.stdout.pipe(process.stdout);
	srvproc.stderr.pipe(process.stderr);
});

gulp.task('killserver', function () {
	if (srvproc) {
		gutil.log('** killing server');
		srvproc.kill();
	}
});

gulp.task('dev', ['angular', 'spawnserver'], function () {

	// launch the dev server on success.

	gulp.watch([config.src, config.tpl], ['angular']);
	gulp.watch(config.srv, ['spawnserver']);
});

gulp.task('default', ['angular']);

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
	if (srvproc) {
		srvproc.kill(function () {
			process.exit(255);
		});
	}
});
