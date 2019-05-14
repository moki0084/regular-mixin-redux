/**
 * configs
 * Created by huanju on 2019-05-14.
 */

const path = require('path')

process.env.NODE_ENV = 'production'

const basePath = path.join(__dirname, '..')
const distPath = path.join(basePath, '/dist/')
const srcPath = path.join(basePath, '/src/')
const entry = path.join(srcPath, '/index.js')

module.exports = {
  basePath,
  distPath,
  srcPath,
  entry,
  entryName: 'index'
}
