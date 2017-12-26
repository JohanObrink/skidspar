const {expect} = require('chai')
const proxyquire = require('proxyquire')
const {spy} = require('sinon')

describe('workers/convert', () => {
  let convert, r
  beforeEach(() => {
    r = {
      point: spy((lon, lat) => ({point: {lon, lat}})),
      '@noCallThru': true
    }
    convert = proxyquire(`${process.cwd()}/lib/workers/convert`, {
      '../adapters/rethink': r
    })
    
  })
  describe('marker', () => {
    it('converts a marker without status', () => {
      const marker = {
        id: '180',
        lat: '57.7731',
        lng: '14.2539',
        title: 'Öxnegården',
        color: 'red',
        infowindow: `<b>Öxnegården</b><br />
    <a href="/jonkoping/jonkoping/oxnegarden">Gå till anläggningssidan</a><br />
    Spår:  3.7 km,  5.5 km<br />`
      }
      const expected = {
        id: '180',
        title: 'Öxnegården',
        location: {point: {lon: 14.2539, lat: 57.7731}},
        href: '/jonkoping/jonkoping/oxnegarden',
        tracks: [{name: '', km: 3.7}, {name: '', km: 5.5}]
      }
      expect(convert.marker(marker)).to.eql(expected)
    })
    it('converts a marker with status', () => {
      const marker = {
        id: '1020',
        lat: '59.0401',
        lng: '14.9756',
        title: 'Östansjö elljusspår',
        color: 'green',
        infowindow: `<b>Östansjö elljusspår</b><br />
    <a href="/orebro/hallsberg/ostansjo-elljusspar">Gå till anläggningssidan</a><br />
    Spår:  1.5 km, Elljusspåret 2.5 km<br />\
<table border="0" cellpadding="0" cellspacing="0" style="margin-top:5px">\
<tr><td>\
<img src="/images/underlag3.png" border="0" class="betyg" alt="Underlag" />&nbsp;\
<img src="/images/sparkanter1.png" border="0" class="betyg" alt="Spårkanter" />&nbsp;</td>\
<td>(2017-12-16)</td></tr></table>`
      }
      const expected = {
        id: '1020',
        title: 'Östansjö elljusspår',
        location: {point: {lon: 14.9756, lat: 59.0401}},
        href: '/orebro/hallsberg/ostansjo-elljusspar',
        tracks: [{name: '', km: 1.5}, {name: 'Elljusspåret', km: 2.5}]
      }
      expect(convert.marker(marker)).to.eql(expected)
    })
  })
})
