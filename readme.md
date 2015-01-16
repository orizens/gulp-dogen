## Install

```sh
$ npm install --save-dev gulp-dogen
```


## Usage

```js
var gulp = require('gulp');
var dogen = require('gulp-dogen');

dogen.config({
	templatesPath: 'gulp/templates',
	gulp: gulp
});

// This will create gulp tasks as:
// gulp dogen --endpoint the-name-to-be-scaffolded
dogen.task('endpoint', 'src/server/api/');
dogen.task('ngmodule', 'src/client/app/');

```

The examples directory includes a template of *endpoint*.

## API
1. *config* - 
	1. *templatesPath* - the source directory to lookup templates
2. *task* -
	1. *name-of-flag* - the name of the flag to be used in the command line and also the string that will be replaced in the template's files.
	2. *destination* - the destination path that will be used to place the newly created files

### dogen(options)

#### options


## License

MIT © [orizens](https://github.com/orizens)
