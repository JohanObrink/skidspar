const rdbd = require('rethinkdbdash')
const config = {db: 'skidspar'}

const r = rdbd(config)

module.exports = r
