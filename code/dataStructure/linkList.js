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
    }
}
