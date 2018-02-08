const fs = require('fs')
const crypto = require('crypto')

/**
 * Checksum, calculate a target object checksum info.
 */
function checksum (value, { algorithm, encoding } = { algorithm: 'md5', encoding: 'hex' }) {
  if (typeof value === 'string') {
    value = Buffer.from(value)
  }
  if (!Buffer.isBuffer(value)) {
    value = Buffer.from(JSON.stringify(value))
  }

  const hash = crypto.createHash(algorithm)

  // http://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm
  if (!hash.write) {
    // pre-streaming crypto API in node < v0.9
    hash.update(value)
  } else {
    // v0.9+ streaming crypto
    // http://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
    hash.write(value)
  }

  return hash.digest(encoding)
}

/**
 * Checksum File
 */
checksum.file = function (filename, options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const { algorithm, encoding } = Object.assign({ algorithm: 'md5', encoding: 'hex' }, options)

  fs.stat(filename, (err, stat) => {
    if (!err && !stat.isFile()) err = new Error('Not a file')
    if (err) return callback(err)

    const hash = crypto.createHash(algorithm),
      fileStream = fs.createReadStream(filename)

    if (!hash.write) { // pre-streaming crypto API in node < v0.9
      fileStream.on('data', (data) => {
        hash.update(data)
      })

      fileStream.on('end', () => {
        callback(null, hash.digest(encoding))
      })
    } else { // v0.9+ streaming crypto
      hash.setEncoding(encoding)
      fileStream.pipe(hash, { end: false })

      fileStream.on('end', () => {
        hash.end()
        callback(null, hash.read())
      })
    }
  })
}

module.exports = checksum
