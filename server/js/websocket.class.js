const { WebSocketServer } = require('ws')
const config = require('../../config')
const defer = require('./defer')

class Websocket {
  #ws = null
  #messageFunc = data => console.log(`ws receive ${config.bullet}${config.bullet}`, data)

  async init(port = config.websocketPort) {
    const wss = new WebSocketServer({ port })
    const deferred = defer()

    wss.on('connection', (ws) => {
      this.#ws = ws
      this.#ws.on('error', console.error)
      this.#ws.on('message', rawData => {
        const data = JSON.parse(rawData)
        this.#messageFunc(data)
      })
      deferred.resolve()
    })

    return deferred.promise
  }

  // noinspection JSUnusedGlobalSymbols
  onMessage(messageFunc) {
    this.#messageFunc = messageFunc
  }

  send(name, payload = null) {
    if (this.#ws == null || this.#ws.readyState !== 1) {
      console.warn('ws not open')
    } else {
      const obj = { name, payload }
      console.log(`ws send ${config.bullet}${config.bullet}`, obj)
      this.#ws.send(JSON.stringify(obj))
    }
  }
}

module.exports = Websocket
