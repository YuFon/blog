
class Queuelist {
    constructor(maxLength = 5) {
        this.length = 0;
        this.waittingQueue = []; // 等待队列
        this.maxLength = maxLength;
    }

    push(fn) {
        if (typeof fn !== 'function') {
            return Promise.reject('fail to push');
        }
        this.length += 1;
        return new Promise((resolve) => {
            console.log(this.length);
            if (this.length > this.maxLength) {
                this.waittingQueue.push(resolve);
            } else {
                console.log('没排队');
                resolve();
            }
        }).then(() => this.handleFn(fn));
    }

    handleFn(fn) {
        return fn().then((res) => {
            this.length -= 1;
            if (this.waittingQueue.length) {
                this.waittingQueue[0](); // 将最先进入阻塞队列的 Promise 从 Pending 变为 Fulfilled
                this.waittingQueue.shift();
            }
            return Promise.resolve(res);
        }).catch((res) => {
            this.length -= 1;
            if (this.waittingQueue.length) {
                this.waittingQueue[0](); // 将最先进入阻塞队列的 Promise 从 Pending 变为 Fulfilled
                this.waittingQueue.shift();
            }
            return Promise.resolve(res);
        });
    }
}

const test = i => () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            reject(new Error(`fail${i}`));
        }

        resolve(`hello world${i}`);
    }, 3000);
});

// const test = () => new Promise((resolve) => {
//     setTimeout(() => { resolve(); }, 1000);
// });

const list = new Queuelist();

for (let i = 0; i < 10; i += 1) {
    list.push(test(i)).then(res => console.log(res));
}
