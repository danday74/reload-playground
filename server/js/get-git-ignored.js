const fs = require('fs')
const gitIgnored = fs.readFileSync('.gitignore', 'utf8')
const ignored = gitIgnored.split('\n').map(file => file.trim()).filter(file => file !== '')

module.exports = ignored
