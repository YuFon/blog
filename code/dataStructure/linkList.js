var linkList = function() {
    this.head = null
    this.length = 0

    var Node = function(data) {
        this.data = data
        this.next = null
    }
    linkList.prototype.append = function (data) {
        if (this.length === 0) {
            this.head = new Node(data)
            return
        }
        var current = this.head
        
        while(current.next) {
            current = current.next
        }
        current.next = new Node(data)
        this.length += 1;
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
}