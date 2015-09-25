/// <vs SolutionOpened='watch_sass' />
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var gulpif = require("gulp-if");
var sass = require("gulp-sass");
var minifyCSS = require("gulp-minify-css");
var es = require("event-stream");
var gutil = require("gulp-util");
var htmlJsStr = require("js-string-escape");

var order = require('gulp-order');

var jsAssets = [
    {
        name: "libraries.min.js",
        dest: "Scripts",
        files: [
            "Scripts/jquery-1.10.2.js",
            "Scripts/jquery.validate.js",
            "Scripts/jquery.validate.unobtrusive.js",
            "Scripts/vui.validation.js",
            "Scripts/vui.checkbox.js",
            "Scripts/highcharts.js",
            "Scripts/app/utilities/preloadStore.js",
            "Scripts/app/utilities/stacktrace.js",
            "Scripts/modernizr-2.7.2.js"
        ]
    }, {
        name: "bootstrap.min.js",
        dest: "Scripts",
        files: [
            "Scripts/bootstrap.js",
            "Scripts/respond.js"
        ]
    }, {
        name: "angular.all.min.js",
        dest: "Scripts",
        files: [
            "Scripts/angular.js",
            "Scripts/angular-route.js",
            "Scripts/app/utilities/requestNotificationChannel.js",
            "Scripts/app/utilities/videa-util.js",
            "Scripts/ui-bootstrap-tpls-custom.js",
            "Scripts/ui-utils.js",
            "Scripts/ui-utils-ieshiv.js"
        ]
    }, {
        name: "app.min.js",
        dest: "Scripts/app/shared",
        angularModuleName: "videaShared",
        files: [
            "Scripts/app/shared/module.js",
            "Scripts/app/shared/{controllers,services,directives}/*.js",
            "Scripts/app/shared/templates/*.html"
        ]
    }, {
        name: "app.min.js",
        dest: "Scripts/app/sellers",
        files: [
            "Scripts/app/sellers/app.js",
            "Scripts/app/sellers/services/*.js",
            "Scripts/app/sellers/directives/*.js",
            "Scripts/app/sellers/controllers/*.js",
            "Scripts/app/sellers/templates/*.html"
        ]
    }, {
        name: "app.min.js",
        dest: "Scripts/app/account",
        files: [
            "Scripts/app/account/app.js",
            "Scripts/app/account/controllers/*.js"
        ]
    }, {
        name: "app.min.js",
        dest: "Scripts/app/admin",
        files: [
            "Scripts/app/admin/app.js",
            "Scripts/app/admin/services/*.js",
            "Scripts/app/admin/controllers/*.js"
        ]
    } 
];

var cssAssets = [
    {
        name: "site.min.css",
        dest: "Content/styles",
        files: [
            "Content/styles/bootstrap.css",
            "Content/styles/site.scss"
        ]
    }, {
        name: "buyers.min.css",
        dest: "Content/styles",
        files: [
            "Content/styles/buyers.scss"
        ]
    }, {
        name: "support.min.css",
        dest: "Content/styles",
        files: [
            "Content/styles/support.scss"
        ]
    },
    {
        name: "login-page.min.css",
        dest: "Content/styles",
        files: [
            "Content/styles/login-page.scss"
        ]
    },
    {
        name: "userpreferences.min.css",
        dest: "Content/styles",
        files: [
            "Content/styles/userpreferences.scss"
        ]
    },
    {
        name: "orderManagement.min.css",
        dest: "Content/styles",
        files: [
            "Content/styles/orderManagement.scss"
        ]
    }
];

// concat and minify js
gulp.task("build_js", function() {
    for (var i = 0; i < jsAssets.length; i++) {
        var assets = jsAssets[i];
        gulp.src(assets.files)
            .pipe(gulpif("*.html", angularTemplates({
                moduleName: assets.angularModuleName ? assets.angularModuleName : "videaApp",
                lowercase: false
            })))
            .pipe(order(assets.files, { base: './' }))
            .pipe(concat(assets.name))
            .pipe(uglify())
            .pipe(gulp.dest(assets.dest));
    }
});

// concat and minify css
gulp.task("build_css", function() {
    for (var i = 0; i < cssAssets.length; i++) {
        var assets = cssAssets[i];
        gulp.src(assets.files)
            .pipe(gulpif("*.scss", sass()))
            .pipe(concat(assets.name))
            .pipe(minifyCSS())
            .pipe(gulp.dest(assets.dest));
    }
});

// use a separate task to execute through watcher
gulp.task("build_site_css", function() {
    for (var i = 0; i < cssAssets.length; i++) {
        var assets = cssAssets[i];
        // filter out *.css files as we need to convert scss only
        // this allows to keep correct file timespamp
        // the rest of css files is coovered in 'build_css' task
        gulp.src(assets.files.concat('!./**/*.css'))
            .pipe(gulpif("*.scss", sass({
                errLogToConsole: true
            })))
            .pipe(gulp.dest("Content/styles"));
    }
});

// watch sass files
gulp.task("watch_sass", ["build_site_css"], function() {
    gulp.watch("Content/styles/*.scss", ["build_site_css"]);
});

function angularTemplates(options) {
    options = options || {};
    options.moduleName = options.moduleName || "app";
    options.base = options.base || function(file) {
        var path = file.path.replace(file.cwd, "");
        return options.lowercase ? path.toLowerCase() : path;
    };

    var templateWrapper = es.map(function(file, callback) {
        file.contents = Buffer.concat([
            new Buffer(gutil.template("angular.module(\"<%= moduleName %>\").run([\"$templateCache\", function($templateCache) {", {
                moduleName: options.moduleName,
                file: file
            })),
            file.contents,
            new Buffer("}]);")
        ]);
        callback(null, file);
    });

    var templatesCache = es.map(function templateCacheFile(file, callback) {
        file.contents = new Buffer(gutil.template("$templateCache.put(\"<%= url %>\",\"<%= contents %>\");", {
            url: options.base(file).replace(/\\/g, "/"),
            contents: htmlJsStr(file.contents),
            file: file
        }));
        callback(null, file);
    });

    return es.pipeline(templatesCache, concat("templates.js"), templateWrapper);
}

function nothing() {
    var func = es.map(function(file, callback) {
        console.log(file.relative);
        callback(null, file);
    });
    return es.pipeline(func);
}

// Default
gulp.task("default", ["build_js", "build_css"]);
