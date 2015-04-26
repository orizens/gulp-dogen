[![Dependency Status](https://david-dm.org/orizens/gulp-dogen.svg)](https://david-dm.org/orizens/gulp-dogen)  

## Why Dogen - "Oneness of Scaffolding"
**dogen** is meant to be the scaffold-on-the-fly tool.  
Creating templates of files & directories of files for scaffolding should be easy.  
Sometimes, there's a need to copy & paste & change group of files (aka Modules).  
Currently, tools like [yeoman](http://yeoman.io) provide impressive scaffold utilities, but sometimes there's a need to update the generators according to your project's guidelines - and that's not possible with yeoman.  
You're relied on the generator's author or creating your own.  
That's why I created [dogen](https://en.wikipedia.org/wiki/D%C5%8Dgen).

Be The Master of you own generators.  
![zen enso](images/enso.jpg)

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

// This will create this gulp task as:
// gulp dogen --endpoint the-name-to-be-scaffolded
dogen.task('endpoint', 'src/server/api/');
dogen.task('ngmodule', 'src/client/app/');
dogen.task('ngservice', 'src/client/common/services/');
```

Then in terminal, you can start using this gulp task:
```shell
gulp dogen --endpoint guitars
```
This task will do the following:
1. copy the "endpoint" directory from the "examples" directory to destination 'src/server/api'
2. replace every instance of the word "endpoint" with "guitars" - in both file names & file contents

### One More Destination Path  
Sometimes, a sub destination path is required under the destination that was configured in the **task** function.  
The dogen shell task can have a 2nd argument, **"path"** which will be concatenated as a suffix to the destination value of the task.  
The following task:  
```gulp dogen --endpoint guitars --path music```  
places the new generated files/directories at: **src/client/api/music**.
Please note: the **path** value can be any nested path including several directories.

The examples directory includes a template of *endpoint*.

## API
1. *config* - 
	1. *templatesPath* - the source directory to lookup templates
2. *task* - (returns pipeable gulp task)
	1. *name-of-flag* - the name of the flag to be used in the command line and also the string that will be replaced in the template's files.
	2. *destination* - the destination path that will be used to place the newly created files

### dogen(options)
The concept of simplicity in dogen is that you should put the **name-of-flag** anywhere in the file's & directories names and contents - so it will be replaced with the value of **the-name-to-be-scaffolded**.

#### options
**dogen** task method return a **gulp** task that can be used like a standard gulp task.  
```gulp dogen --list``` displays all the localy available generators in the console.

## License

MIT © [orizens](https://github.com/orizens)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/orizens/gulp-dogen/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
