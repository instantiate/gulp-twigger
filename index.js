'use strict';
var through = require('through2'),
    gutil = require('gulp-util'),
    merge = require('deepmerge'),
    Twig = require('twig'),
    fs = require('fs');

// disable twig caching
Twig.cache(false);

module.exports = function(opt) {

	function render(file, encoding, callback) {

		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
            return callback(new gutil.PluginError('gulp-twigger', 'doesn\'t support Streams'));
		}

		var options = merge(opt || {}, {
            path: file.path,
            async: false
        });

        // load vars for template if we have any
        var varsPath = file.path.slice(0, -9) + 'vars.json',
            vars = {};
        if (fs.existsSync(varsPath)) {
            var data = fs.readFileSync(varsPath);
            vars = JSON.parse(data.toString());
        }

        // compile twig file
        try {
            var html = Twig.twig(options).render(vars);
			file.contents = new Buffer(html);
			this.push(file);
		} catch (e) {
            return callback(new gutil.PluginError('gulp-twigger', 'Error caught from twig: ' + e.message + ' in ' + file.path));
		}

		callback();
	}

	return through.obj(render);
};
