var linkList = function() {
    this.head = null
    this.length = 0

    var Node = function(data) {
        this.data = data
        this.next = null
    }
    linkList.prototype.append = function (data) {
        var newNode = new Node(data)
        if (this.length === 0) {
            this.head = newNode
        } else{
            var current = this.head
        
            while(current.next) {
                current = current.next
            }
            current.next = newNode
        }
        this.length += 1
        console.log(linkList.prototype.toString.call(this))
    }
    linkList.prototype.toString = function() {
        var current = this.head;
        var result = '';
        while(current) {
            result += current.data + ' ';
            current = current.next
        }
        return result
    }
    linkList.prototype.insert = function(data, position) {
        if (position < 0 || position > this.length) return
        var current = this.head
        var newNode = new Node(data)
        if (position === 0) {
            this.head = newNode
            newNode.next = current
        } else {
            var index = 1
            current = this.head.next
            var preNode = this.head
            while (index < position) {
                preNode = current
                current = current.next
                index += 1
            }
            preNode.next = newNode
            newNode.next = current
        }
        this.length += 1
        console.log(linkList.prototype.toString.call(this))
    }
    linkList.prototype.get = function(position) {
        if (position <0 || position > this.length -1) return
        var index = 0
        var current = this.head
        while (index < position) {
            current = current.next
            index += 1
        }
        return current
    }
    linkList.prototype.indexOf = function(data) {
        var current = this.head
        var index = 0
        while (current) {
            if (current.data === data) {
                return index
            }
            current = current.next
            index += 1
        }
        return -1
    }
    linkList.prototype.update = function (data, position) {
        var node = linkList.prototype.get.call(this, position)
        console.log(node)
        if (node) {
            node.data = data
        }
        console.log(linkList.prototype.toString.call(this))
    }
    linkList.prototype.removeAt = function (position) {
        if (this.length < 1) return
        if (position < 0 || position > this.length -1) return
        if (position === 0) {
            this.head = this.head.next
        } else if (position === this.length -1) {
            linkList.prototype.get.call(this,position -1).next = null
        } else {
            var prev = this.head
            var current = this.head.next
            var index = 1
            while (index < position) {
                console.log(current)
                prev = current
                current = current.next
                index += 1
            }
            console.log(current)
            prev.next = current.next
        }
        this.length -= 1
        linkList.prototype.toString.call(this)
    }
    linkList.prototype.remove = function(data) {
        var current = this.head
        preNode = null
        while(current) {
            if (data === current.data) {
                if (preNode && preNode.next) {
                    preNode.next = current.next
                } else {
                    this.head = current.next
                }
                this.length -= 1
                break
            }
            preNode = current
            current = current.next
        }
    }
}

var doublyLinkedList = function() {
    this.head = null
    this.tail = null
    this.length = 0

    var Node = function (data) {
        this.data = data
        this.next = null
        this.prev = null
    }

    doublyLinkedList.prototype.append = function(data) {
        var newNode = new Node(data)
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length += 1
    }
    doublyLinkedList.prototype.forwardToString = function() {
        var current = this.head
        var result = ''
        while (current) {
            result += current.data + ' '
            current= current.next
        }
        return result
    }
    doublyLinkedList.prototype.backwardToString = function() {
        var current = this.tail
        var result = ''
        while (current) {
            result += current.data + ' '
            current = current.prev
        }
        return result
    }
    doublyLinkedList.prototype.insert = function(data, position) {
        if (position < 0 || position > this.length) return
        var newNode = new Node(data)
        if (this.length === 0) {
            doublyLinkedList.prototype.append.call(this, data)
            return
        } else if (position === 0) {
            newNode.next = this.head
            this.head.prev = newNode
            this.head = newNode
            this.length += 1
            return
        } else if (position === this.length) {
            doublyLinkedList.prototype.append.call(this, data)
            return
        } 
        if (position >= this.length/2) { // 从后往前查
            var current = this.tail
            var newPosition = this.length - position
            var index = 1
            while (index < newPosition) {
                current = current.prev
                index += 1
            }
        } else {
            var current = this.head.next
            var index = 1
            while (index < position) {
                current = current.next
                index += 1
            }
        }
        newNode.prev = current.prev
        newNode.next = current
        current.prev.next = newNode
        this.length += 1
    }
}
