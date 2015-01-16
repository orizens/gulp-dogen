'use strict';
var gulp = require('gulp');
// var gutil = require('gulp-util');
// var through = require('through2');
// var someModule = require('some-module');
var argv = require('yargs').argv;
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var api = {
	config: config,
	task: task
};

var generators = [];
var templatesPath = './';
var gulpTaskCreated = false;

function config (options) {
	if (!options.templatesPath) {
		console.log('templatesPath not set.');
		return;
	}
	templatesPath +=  options.templatesPath + '/';
}

function task (placeholder, destination) {
	if (placeholder && destination) {
		generators.push([placeholder, destination]);
		if (!gulpTaskCreated) {
			gulpTaskCreated = true;
			createDogenGulpTask();
		}
	}
}

function createDogenGulpTask () {
	gulp.task('dogen', function(){
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
	return gulp.src(templatesPath + placeholder + '/**/*')
		.pipe(rename(function (path) {
			if (path.basename.indexOf(placeholder) > -1){
				path.basename = path.basename.replace(placeholder, placeholderValue);
			}
		}))
		.pipe(replace(re, placeholderValue))
		.pipe(gulp.dest(dest + placeholderValue));
}

module.exports = api;
