var generators = require('yeoman-generator');
var camelize = require('camelize');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  /**
   * Prompt user.
   * Project name defaults to current folder.
   * Author's name is saved.
   */
  prompting: function () {
    var questions = [
      {
        type    : 'input',
        name    : 'project',
        message : 'Project name',
        default : this.project
      },
      {
        type    : 'input',
        name    : 'description',
        message : 'Project description',
      },
      {
        type    : 'input',
        name    : 'author',
        message : 'Author name',
        store   : true
      }
    ];
    var done = this.async();

    return this.prompt(questions, function (answers) {
      this.project = answers.project;
      this.description = answers.description;
      this.author = answers.author;
      this.year = (new Date()).getYear() + 1900;

      done();
    }.bind(this));
  },
  writing: function () {
    this.log('Writing some copypasta');

    this.destinationRoot(this.project);

    this.template('lib/index.js');
    this.template('lib/map.js');
    this.template('LICENSE');
    this.template('package.json');
    this.template('README.md');

    this.copy('eslintrc.json', '.eslintrc.json');
    this.copy('gitignore', '.gitignore');
    this.copy('npmignore', '.npmignore');
    this.directory('test');
  },
  installing: function () {
    this.log('Installing dependencies');
    var dev = [
      'eslint',
      'eslint-config-standard',
      'eslint-plugin-promise',
      'eslint-plugin-standard',
      'tape'
    ];
    this.npmInstall(['tile-reduce'], { 'save': true });
    this.npmInstall(dev, { 'saveDev': true });
  }
});
