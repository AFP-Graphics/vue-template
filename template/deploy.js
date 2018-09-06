'use strict'
require('dotenv').config()

const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const success = val => console.log(chalk.green(val))
const error = val => console.log(chalk.red(val))
const client = require('scp2')
const fs = require('fs')
const EdgeGrid = require('edgegrid')
const config = require('./config')

async function main () {
  const spinner = ora('Initializing...')
  try {
    spinner.start()
    console.log()

    if (
      !process.env.PUBLIC_SERVER_HOST ||
      !process.env.PUBLIC_SERVER_USERNAME ||
      !process.env.PUBLIC_SERVER_PASSWORD ||
      !process.env.PUBLIC_SERVER_PATH ||
      !process.env.AKAMAI_CLIENT_SECRET ||
      !process.env.AKAMAI_HOST ||
      !process.env.AKAMAI_ACCESS_TOKEN ||
      !process.env.AKAMAI_CLIENT_TOKEN
    ) {
      throw new Error('You need to set-up environment variables first.')
    }

    const buildPath = path.resolve(__dirname, 'dist', config.publicDir)

    if (!fs.existsSync(path.join(buildPath, 'index.html'))) {
      throw new Error('You must build your project before. Use `npm run build`\n')
    }

    spinner.text = `Publishing ${config.publicDir} ...`

    await uploadDir(buildPath)

    const publicUrl = config.buildsUrl + config.publicDir

    spinner.text = `Flush cache ${config.publicDir} ...`

    const flushData = {
      objects: [
        `${publicUrl}/`,
        `${publicUrl}/index.html`
      ]
    }

    await flushCache(flushData)

    spinner.stop()
    success('Your project has been successfully published.\n')
    success(`Url : ${publicUrl}\n`)

    process.exit(0)
  } catch (err) {
    spinner.stop()
    error(err)
    process.exit(1)
  }
}

function uploadDir (buildPath) {
  return new Promise ((resolve, reject) => {
    client.scp(buildPath, {
      host: process.env.PUBLIC_SERVER_HOST,
      username: process.env.PUBLIC_SERVER_USERNAME,
      password: process.env.PUBLIC_SERVER_PASSWORD,
      path: path.resolve(process.env.PUBLIC_SERVER_PATH, config.publicDir)
    }, err => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

function flushCache (data) {
  return new Promise ((resolve, reject) => {
    const eg = new EdgeGrid(
      process.env.AKAMAI_CLIENT_TOKEN,
      process.env.AKAMAI_CLIENT_SECRET,
      process.env.AKAMAI_ACCESS_TOKEN,
      process.env.AKAMAI_HOST
    )

    eg.auth({
      path: '/ccu/v3/invalidate/url/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).send((err, response, body) => {
      if (err) {
        return reject(err)
      }
      return resolve(body)
    })
  })
}

main()
