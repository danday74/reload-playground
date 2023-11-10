const reload = () => {
  window.location.reload()
  // window.location.reload() does a soft reload
  // sadly, JavaScript does not support a hard reload
  //
  // a soft reload only works if web server caching is disabled
  //
  // with npm's http-server ... http-server -c-1 ... prevents caching
  // OR
  // set an appropriate https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
  // web server response header (e.g. max-age, no-cache)
  //
  // also worth looking at Cache-Control request headers!
}

const cssReload = () => {
  const links = document.head.getElementsByTagName('link')
  Array.from(links).forEach(link => {
    const href = new URL(link.href)
    href.searchParams.set('rnd', new Date().getTime().toString())
    link.href = href.toString()
  })
}
