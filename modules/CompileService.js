// Definition of the Compiler class

// Include NodeJS binding of libsas

var merge = require('merge');
var fs = require('fs');
var CompileService;
var setDriver;
var getDriver;
var setSource;
var getSource;
var getOptions;
var setOptions;
var compile;
var getCompiledStyles;

// Constructor definition (begin)

CompileService = function (path) {
    // Making new instance even if the new keyword was missed
    if (!(this instanceof CompileService)) {
        return new CompileService(path);
    } else {
        // Instance initializing
        this.options = this.options || {};
        if (path) {
            this.setSource(path);
        }
        this.setDriver();

        // Explicit return of the instance
        return this;
    }

};

// Constructor definition (end)

// Class methods definition (begin)

setDriver = function (name) {
    // Set driver as Node-sass by defaults
    name = name || 'node-sass';
    this.driver = require(name);
};

getDriver = function () {
    return this.driver;
};

setSource = function (path) {
    var isAccessible = false;
    var source = process.cwd() + '/' + path;

    try {
        fs.accessSync(source, fs.R_OK);
        this.source = source;
        return true;
    } catch (err) {
        console.log(err);
        console.log();
        console.log('There is no such file or it\'s not accessible!');
        return false;
    }
};

getSource = function () {
    return this.source;
};

setOptions = function (options) {
    if (typeof options === 'object') {
        this.options = merge(this.options, options);
        return true;
    } else {
        return false;
    }

};

getOptions = function () {
    return this.options;
};

compile = function (params, cb) {
    this.options.file = this.source;
    if (typeof params !== 'object') {
        params = {};
    }

    this.options = merge(this.options, params);
    this.driver.render(this.options, function(err, result) {
        if (err) {
            return console.log(err.message);
        }

        if (typeof cb === 'function') {
            this.compiledStyles = result.css;
            cb(result);
        }
    });
};

getCompiledStyles = function () {
    return this.compiledStyles;
};

// Class methods definition (end)


// Bind methods to prototype (begin)

CompileService.prototype.setDriver = setDriver;
CompileService.prototype.getDriver = getDriver;
CompileService.prototype.setSource = setSource;
CompileService.prototype.getSource = getSource;
CompileService.prototype.getOptions = getOptions;
CompileService.prototype.setOptions = setOptions;
CompileService.prototype.compile = compile;
CompileService.prototype.getCompiledStyles = getCompiledStyles;

// Bind methods to prototype (end)

// Export class constructor
module.exports = CompileService;