import Koa from 'koa'

const errorCatching = (): Koa.Middleware => async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    const oldBody = ctx.body

    ctx.status = e.status
    ctx.body = {
      error: {
        message: e.message,
        stack: !ctx.isProduction ? e.stack : undefined,
        originalBody: oldBody
      }
    }
  }
}

export default errorCatching
