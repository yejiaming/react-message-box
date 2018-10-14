const path = require('path');
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const shell = require('shelljs');
const pascalCase = require('pascal-case');

process.chdir(path.resolve(__dirname, '..'));

// const exec = (command, extraEnv) =>
//   execSync(command, {
//     stdio: 'inherit',
//     env: Object.assign({}, process.env, extraEnv)
//   });

// const packageName = require('../package.json').name;

// console.log('\nBuilding CommonJS modules...');

// exec(`rollup -c rollup/config.js -f cjs -o lib/cjs/${packageName}.js`);

// console.log('\nBuilding ES modules...');

// exec(`rollup -c rollup/config.js -f es -o lib/esm/${packageName}.js`);

// console.log('\nBuilding UMD modules...');

// exec(
//   `rollup -c rollup/config.js -f umd -n ${pascalCase(
//     packageName
//   )} -o lib/umd/${packageName}.js`,
//   {
//     BUILD_ENV: 'development'
//   }
// );

// exec(
//   `rollup -c rollup/config.js -f umd -n ${pascalCase(
//     packageName
//   )} -o lib/umd/${packageName}.min.js`,
//   {
//     BUILD_ENV: 'production'
//   }
// );
var child = shell.exec(`npm publish`, { async: true }, function (code, stdout, stderr) {
  // 如果出现该错误，则可能是执行过npm login
  if (stderr.indexOf('npm adduser') >= 0) {
    shell.exec(`npm login`, { async: true }, function (code, stdout, stderr) {

    });
    return;
  }
  // console.log(stderr);
});
child.stdout.on('data', function (data) {
  /* ... do something with data ... */
  // console.log(data)
});

// exec(`npm publish`, function (err, stdout, errout) {
//   // err是执行结果，是否有错  
//   // stdout是标准输出，即shell命令执行后的结果  
//   // errout是错误输出  
//   // value = stdout;// 把返回值给value  
//   console.log(33,err)
//   console.log(44,stdout)
//   console.log(55,errout)
// });

