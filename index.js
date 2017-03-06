'use strict'
const chalk = require('chalk')

const STATUS_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green'
}

/**
 * Logger
 *
 * @param {object} winstonInstance
 */
function logger (winstonInstance) {
  return async function middleWare (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start

    let logLevel
    if (ctx.status >= 500) {
      logLevel = 'error'
    } else if (ctx.status >= 400) {
      logLevel = 'warn'
    } else if (ctx.status >= 100) {
      logLevel = 'info'
    }

    let msg = (chalk.gray(`${ctx.method} ${ctx.originalUrl}`) +
    chalk[STATUS_COLORS[logLevel]](` ${ctx.status} `) +
    chalk.gray(`${ms}ms`))

    winstonInstance.log(logLevel, msg)
  }
}

module.exports = logger
