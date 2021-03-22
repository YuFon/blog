const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

;[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
].forEach(function(method) {
    const originMethod = arrayProto[method]
    Object.defineProperty(arrayMethods, method, {
        value: function() {
            const args = Array.prototype.slice.call(arguments)
            const result = originMethod.apply(this, args)

            let inserted
            switch (method) {
                case 'push':
                case 'unshift':
                    inserted = args
                    break;
                case 'splice':
                    inserted = args.slice(2)
            }
            if (inserted) this.__ob__.observeArray(inserted)
            console.log('响应式数据：设置', inserted)
            return result
        }
    })
})