/* global describe: true */
/* global it: true */
/* eslint no-new-wrappers: off */

var assert = require('assert')
var checksum = require('../')

describe('checksum', () => {
  it('should checksum [ string, number, object ] with hex encoding', () => {
    assert.equal('098f6bcd4621d373cade4e832627b4f6', checksum('test'))
    assert.equal('202cb962ac59075b964b07152d234b70', checksum(123))
    assert.equal('bdf3ba77b9e770b0d8dd8abc5d5d60fa', checksum({ name: 'allex' }))
  })

  it('should checksum with a local filename', (done) => {
    return checksum.file('./package.json', (err, sum) => {
      assert.ok(true)
      done(err)
    })
  })
})
