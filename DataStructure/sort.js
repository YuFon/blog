class ArrayList {
    constructor (arr = []) {
        this.list = arr;
        this.length = this.list.length;
    }

    swap(i, j) {
        let temp = this.list[i]
        this.list[i] = this.list[j]
        this.list[j] = temp
    }

    bubbleSort() {
        for (let i = 0; i < this.length - 1; i += 1) {
            for (let j = this.length - 1; j > i; j -= 1) {
                if (this.list[j] < this.list[j - 1]) {
                    this.swap(j, j - 1)
                }
            }
        }
        return this.list
    }

    selectionSort() {
        for (let i = 0; i < this.length; i += 1) {
            let temp = this.list[i]
            let index = i
            for (let j = i + 1; j < this.length; j += 1) {
                if (temp > this.list[j]) {
                    temp = this.list[j]
                    index = j
                }
            }
            this.list[index] = this.list[i]
            this.list[i] = temp
        }
        return this.list
    }

    insertionSort() {
        for (let i = 1; i < this.length; i += 1) {
            let temp = this.list[i]
            for (let j = i; j > 0; j -= 1) {
                if (temp < this.list[j - 1]) {
                    this.list[j] = this.list[j -1]
                } else {
                    this.list[j] = temp
                    break
                }
            }
        }
        return this.list
    }

    shellSort() {
        let gap = Math.floor(this.length / 2)
        while (gap >= 1)  {
            console.log(`gap=${gap}`)
            console.log(`before:${this.list}`)
            for (let i = 0; i < this.length - gap; i += 1) {
                let temp = this.list[i]
                let j = i
                while ((this.list[j] > this.list[j + gap]) && (j < this.length - gap)) {
                    this.list[j] = this.list[j + gap]
                    j += gap
                }
                this.list[j] = temp
            }
            gap = Math.floor(gap / 2)
        }
        return this.list
    }

    getMedium(left, right) {
        const center = Math.floor((right + left) / 2)
        if (this.list[left] > this.list[right]) {
            this.swap(left, right)
        }
        if (this.list[left] > this.list[center]) {
            this.swap(left, center)
        }
        if (this.list[center] > this.list[right]) {
            this.swap(center, right)
        }
        this.swap(center, right -1)
        return this.list[right -1]
    }
    sort(left, right) {
        console.log(left, right)
        if (left >= right) return
        
        const centerPoint = this.getMedium(left, right)
        console.log(`center = ${centerPoint}`)
        console.log(this.list)
        let i = left + 1
        let j = right - 2
        while(true) {

            // list[i] 小于centerPoint 则i往右找 直到list[i]大于centerPoint
            while(!!this.list[i] && this.list[i] < centerPoint) { i += 1 }
            // list[j] 大于centerPoint 则j往左找 直到list[j]小于centerPoiont
            while(!!this.list[j] && this.list[j] >= centerPoint) { j -= 1 }

            if (i < j) {
                this.swap(i, j)
                i += 1
                j -= 1
            } else {
                break
            }
        }
        if (i < right) this.swap(i, right - 1)
        console.log(this.list)
        console.log(`i=${i}, j=${j}`)
        this.sort(left, i - 1)
        this.sort(i + 1, right)
    }
    quickSort() {
        this.sort(0, this.length -1);
        return this.list
    }
}

const a = new ArrayList([10,1,3,5,4,9,6,8,7,5,6,5,10,9,15,100,12,13,17,4,5,6,9,4,109])
a.quickSort();
