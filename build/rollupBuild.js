const rollup = require('rollup')
const rollupBuble = require('rollup-plugin-buble')
const rollupResolve = require('rollup-plugin-node-resolve')
const rollupUrl = require('rollup-plugin-url')
const rollupCommonJS = require('rollup-plugin-commonjs')
const { distPath } = require('./configs')

async function rollupBuild (opt) {
  console.time(`---  ${opt.name} 编译  ---`)
  console.log(`--- ${opt.name} 编译开始  ---`)
  const bundle = await rollup.rollup({
    input: opt.path,
    plugins: [
      rollupUrl(),
      rollupResolve({ browser: true, main: true }),
      rollupCommonJS({
        sourceMap: false
      }),
      rollupBuble({
        target: {
          ie: 8
        },
        transforms: {
          modules: false,
          arrow: true,
          classes: true,
          conciseMethodProperty: true,
          parameterDestructuring: true,
          destructuring: true,
          letConst: true,
          dangerousForOf: true,
          spreadRest: true
        }
      })
    ]
  })
  await bundle.write({
    file: `${distPath}/${opt.name}.js`,
    format: 'umd',
    sourcemap: false,
    name: opt.name
  })

  await bundle.write({
    file: `${distPath}/${opt.name}.es.js`,
    format: 'es',
    sourcemap: false,
    name: opt.name
  })

  console.log(`--- ${opt.name} 编译成功  ---`)
  console.timeEnd(`---  ${opt.name} 编译  ---`)
}

module.exports = rollupBuild
