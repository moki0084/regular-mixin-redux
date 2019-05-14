/**
 * store
 * Created by huanju on 2019-05-13.
 */

import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import { mixin } from './mixin'

const storeMixin = {
  config (data) {
    data.unsubscribes = []
  },
  injectStore (store) {
    const state = store.getState()
    const name = store.name

    if (!name) {
      throw new Error('不存在 store.name 无法注入，需要在 store 添加 name')
    }

    this.data[name] = state

    const unsubscribe = store.subscribe(() => {
      const name = store.name
      this.data[name] = store.getState()
      const fnName = 'subscribe' + name.slice(0, 1).toUpperCase() + name.slice(1)
      if (this[fnName] && isFunction(this[fnName])) {
        this[fnName]() // 用户操作自行 update
      } else {
        this.$update()
      }
    })

    this.data.unsubscribes.push(unsubscribe)
  },

  destroy () {
    try {
      const { unsubscribes } = this.data
      for (let i of unsubscribes) {
        i()
      }
    } catch (e) { // eslint-disable-line
    }
  }
}

/**
 * createConnectMixin
 * auto inject
 * @param stores
 * @returns {{config(): void}}
 */
function createConnectMixin (stores) {
  return {
    config () {
      for (let i of stores) {
        this.injectStore(i)
      }
    }
  }
}

/**
 * connect redux stores
 * @param component {Object}
 * @param stores {Object}
 * @return component {Object}
 */
export function connect (component, stores) {
  const s = isArray(stores) ? stores : [stores]
  const connectMixin = createConnectMixin(s)
  return mixin(component, [storeMixin, connectMixin])
}

export { mixin }
