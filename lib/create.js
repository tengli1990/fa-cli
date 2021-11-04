const { relative, resolve } = require('path')
const validateProjectName = require('validate-npm-package-name')
const chalk = require('chalk')

async function create(projectName, options) {
  // console.log('create.js:2', projectName, options)

  // 执行路径
  const cwd = options.cwd || process.cwd()
  // 是否在当前目录
  const inCurrent = projectName === '.'
  // 拿到当前目录的名字
  const name = inCurrent ? relative('../', cwd) : projectName
  // 目标文件夹绝对路径
  const targetDir = resolve(cwd, projectName || '.')
  // 验证是否是一个有效的package name
  const result = validateProjectName(name);

  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach((err) => {
      console.error(chalk.red(`Error: ${err}`))
    })
    result.warnings &&
      result.warnings.forEach((warn) => {
        console.error(chalk.red.dim("Warning: " + warn));
      });
    process.exit(1);
  }

  console.log(name, targetDir)
  console.log('cwd', cwd)
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    console.error(err);
    // if (!process.env.CLI_TEST) {
    //   process.exit(1)
    // }
  });
};