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

  wp.on('change', (filePath/* mtime, explanation */) => {
    if (filePath.endsWith('css')) ws.send('reload-css')
    else if (filePath.endsWith('js')) ws.send('reload-js')
    else if (!filePath.endsWith('~')) ws.send('reload')
  })
})
