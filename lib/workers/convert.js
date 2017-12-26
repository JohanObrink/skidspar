const r = require('../adapters/rethink')
const rxHref = /<a href=\"(.*)\">Gå till anläggningssidan<\/a>/
const rxTracks = /Spår: (.*)<br \/>/
const rxTrack = /(.*) (.*) km/

function parseHref (desc) {
  return rxHref.test(desc) ? desc.match(rxHref)[1] : ''
}

function parseTracks (tracks) {
  return rxTracks.test(tracks)
    ? tracks
      .match(rxTracks)[1]
      .split(', ')
      .map (track => parseTrack(track))
      .filter(t => t)
    : []
}

function parseTrack (track) {
  if (!rxTrack.test(track)) {
    return null
  }
  const matches = track.match(rxTrack)
  return {
    name: matches[1].trim(),
    km: parseFloat(matches[2])
  }
}

function marker (m) {
  console.log(m)
  return {
    id: m.id,
    title: m.title,
    location: r.point(parseFloat(m.lng, 10), parseFloat(m.lat)),
    href: parseHref(m.infowindow),
    tracks: parseTracks(m.infowindow)
  }
}

module.exports = {marker}
