import Vue from 'vue'

const vm = new Vue({
    el: '#app',
    data() {
        return {
            title: '学生列表',
            teacher: ['张三', '李四'],
            students: [
                {
                    id: '1',
                    name: 'xiaoming'
                },
                {
                    id: '2',
                    name: 'xiaohong'
                }
            ],
            info: {
                a: {
                    b: 2
                }
            }
        }
    }
})
vm.info.a = {c:3}
console.log(vm.info.a)