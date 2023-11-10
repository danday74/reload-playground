const { WebSocketServer } = require('ws')
const config = require('../../config')
const defer = require('./defer')

class Websocket {
  #ws = null
  #messageFunc = data => this.#log('message', data)

  #log(name, value) {
    if (value) {
      console.log(`WS ${name} ${config.bullet}${config.bullet}`, value)
    } else {
      console.log(`WS ${name}`)
    }
  }

  async init(port = config.websocketPort) {
    const wss = new WebSocketServer({ port })
    const deferred = defer()

    wss.on('connection', (ws) => {
      this.#log('connection')
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
      this.#log('not open')
    } else {
      const obj = { name, payload }
      this.#log('send', obj)
      this.#ws.send(JSON.stringify(obj))
    }
  }
}

module.exports = Websocket
