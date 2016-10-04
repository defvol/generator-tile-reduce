'use strict';

var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs-extra');
var path = require('path');

describe('npm-pasta:app', function () {

  before(function (done) {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ 'skip-install': true })
      .inTmpDir(function (dir) {
        var done = this.async();
        var templates = __dirname + '../generators/app/templates/';
        fs.copy(path.join(templates), dir, done);
      })
      .withPrompts({ project: 'npm-foo' })
      .on('end', done);
  });

  it('creates the project files', function () {
    assert.file([
      '.eslintrc.json',
      '.gitignore',
      '.npmignore',
      'LICENSE',
      'README.md',
      'lib/index.js',
      'lib/map.js',
      'package.json',
      'test/map.test.js'
    ]);
  });

  it('updates templates correctly', function () {
    var content = new RegExp('tile-reduce');
    assert.fileContent('lib/index.js', content);
    content = new RegExp('tile');
    assert.fileContent('lib/map.js', content);
  });

});
