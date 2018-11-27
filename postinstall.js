var shell = require('shelljs');
var inquirer = require('inquirer');
if (!process.env.PWD.match(/\/node_modules.*$/)) return;
var currentDir = process.env.PWD.replace(/\/node_modules.*$/, '');
inquirer
  .prompt([{
    type:'input',
    name:'staticDir',
    message: 'What`s your static asset dir(Current dir is "' + currentDir +'")? Please base on current dir!'
  }])
  .then(answers => {
    console.info('"gif.worker.js" had copied to "' + currentDir + '/' + answers.staticDir +'"');
    const gifWorker = shell.find('asset').filter(function (file) {
      return file.match(/gif.worker.js/);
    })
    shell.cp('-f', gifWorker, currentDir + '/' + answers.staticDir);
  });
