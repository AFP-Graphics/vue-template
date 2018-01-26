const path = require('path')
const fs = require('fs')

const { sortDependencies, installDependencies, initializeRepository, runLintFix, printMessage } = require('./utils')

const pkg = require('./package.json')
const templateVersion = pkg.version

module.exports = {
  helpers: {
    template_version() {
      return templateVersion
    }
  },
  prompts: {
    name: {
      type: "string",
      required: true,
      message: "Name your project (lowercase and dashes only)",
      default: "my-awesome-project"
    },
    description: {
      type: "string",
      required: false,
      message: "Describe your project",
      default: "A Vue.js project with AFP templating"
    },
    author: {
      type: "string",
      message: "Who are you ?"
    },
    mainComponent: {
      type: "list",
      message: "Want some help to begin ?",
      choices: [
        {
          name: "Let me create from scratch",
          value: "basic",
          short: "basic"
        },
        {
          name: "I want to draw charts and maps (D3)",
          value: "d3",
          short: "d3"
        },
        {
          name: "I want to switch between figures (slideshow)",
          value: "slideshow",
          short: "slideshow"
        }
      ]
    },
    lint: {
      type: "confirm",
      message: "Want to lint your code ?",
      default: true
    },
    autoInstall: {
      type: "confirm",
      message: "Should I run `npm install` for you after the project has been created ?",
      default: true
    },
    initRepo: {
      type: "confirm",
      message: "Should I initialize a repository for the project ?",
      default: true
    }
  },
  skipInterpolation: "src/**/*.vue",
  completeMessage: "{{#inPlace}}To get started:\n\n  npm install\n  npm run dev.{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev.{{/inPlace}}",
  complete: function (data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    Promise.resolve()
      .then(() => {
        if (data.autoInstall) {
          return installDependencies(cwd, 'npm', green)
            .then(() => {
              return runLintFix(cwd, data, green)
            })
            .catch(e => {
              console.log(chalk.red('Error:'), e)
            })
        } else {
          return Promise.resolve()
        }
      })
      .then(() => {
        if (data.initRepo) {
          return initializeRepository(cwd, 'git', green)
        } else {
          return Promise.resolve()
        }
      })
      .then(() => {
        printMessage(data, green)
      })
      .catch(e => {
        console.log(chalk.red('Error:'), e)
      })
  }
}