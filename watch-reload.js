const Websocket = require('./server/js/websocket.class')
const Watchpack = require('watchpack')
const ignored = require('./server/js/get-git-ignored')

const ws = new Websocket()
const wp = new Watchpack({ ignored: ['**/.git', ...ignored] })

ws.init().then(() => {
  wp.watch({
    files: [],
    directories: [
      'client',
      'server'
    ]
  })

  wp.on('aggregated', () => {
    ws.send('reload')
  })
})
