'use strict'
require('./check-versions')()

const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const success = val => console.log(chalk.green(val))
const error = val => console.log(chalk.red(val))
const client = require('scp2')
const fs = require('fs')
const config = require('../config')

const spinner = ora('Initializing...')
spinner.start()
console.log()

if (fs.existsSync(config.build.assetsRoot)) {
  spinner.text = 'Publishing ' + config.afp.publicDir + ' ...'
  client.scp(config.build.assetsRoot, {
    host: process.env.PUBLIC_SERVER_HOST,
    username: process.env.PUBLIC_SERVER_USERNAME,
    password: process.env.PUBLIC_SERVER_PASSWORD,
    path: path.resolve(process.env.PUBLIC_SERVER_PATH,config.afp.publicDir)
  }, err => {
    if (err) {
      error(err)
      spinner.stop()
      process.exit(1)
    }
    success('Your project has been successfully published.\n')
    success('Url : ' + config.build.assetsPublicPath + '\n')
    spinner.stop()
    process.exit(0)
  })
} else {
  error('You must build your project before. Use `npm run build`\n')
  process.exit(0)
}
