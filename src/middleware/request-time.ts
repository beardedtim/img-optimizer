import Koa from 'koa'
// How many nanoseconds per second?
const NS_PER_SEC = 1e9
// How do we transform the hrtime to a string?
const hrToStr = (hr: [number, number]) => `${hr[0] * NS_PER_SEC + hr[1]}`

const requestTime = (): Koa.Middleware => async (ctx, next) => {
  // get a reference to the start time
  const start = process.hrtime()
  // wait for the middleware to process
  await next()

  // Get the difference between them
  const diff = process.hrtime(start)
  ctx.set('X-Request-Time', hrToStr(diff) + ' nanoseconds')
}

export default requestTime
