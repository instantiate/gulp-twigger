[![Build Status](https://travis-ci.org/lopsided/gulp-twigger.png?branch=master)](https://travis-ci.org/lopsided/gulp-twigger)

## Information

<table>
<tr>
<td>Package</td><td>gulp-twigger</td>
</tr>
<tr>
<td>Description</td>
<td>Compile Twig templates using <a href="https://github.com/justjohn/twig.js">Twig.js</a>.</td>
</tr>
<tr>
<td>Node Version</td>
<td>≥ 0.10</td>
</tr>
</table>

## Background

This is a useful little tool to speed up the process of frontend
development if you plan to turn your HTML templates into Twig further
down the line (ie, for Symfony projects, which is why we made this).
Using this you can build a static site directly using Twig templates which
saves you time converting it later.

Full credit for the real work goes to John Roepke for the excellent Twig.js
library (https://github.com/justjohn/twig.js) and of course in turn to
Sensio Labs and Fabien Potencier for Twig itself (https://github.com/fabpot/Twig).

## Usage

#### Install
        npm install gulp-twigger --save

#### Pages and partials
It is unlikely you will want to build all of your twig files (kind of
defeats the point) so you can set up two `glob`s to target both the
pages that you want compiling and also to watch for changes in any partials.

#### Template variable
Twigger allows you to create `json` files for your pages where you can
set out the variables you want to pass into your pages. For each page named
like `index.html.twig`, Twigger looks for a corresponding `index.vars.json`
file at the same location. If this file exists then it is parsed as JSON
and the data is passed into the compiler.

#### Example
```javascript
var twigger = require('gulp-twigger'),
    twigFiles = 'assets/twig/**/*.{twig,json}',
    pages = 'assets/twig/[^_]*.html.twig',
    dest = 'web/';

gulp.task('twigger', function () {
    gulp.src(pages)
        .pipe(twigger())
        .pipe(rename(function (path) {
            path.extname = ''; // strip the .twig extension
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    gulp.watch(paths.twig, ['twigger']);
});

gulp.task('default', ['twigger', 'watch']);
```

The paths are defined separately here to make it easier to see what is
going on. `twigFiles` matches all files ending in `.twig` or `.json`
in your specified directory. These files are used in the `watch` task
to trigger a rebuild if you change any files in here. The `pages` glob
matches only `.twig` files which DON'T start with an underscore (`_`).

## Options and further development
There are currently no options. Feel free to branch and PR! This package
will not be actively maintained since it has served its immediate purpose
for us. This is my first gulp plugin so if I have made any mistakes or
missed any tricks please let me know :)
