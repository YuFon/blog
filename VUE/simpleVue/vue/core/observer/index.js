import { arrayMethods } from './array'
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

 function protoAugment (target, src) {
    target.__proto__ = src
  }
  
  function copyAugment (target, src, keys) {
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      Object.defineProperty(target, key, {
        value: src[key],
        enumerable: !!enumerable,
        writable: true,
        configurable: true
      })
    }
  }

export function defineReactive (data, key, value) {
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            console.log('响应式数据：获取', value)
            return value
        },
        set(newVal) {
            console.log('响应式市局：设置', newVal)
            if (newVal === value) return;
            value = newVal
        }
    })
} 
export class Observe {
    constructor(value) {
        Object.defineProperty(value, '__ob__', {
            value: this
        })
        if (Array.isArray(value)) {
            const hasProto = '__proto__' in {}
            const augment = hasProto
                ? protoAugment  /*直接覆盖原型的方法来修改目标对象*/
                : copyAugment   /*定义（覆盖）目标对象或数组的某一个方法*/
            augment(value, arrayMethods, arrayKeys)
            this.observeArray(value)
        } else {
            this.walk(value)
        }
    }
    walk (data) {
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(data, keys[i], data[keys[i]])
        }
    }
    observeArray(data) {
        for (let i = 0, l = data.length; i < l; i += 1) {
            observe(data[i])
        }
    }
}

export function observe(value) {
    let ob
    if (Object.prototype.hasOwnProperty.call(value, '__ob__')) {
        ob = value.__ob__
    } else {
        if (Array.isArray(value) || Object.prototype.toString.call(value) === "[object Object]") {
            ob = new Observe(value)
        }
    }
    return ob
}