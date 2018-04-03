'use strict'
require('dotenv').config()

const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const success = val => console.log(chalk.green(val))
const error = val => console.log(chalk.red(val))
const client = require('scp2')
const fs = require('fs')
const config = require('./config')

const spinner = ora('Initializing...')
spinner.start()
console.log()

if (!process.env.PUBLIC_SERVER_HOST || !process.env.PUBLIC_SERVER_USERNAME || !process.env.PUBLIC_SERVER_PASSWORD || !process.env.PUBLIC_SERVER_PATH) {
  error('You need to set-up environment variables first.')
  process.exit(1)
}

const buildPath = path.resolve(__dirname, 'dist', config.publicDir)

if (!fs.existsSync(path.join(buildPath, 'index.html'))) {
  error('You must build your project before. Use `npm run build`\n')
  process.exit(1)
}

spinner.text = 'Publishing ' + config.publicDir + ' ...'
client.scp(buildPath, {
  host: process.env.PUBLIC_SERVER_HOST,
  username: process.env.PUBLIC_SERVER_USERNAME,
  password: process.env.PUBLIC_SERVER_PASSWORD,
  path: path.resolve(process.env.PUBLIC_SERVER_PATH, config.publicDir)
}, err => {
  if (err) {
    error(err)
    process.exit(1)
  }
  success('Your project has been successfully published.\n')
  success('Url : ' + config.buildsUrl + config.publicDir + '\n')
  spinner.stop()
  process.exit(0)
})