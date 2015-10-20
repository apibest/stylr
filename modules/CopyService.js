/**
 * Created by Illia Daynatovich on 20.10.15.
 */
var merge = require('merge');
var ncp = require('ncp').ncp;

var defaults = {
    sources: [],
    destFolder: '.tmp'
};

var init = function (options) {
    // Merge default settings with custom ones
    if (typeof options === 'object') {
        this.options = merge(defaults, options);
    } else {
        this.options = defaults;
    }
};

var copy = function(cb) {
    if (Array.isArray(this.options.sources)) {
        var that = this;
        ncp(that.options.sources[0], that.options.destFolder, function (err) {
            if (err) {
                return console.error(err);
            } else {
                ncp(that.options.sources[1], that.options.destFolder, function (err) {
                    if (err) {
                        return console.error(err);
                    } else {
                        if (typeof cb === 'function') {
                            cb();
                        }
                    }
                });
            }
        });
    } else if (typeof this.options.sources === 'object') {
        console.log('Source is an object');
    } else {
        throw new Error('Source should be object or an array');
    }

};

var CopyService = function (options) {
    if (!(this instanceof CopyService)) {
        return new CopyService(options);
    } else {
        this.init(options);
    }
};

// Bind methods to prototype
CopyService.prototype.init = init;
CopyService.prototype.copy = copy;

module.exports = CopyService;