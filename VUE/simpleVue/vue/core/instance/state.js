import { observe } from '../observer/index'
function noop () {}
const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}
export function proxy(target, sourcekey, key) {
    sharedPropertyDefinition.get = function() {
        return target[sourcekey][key]
    },
    sharedPropertyDefinition.set = function(val) {
        return target[sourcekey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initState(vm) {
    const options = vm.$options

    if (options.data) {
        initData(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    data = vm._data = typeof data === 'function' ? data.call(vm): data || {}
    const keys = Object.keys(data)
    let i = keys.length
    while (i --) {
        proxy(vm, '_data', keys[i])
    }
    observe(data)
}