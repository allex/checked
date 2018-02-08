// vim: set ft=javascript fdm=marker et ff=unix tw=80 sw=2:

var path = require('path')
var babel = require('rollup-plugin-babel')
var cleanup = require('rollup-plugin-cleanup')
var pkg = require('./package.json')
var builtins = require('rollup-plugin-node-builtins')

var plugins = [
  builtins(),
  babel({
    babelrc: true,
    runtimeHelpers: false,
    exclude: 'node_modules/**'
  }),
  cleanup({
    comments: 'none',
    maxEmptyLines: 2
  })
]

var banner =
  '/*!\n' +
  ' * checkid v' + pkg.version + '\n' +
  ' */\n'

var external = Object.keys(pkg.dependencies).concat(['fs', 'path', 'crypto'])

module.exports = {
  destDir: path.join(__dirname, './dist'),
  entry: [
    {
      input: 'src/index.js',
      plugins,
      external,
      targets: [
        {
          format: 'cjs',
          file: 'checkid.js',
          banner
        },
        {
          format: 'es',
          file: 'checkid.esm.js',
          banner
        }
      ]
    }
  ]
}
