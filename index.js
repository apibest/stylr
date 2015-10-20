var compiler = require('./modules/CompileService');
var cliReader = require('./modules/CLIReader');
var copier = require('./modules/CopyService');
var fs = require('fs');

var copy = copier({
    sources: ['./test', './test-shop']
});

var compile = function () {
    // Wait for file copying
    setTimeout(function () {
        var test = compiler('.tmp/test.scss');
        test.compile({a: 'test', file: './.tmp/test.scss'}, function (result) {
            fs.writeFile('./.tmp/test.scss', result.css.toString(), function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        });
    }, 1000);
};

copy.copy(compile);

//console.log(Array.prototype.slice.call(process.argv, [2]));
