const r = require('../adapters/rethink')
const fetch = require('node-fetch')
const {toJson} = require('xml2json')
const {inspect} = require('util')
const {writeFileSync} = require('fs')

const host = 'https://www.skidspar.se'

function list () {
  const url = `${host}/gmap_markers.php`
  console.log(`Calling ${url}`)
  return fetch(url)
    .then(res => res.text())
    .then(xml => JSON.parse(toJson(xml)))
    .then(json => json.markers.marker)
    .catch(err => console.error(err) || Promise.reject(err))
}

module.exports = {list}
