import { Server } from './server'

const addContext = (context: any) => (server: Server): Server => {
  // Attach the keys on context
  // onto the server context prototype
  for (const [key, value] of Object.entries(context)) {
    server.context[key] = value
  }

  return server
}

export default addContext
