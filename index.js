var compiler = require('./modules/CompileService');
var cliReader = require('./modules/CLIReader');
var copier = require('./modules/CopyService');
var fs = require('fs');
var rimraf = require('rimraf');

var options;

var compile = function (err) {
    if (err) {
        return console.error(err);
    }
    // Wait for file copying
    setTimeout(function () {
        var test = compiler(options.temp + '/' + options.inputFile);
        test.compile({}, function (result) {
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
        });
    }, 1000);
};

// Parsing config file (begin)

fs.readFile('./.stylrrc', function (err, data) {
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
