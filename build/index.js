/**
 * index
 * Created by huanju on 2019-05-14.
 */

const rollupBuild = require('./rollupBuild')
const { entry, entryName } = require('./configs')

rollupBuild({
  path: entry,
  name: entryName
}).catch((e)=>{
  console.error(e)
})
