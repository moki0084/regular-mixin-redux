# regular-mixin-redux

通过 mixin 方式把 redux 常用方法注入到 regular 组件

### 安装
```shell
    yarn add regular-mixin-redux
```

### 方法
#### connect（component, stores）
假设 store.name = 'todo'，把 state 注入到 regular 组件 data.todo，
默认监听数据自动 update。当手动监听 store 数据的变化时候，则需要手动 update。
监听方法为 subscribeTodo。

##### 参数

|参数|类型|描述|
|----|----|----|
|component|Object|Regular extend 之前的组件对象|
|stores|Array|redux stores 数组|

##### 注入组件

|属性|描述|
|----|----|
|data.unsubscribes|回收 redux 监听数组|
|data[store.name]| store State 数据 |
|injectStore|注入 Store 方法|

##### 监听函数

默认监听数据自动执行 update, 当组件存在 subscribe 函数，则需要手动 update。

|属性|描述|
|----|----|
|subscribe[store.name] (newState, oldState)|监听 State 数据函数（store.name 首字母会被转成大写）|

##### 返回 

|类型|描述|
|----|----|
|Object|Regular extend 之前的组件对象|

#### mixin（component, mixins）

##### 参数

|参数|类型|描述|
|----|----|----|
|component|Object|Regular extend 之前的组件对象|
|mixins|Array|redux stores 数组|

##### 返回 

|类型|描述|
|----|----|
|Object|Regular extend 之前的组件对象|

### 例子
参考代码，具体请查看 todolist

https://github.com/moki0084/regular-redux-todolist

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
