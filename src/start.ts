import server from './server'

const instance = server.listen(process.env.PORT, () =>
  server.logger.info(`Service started at ${process.env.PORT}`)
)

process.on('uncaughtException', e => {
  server.logger.fatal({ err: e }, 'UNCAUGHT EXCEPTION. SHUTTING DOWN')

  instance.close(() => {
    process.exit(1)
  })
})

process.on('unhandledRejection', e => {
  server.logger.fatal({ error: e }, 'UNHANDLED REJECTION. SHUTTING DOWN')

  instance.close(() => {
    process.exit(1)
  })
})
