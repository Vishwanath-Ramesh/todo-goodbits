const isProd = String(process.env.NODE_ENV).toLowerCase() === 'production'

var serverConfig = {}

if (isProd) {
  serverConfig = {}
} else {
  serverConfig = {}
}

export { serverConfig }
