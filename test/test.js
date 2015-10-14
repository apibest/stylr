var assert = require('chai').assert;
var compiler = require('../modules/CompileService');

describe('CompileService', function () {
    describe('Constructor', function () {
        describe('Uniqness of new instances', function () {
            it('Invocations create unique instances!', function () {
                assert.notEqual(compiler(), compiler());
            });
        });
    });

    describe('Driver', function () {
        describe('Default parameter', function () {
            it('Returns "node-sass" as default service', function () {
                var test = compiler();
                assert.equal(test.getDriver(), require('node-sass'));
            });
        });

        describe('Custom driver', function () {
            it('Return custom modules', function () {
                var test = compiler();
                test.setDriver('less');
                assert.equal(test.getDriver(), require('less'));
            });
        })
    });

    describe('Source', function () {
        describe('Correct setting and getting of the path through constructor', function () {
            it('Returns correct value', function () {
                var test = compiler('test/test.scss');
                assert.notEqual(test.getSource(), undefined, 'Source should be set');
            });
        });

        describe('Correct setting and getting of the path through getters/setters', function () {
            it('Returns correct value', function () {
                var test = compiler();
                test.setSource('test/test.scss');
                assert.notEqual(test.getSource(), undefined, 'Source should be set');
            });
        });
    });

    describe('Compilation', function () {

        describe('Compile custom .scss file', function () {
            it('Returns compiled styles', function () {
                var test = compiler('test/test.scss');
                test.compile(null , function (result) {
                    assert.equal(result.css instanceof Buffer, true, 'Compiled!');
                });
            });
        });
    });

    describe('Compiled styles', function () {
        describe('Correct caching of the compiled styles', function () {
            it('Return value of compile is equal to cached value', function () {
                var test = compiler('test/test.scss');

                test.compile(null, function (result) {
                    assert.notEqual(result, undefined);
                    assert.notEqual(test.getCompiledStyles(), undefined);
                    assert.equal(result.css, test.getCompilesStyles());
                });
            });
        });
    });

});

