const Watchpack = require('watchpack')
const fs = require('fs')

const gitIgnored = fs.readFileSync('.gitignore', 'utf8')
const ignored = gitIgnored.split('\n').map(file => file.trim()).filter(file => file !== '')

const wp = new Watchpack({
  ignored: ['**/.git', ...ignored]
})

wp.watch({
  files: [],
  directories: ['css', 'js']
})

wp.on('change', () => {})

wp.on('aggregated', () => {
  console.log('aggregated')
})
