# Checksum

Checksum utility for node.

## Install

```sh
npm install checkid
```

## Usage

```js
import checksum from 'checkid'

assert.equal('bdf3ba77b9e770b0d8dd8abc5d5d60fa', checksum({ name: 'allex' }))
// -> true

checksum.file('./package.json', (err, sum) => {
  console.log(sum)
  // -> fd7ec61fe8adf6f6fac2cd1b1acd162c
})
```

## License

[MIT](http://opensource.org/licenses/MIT)

