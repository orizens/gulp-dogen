'use strict';
var gulp = require('gulp');
var argv = require('yargs').argv;
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var _gulp;

var api = {
	config: config,
	task: task
};

var generators = [];
var templatesPath = './';
var gulpTaskCreated = false;

function config (options) {
	if (!options.templatesPath || !options.gulp) {
		console.log('templatesPath or gulp parameters not set in config correctly.');
		return;
	}
	_gulp = options.gulp;
	templatesPath +=  options.templatesPath + '/';
}

function task (placeholder, destination) {
	if (placeholder && destination) {
		generators.push([placeholder, destination]);
		if (!gulpTaskCreated) {
			gulpTaskCreated = true;
			// this function should run once because it iterates on the flags
			// the 'dogen' task gets and runs the appropriate the generator
			return createDogenGulpTask();
		}
	}
}

function createDogenGulpTask () {
	return _gulp.task('dogen', function(){
		generators.forEach(function(task){
			var placeholder = task[0];
			var placeholderValue = argv[task[0]];
			var destination = task[1];
			var path = argv.path;
			if (path !== undefined) {
				destination += path + '/';
			}
			if (placeholderValue !== undefined) {
				return creator('_' + placeholder + '_', placeholderValue, destination);
			}
		});
	});
}

function creator (placeholder, placeholderValue, dest) {
	var re = new RegExp('(' + placeholder + ')', 'gm');
	console.log('Creating', placeholder.replace(/_/g, ''), ':', placeholderValue, 'in', dest);
	return _gulp.src(templatesPath + placeholder + '/**/*')
		.pipe(rename(function (path) {
			if (path.basename.indexOf(placeholder) > -1){
				path.basename = path.basename.replace(placeholder, placeholderValue);
			}
		}))
		.pipe(replace(re, placeholderValue))
		.pipe(_gulp.dest(dest + placeholderValue));
}

module.exports = api;
