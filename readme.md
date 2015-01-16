## Why Dogen - "Oneness of Scaffolding"
**dogen** is meant to be the scaffold-on-the-fly tool.  
Creating templates of files & directories of files for scaffolding should be easy.
Sometimes, there's a need to copy & paste & change group of files (aka Modules).  
Currently, tools like <yeoman.io> provide impressive scaffold utilities, but sometimes there's a need to update the generators according to your project's guidelines - That's why I created [dogen](https://en.wikipedia.org/wiki/D%C5%8Dgen).

![zen enso](https://upload.wikimedia.org/wikipedia/commons/f/f1/Enso.jpg)

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
The concept of simplicity in dogen is that you should put the **name-of-flag** anywhere in the file's & directories names and contents - so it will be replaced with the value of **the-name-to-be-scaffolded**.

#### options


## License

MIT © [orizens](https://github.com/orizens)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/orizens/gulp-dogen/trend.png)](https://bitdeli.com/free "Bitdeli Badge")