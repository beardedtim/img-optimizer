import requestTime from './request-time'
import errorLogging from './error-logging'
import errorCatching from './error-catching'

import { Server } from '../server'

const addMiddleware = () => (server: Server): Server => {
  // Attach our middleware
  server.use(requestTime())
  server.use(errorCatching())
  server.use(errorLogging())

  return server
}

export default addMiddleware
