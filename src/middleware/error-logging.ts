import Koa from 'koa'
import { STATUS_CODES } from 'http'
const transformMessage = (message: string) => message

const errorLogging = (): Koa.Middleware => async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    let status = e.code || e.status
    let message = transformMessage(e.message)

    // If they did not give us one
    // or the status they gave is not a valid
    // http status
    if (!status || status <= 99 || status >= 600) {
      status = 500
    }

    if (!message) {
      message = STATUS_CODES[status] || 'INTERNAL::Server Error'
    }

    // Log it
    ctx.logger.error({ error: e, message })

    // Let the next handler deal with the actual error
    e.message = message
    e.status = status

    throw e
  }
}

export default errorLogging
