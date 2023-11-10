const bullet = '\u2022'
const ws = new WebSocket('ws://localhost:23191')

const wsLog = (name, value) => {
  if (value) {
    console.log(`WS ${name} ${bullet}${bullet}`, value)
  } else {
    console.log(`WS ${name}`)
  }
}

const wsSend = (name, payload = null) => {
  if (ws.readyState !== WebSocket.OPEN) {
    wsLog('not open')
  } else {
    const obj = { name, payload }
    wsLog('send', obj)
    ws.send(JSON.stringify(obj))
  }
}

ws.addEventListener('open', evt => {
  wsLog('open', evt)
})

ws.addEventListener('message', evt => {
  const data = JSON.parse(evt.data)
  wsLog('message', data)
  handleMessage(data)
})

const handleMessage = data => {
  switch (data.name) {
    case 'reload':
      reload()
      break
    case 'reload-css':
      cssReload()
      break
    case 'reload-js':
      reload()
      break
    default:
      console.warn('message ignored', data)
  }
}
