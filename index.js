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

var generators = [['list', '']];
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
			createDogenGulpTask();
		}
	}
}

function createDogenGulpTask () {
	_gulp.task('dogen', function(){
		var placeholderValue = argv[task[0]];
		var path = argv.path;

		if (argv.list) {
			listGeneratorsToConsole();
			return;
		}

		generators.forEach(function(task){
			var placeholder = task[0];
			var destination = task[1];
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

function listGeneratorsToConsole () {
	var list = generators.map(function(generator){
		return '\t' + generator.join(': ');
	});
	list.shift();
	console.log('\navailable dogen tasks:\n');
	console.log(list.join('\n'), '\n');
}
module.exports = api;
