const origColor = 'rgb(2, 115, 206)'

const onDoIt = () => {
  const el = document.querySelector('button')
  const style = window.getComputedStyle(el)
  const bgColor = style.backgroundColor
  el.style.backgroundColor = bgColor === origColor ? '#000000' : origColor
}

const onWsSend = () => {
  wsServiceSend('hello', 'message from client')
}
