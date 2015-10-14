var compiler = require('./modules/CompileService');
var cliReader = require('./modules/CLIReader');

var test = compiler('./test/test.scss');

console.log(Array.prototype.slice.call(process.argv, [2]));

test.compile({a: 'test', file: '../src/styles/main.scss'}, function (result) {
    //console.log(result.css.toString());
})
