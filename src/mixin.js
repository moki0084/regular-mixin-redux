/**
 * mixin
 * Created by huanju on 2019-05-13.
 */
import assign from 'lodash/assign'
import assignWith from 'lodash/assignWith'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'

/**
 * extend Object
 * @param source {Object}
 * @param target {Object}
 */
export function extend (target, source) {
  return assignWith(target, source, function (t, s, name) {
    if (isFunction(t) && isFunction(s)) {
      return function (...args) {
        if (name === 'destroy') {
          try {
            if (this.supr && typeof this.supr === 'function') {
              this.supr() // 假如不执行， s t 无 supr 方法
            }
          } catch (e) { // eslint-disable-line
          }
        }
        t.call(this, ...args)
        s.call(this, ...args)
      }
    } else if (isObject(t) && isObject(s) && name === 'data') {
      return assign(t, s)
    } else {
      return undefined
    }
  })
}

/**
 * mixin Object
 * @param component {Object}
 * @param mixins {Array}
 * @return component {Object}
 */
export function mixin (component, mixins) {
  const ms = isArray(mixins) ? mixins : [mixins]
  let r = {}
  for (let i of ms) {
    r = extend(r, i)
  }
  return extend(r, component)
}
