#!/usr/bin/env node

var compiler = require('./modules/CompileService');
var cliReader = require('./modules/CLIReader');
var copier = require('./modules/CopyService');
var fs = require('fs');
var rimraf = require('rimraf');

// Definition of the reading from CLI (begin)
/*
var separator = 0;

for (var i = 0, length = process.argv.length; i < length; i += 1) {
    if (process.argv[i] === __filename) {
        separator = i;
        break;
    }
}

var parameters = process.argv.slice(separator+1);

console.log(parameters);


// Split parameters by parameter/value
for (var i = 0, length = parameters.length; i < length; i += 1) {
    var splitted = parameters[i].split('=');
    if (splitted.length === 1) {
        parameters[i] = splitted[0];
    } else {
        parameters[i] = splitted;
    }

}
console.log(parameters);
*/
// Definition of the reading from CLI (end)

var options;

var compile = function (err) {
    if (err) {
        return console.error(err);
    }
    // Wait for file copying
    setTimeout(function () {
        var test = compiler(options.temp + '/' + options.inputFile);
        test.compile({
            sourceMap: options.sourceMap,
            outFile: options.destination,
            outputStyle: 'compressed'
        }, function (result) {
            // Write to destination file
            fs.writeFile(options.destination, result.css.toString(), function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");

                // Delete temporary folder
                rimraf(options.temp, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Temporary directory has been deleted');
                });
            });

            if (typeof options.sourceMap === 'string')
            // Write sourcemaps to destination file
            fs.writeFile(options.sourceMap, result.map.toString(), function (err) {
                if (err) {
                    return console.error(err);
                }

                console.log("The sourcemap has been saved!");
            });
        });
    }, 1000);
};

// Parsing config file (begin)

fs.readFile(process.cwd() + '/.stylrrc', function (err, data) {
    var json;
    if (err) {
        return console.error(err);
    }

    // Parse config file
    options = JSON.parse(data);

    // Merge styles into temp directory
    var copy = copier(options);
    copy.copy(compile);
});

// Parsing config file (end)
