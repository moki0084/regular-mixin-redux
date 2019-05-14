# regular-mixin-redux

通过 mixin 方式把 redux 常用方法注入到 regular 组件

### 安装
```shell
    yarn add regular-mixin-redux
```

### 方法
#### connect（component, stores）
假设 store.name = 'todo'，把 state 注入到 regular 组件 data.todo，
默认监听数据自动执行 update，也可以手动监听 store 数据的变化，监听方法为 subscribeTodo，
假如当前组件存在 subscribeTodo 则不会自动执行 update

|参数|类型|描述|
|----|----|----|
|component|Object|Regular extend 之前的组件对象|
|stores|Array|redux stores 数组|

返回 component


#### mixin（component, mixins）

|参数|类型|描述|
|----|----|----|
|component|Object|Regular extend 之前的组件对象|
|mixins|Array|redux stores 数组|

返回 component

### 例子
参考代码，具体请查看 todolist
#### redux
todo store
```js
import { createStore } from 'redux'

const reducer = (state = {}, actions) => {
  let res = state
  switch (actions.type){
    case 'ADD':{
      res = {
        ...state,
      }
      res.list.push(actions.data)
      break
    }
    default: {
      break
    }
  }
  return res
}

let store = createStore(reducer,{ list: [] })

store.name = 'todo'

export default store
```

#### Regular 组件
```js
import todo from '../../store'

const component = {
    init () {
    },
    // 监听 todo store 数据更新 的方法
    // 当存在 subscribeTodo 方法则不自动 update
    subscribeTodo () { 
      this.$update()
    },
    handleAdd () {
      todo.dispatch({
        type: 'ADD',
        data: 'hello'
      })
    }
}

// connect 
//  this.data.todo 注入 todo state 
export default Regular.extend(connect(component, [todo]))
```
