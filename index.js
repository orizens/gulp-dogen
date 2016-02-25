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
		var excludeKeys = '_$0';
		var args = Object.keys(argv).filter(function (key) {
			return excludeKeys.indexOf(key) === -1;
		});
		var placeholderKey = args[0];
		var placeholderValue = argv[placeholderKey];
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
			if (placeholderValue !== undefined && placeholderKey === placeholder) {
				return creator(placeholder, placeholderValue, destination);
			}
		});
	});
}

function creator (placeholder, placeholderValue, dest) {
	var templatePlaceholder = '_' + placeholder + '_';
	var reNormal = new RegExp('(' + templatePlaceholder + ')', 'gm');
	var reCamelCase = new RegExp('(=' + placeholder + '=)', 'gm');
	var placeholderValueCamelCase = toCamelCase(placeholderValue);
	console.log('Creating', placeholder, ':', placeholderValue, 'in', dest);

	return _gulp.src(templatesPath + templatePlaceholder + '/**/*')
		.pipe(rename(function (path) {
			if (path.basename.indexOf(templatePlaceholder) > -1){
				path.basename = path.basename.replace(templatePlaceholder, placeholderValue);
			}
		}))
		.pipe(replace(reNormal, placeholderValue))
		.pipe(replace(reCamelCase, placeholderValueCamelCase))
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

function toCamelCase (selector) {
    return selector
        .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })
        .replace(/^[a-z]/g, function (g) { return g.toUpperCase(); })
        .replace(/\[|]/g, "");
}
module.exports = api;