'use strict';

var AngularGenerator,
    yeoman = require('yeoman-generator'),
    chalk  = require('chalk'),
    path   = require('path');

module.exports = AngularGenerator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },

  init: function() {
    this.prompts = [];
    this.configPath = this.destinationPath('config.json');
    try {
      this.config = require(this.configPath);
    } catch (error) {
      this.config = {};
    }
  },

  askFor: function() {
    var done = this.async();

    this.log(chalk.magenta('You\'re using the fantastic adorable generator.'));

    this.prompts.push({
      name: 'generate',
      type: 'confirm',
      message: 'This will scaffold an angular project. Do you want to continue?',
      default: true
    });
    this.prompts.push({
      name: 'nwjs',
      type: 'confirm',
      message: 'Is this an nw.js project?',
      default: false
    });
    this.prompts.push({
      name: 'projectName',
      type: 'input',
      message: 'What is the name of your project? (no spaces, or symbols)',
      default: process.cwd().split(path.sep).pop()
    });
    this.prompts.push({
      name: 'projectDesc',
      type: 'input',
      message: 'Enter a brief project description'
    });
    this.prompts.push({
      name: 'src',
      type: 'confirm',
      message: 'Do you want to generate the full src folder?',
      default: true
    });
    this.prompts.push({
      name: 'gulp',
      type: 'confirm',
      message: 'Do you want to generate the gulp files?',
      default: true
    });
    this.prompts.push({
      name: 'deploGh',
      type: 'confirm',
      message: 'Will this application be deployed to gh-pages?',
      default: false
    });

    var self = this;
    this.prompt(this.prompts, function(answers) {
      var answer, question;
      for (question in answers) {
        answer = answers[question];
        self.config[question] = answer;
      }
      return done();
    });
  },

  projectfiles: function() {
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.config);
    this.fs.copyTpl(this.templatePath('_bower.json'), this.destinationPath('bower.json'), this.config);
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), this.config);
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'));
    this.fs.copy(this.templatePath('Gulpfile.js'), this.destinationPath('Gulpfile.js'));
    this.fs.copy(this.templatePath('Procfile'), this.destinationPath('Procfile'));
    this.fs.copy(this.templatePath('server.js'), this.destinationPath('server.js'));
    this.fs.copy(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'));
  },

  gulpfiles: function() {
    if (!this.config.generate || !this.config.gulp) { return; }
    this.fs.copyTpl(this.templatePath('Gulpfile.js'), this.destinationPath('Gulpfile.js'));
    this.fs.copy(this.templatePath('gulp'), this.destinationPath('gulp'));
  },

  deployfiles: function() {
    if (!this.config.generate || !this.config.deployGh) { return; }
    this.fs.copyTpl(this.templatePath('_gulp_tasks_deploy-gh.js'), this.destinationPath('gulp/tasks/deploy-gh.js'));
  },

  srcfiles: function() {
    if (!this.config.generate || !this.config.src) { return; }

    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copyTpl(this.templatePath('_src_app_components_data_data.js'), this.destinationPath('src/app/components/data/data.js'), this.config);
    this.fs.copyTpl(this.templatePath('_src_app_components_navbar_navbar.js'), this.destinationPath('src/app/components/navbar/navbar.js'), this.config);
    this.fs.copyTpl(this.templatePath('_src_app_index.jade'), this.destinationPath('src/app/index.jade'), this.config);
    this.fs.copyTpl(this.templatePath('_src_app_index.js'), this.destinationPath('src/app/index.js'), this.config);
    this.fs.copyTpl(this.templatePath('_src_app_main_main.js'), this.destinationPath('src/app/main/main.js'), this.config);
    this.fs.copyTpl(this.templatePath('_src_app_main_things_things.js'), this.destinationPath('src/app/main/things/things.js'), this.config);
  },

  end: function() {
    this.options.callback = function() { return this.emit('allDone'); };
    this.on('allDone', function() {
      this.log(chalk.green('\n# Awesome. Everything generated just fine!'));
    });
  }

});
