/**
 * External Deps
 */
import Koa from 'koa'
import { compose } from 'ramda'
import logger, { Logger } from 'pino'

/**
 * MIDDLEWARE
 */
import addMiddleware from './middleware'
import addContext from './context'

/**
 * IMAGE PROCESSING
 */

import { read as readFromS3 } from './images/get-from-s3'
import { read as readFromURL } from './images/get-from-url'
import { save } from './images/save-to-s3'
import { parse } from './images/parse'
import { cache } from './cache'

export type Server = {
  logger: Logger
} & Koa

const log = logger()

const createServer = compose(addMiddleware(), addContext({ log }), () =>
  Object.assign(new Koa(), {
    logger: log
  })
)

// doing Object.assign to make TS happy
const server: Server = createServer()

interface QueryArgs {
  width?: string
  height?: string
  fit?: string
  format?: string
  quality?: string | number
  key?: string
  bucket?: string
  url?: string
}

server.use(async ctx => {
  try {
    const { query } = ctx
    const {
      quality = 80,
      width,
      height,
      fit,
      format,
      key = '',
      bucket = '',
      url
    } = query as QueryArgs
    // We build the key based on the
    // requested resource
    const cacheKey = `${
      url ? url : `${bucket}/${key}`
    }/${width}/${height}/${format}/${quality}/${fit}`
    // If I have seen this before
    if (await cache.has(cacheKey)) {
      // respond with it
      ctx.set('Content-Type', 'image/*')
      ctx.body = cache.get(cacheKey)
    } else {
      // else, we haven't seen it recently/before
      // so we need to go grab it
      const file: any = url
        ? await readFromURL(url)
        : await readFromS3(bucket, key)

      // optimize it
      const parsedFile = parse(file.body, {
        quality,
        width,
        height,
        fit,
        format
      })

      ctx.set('Cache-Control', 'public; max-age=31536000')
      ctx.set('Content-Type', 'image/*')
      ctx.body = parsedFile
      cache.set(cacheKey, ctx.body)
    }
  } catch (e) {
    console.dir(e)
    ctx.body = { error: true }
  }
})

export default server
