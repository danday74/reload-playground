// http://bluebirdjs.com/docs/api/deferred-migration.html

function defer() {
  let resolve
  let reject
  const promise = new Promise(function () {
    resolve = arguments[0]
    reject = arguments[1]
  })
  return {
    resolve, reject, promise
  }
}

module.exports = defer
