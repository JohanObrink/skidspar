const {list} = require('./import')
const {marker} = require('./convert')
const r = require('../adapters/rethink')

list()
  .then(markers => markers.map(m => marker(m)))
  .then(markers => r
    .table('anlaggningar')
    .insert(markers, {conflict: 'update'})
    .run()
  )
