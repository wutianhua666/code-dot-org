# time-grunt-nowatch

> Display the elapsed execution time of [grunt](http://gruntjs.com) tasks

![](screenshot.png)


## Install

```
$ npm install --save-dev time-grunt-nowatch
```


## Usage

```js
// Gruntfile.js
module.exports = function (grunt) {
	// require it at the top and pass in the grunt instance
	require('time-grunt-nowatch')(grunt);

	grunt.initConfig();
}
```


## Optional callback

If you want to collect the timing stats for your own use, pass in a callback:

```js
var verbose = false;
require('time-grunt-nowatch')(grunt, verbose, function (stats, done) {
	// do whatever you want with the stats
	uploadReport(stats);

	// be sure to let grunt know when to exit
	done();
});
```


## Clean layout

Tasks that take less than 1% of the total time are hidden to reduce clutter.

Run grunt with `grunt --verbose` to see all tasks.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
