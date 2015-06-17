var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function(){

	nodemon({
		script: 'server.js',
		ext:'js',
		env:{
			PORT: 9000
		},
		ignore:['./node_modules/*']
	})
})
