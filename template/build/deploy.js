'use strict'
require('./check-versions')()
require('dotenv').config()

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

if (!process.env.PUBLIC_SERVER_HOST || !process.env.PUBLIC_SERVER_USERNAME || !process.env.PUBLIC_SERVER_PASSWORD || !process.env.PUBLIC_SERVER_PATH) {
  error('You need to set-up environment variables first.')
  process.exit(1)
}

if (!fs.existsSync(config.build.assetsRoot)) {
  error('You must build your project before. Use `npm run build`\n')
  process.exit(1)
}

spinner.text = 'Publishing ' + config.afp.publicDir + ' ...'
client.scp(config.build.assetsRoot, {
  host: process.env.PUBLIC_SERVER_HOST,
  username: process.env.PUBLIC_SERVER_USERNAME,
  password: process.env.PUBLIC_SERVER_PASSWORD,
  path: path.resolve(process.env.PUBLIC_SERVER_PATH,config.afp.publicDir)
}, err => {
  if (err) {
    error(err)
    process.exit(1)
  }
  success('Your project has been successfully published.\n')
  success('Url : ' + config.build.assetsPublicPath + '\n')
  spinner.stop()
  process.exit(0)
})