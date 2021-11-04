#!/usr/bin/env node
const path = require("path");
const { Command, Option } = require("commander");
const { version } = require("../package.json");
const chalk = require("chalk");

const program = new Command()
program
// 属性值为boolean
  .option('-d, --debug', 'output extra debugging')
  // 属性值为 字符串
  .option('-p, --pizza-type <type>','fa of pizza')
  // 设置默认值
  .option('-s, --small','-s描述', false)
  // .option('-t, --t-type','-t描述', 'biz')
  .option('--no-source','remove source')
  // 设置可选参数
  .option('-c, --chinese [type]', 'this is a chinese')
  // 必填选项
  // .requiredOption('-m, --must [type]','this is a must be write')
  // 变长参数选项 & 设置默认
  .option('-n, --number [numbers...]', 'specifay numbers', ['11','22'])
  
// 构造对象添加选项 使用hideHelp方法隐藏帮助
program
  .addOption(new Option('-x, --xbit-type <type>').hideHelp())
  .addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, 'one minute'))
  //选择输出
  .addOption(new Option('-q, --drink <size>', 'drink cup size').choices(['small', 'medium', 'large']))

function parseFloat(value, dummyPrevious){ 
  console.log(value , dummyPrevious)
  console.log(parseInt(value, 20))
}
program
.option('-k, --float <number>', 'float argument', parseFloat)
// 版本号输出
program.version(`v${version}`, "-v, --version");

program.parse(process.argv);

const options = program.opts();

console.log(options, program.args)
if(options.pizzaType) console.log(1111)
