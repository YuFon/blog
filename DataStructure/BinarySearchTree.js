class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    // 插入的递归方法
    // _insert(root, newNode) {
    //     if (newNode.key > root.key) { // 比根节点大 如果根节点右边没值，则直接赋值，否则递归查找
    //         if (root.right === null) {
    //             root.right = newNode
    //         } else {
    //             this._insert(root.right, newNode)
    //         }
    //     } else {
    //         if (root.left === null) {
    //             root.left = newNode
    //         } else {
    //             this._insert(root.left, newNode)
    //         }
    //     }
    // }

    insert(key) {
        const newNode = new Node(key)
        if (this.root === null) {
            this.root = newNode
        } else {
            let currentNode = this.root
            while(currentNode !== null) {
                if (newNode.key > currentNode.key) {
                    if (currentNode.right === null) {
                        currentNode.right = newNode
                        break
                    } else {
                        currentNode = currentNode.right
                    }
                } else {
                    if (currentNode.left === null) {
                        currentNode.left = newNode
                        break
                    } else {
                        currentNode = currentNode.left
                    }
                }
            }

        }
    }

    // 先序遍历  根->左->右
    preorderTraversal() {
        const result = []
        this._preorder(this.root, result)
        return result
    }
    // 使用递归法来做
    _preorder(root, result) {
        if (root === null) return
        result.push(root.key)
        this._preorder(root.left, result);
        this._preorder(root.right, result);
    }

    // 中序遍历 左->根->右
    inorderTraversal() {
        const result = [];
        this._inorder(this.root, result);
        return result;
    }
    _inorder(root, result) {
        if (root === null) return
        this._inorder(root.left, result); // 递归到最左再插入
        result.push(root.key)
        this._inorder(root.right, result);
    }
    
    // 后续遍历，左->右->根
    postorderTraversal() {
        const reuslt = [];
        this._postorder(this.root, result);
    }
    _postorder(root, result) {
        if (root === null) return
        this._postorder(root.left, result)
        this._postorder(root.right, result)
        result.push(root.key)
    }

    min() {
        if (this.root === null) return null
        let current = this.root
        while(this.root.left !== null) {
            current = this.root.left
        }
        return current.key
    }
    
    max() {
        if (this.root === null) return null
        let current = this.root
        while(this.root.right !== null) {
            current = this.root.right
        }
        return current.key
    }

    hasKey(key) {
        if (this.root === null) return null
        let current = this.root
        while(current !== null) {
            if (current.key === key) return true
            if (current.key < key) {
                current = current.right
            } else {
                current = current.left
            }
        }
        return false
    }

    remove(key) {
        if (this.root === null) return false
        let current = this.root
        let parent = null
        let isleft = true
        while(current.key !== key) {
            if (current === null) return false
            if (current.key < key) {
                parent = current
                current = current.right
                isleft= false
            } else {
                parent = current
                current = current.left
                isleft = true
            }
        }
        // 1.是叶子结点
        if (current.left === null && current.right === null) {
            // 1.1是根节点
            if (this.root === current) {
                this.root = null
            } else { // 1.2不是根节点
                parent[isleft? 'left': 'right'] = null
            }
        } else if (current.right === null) { // 2.被删元素只有左子节点
            if (this.root === current) {
                this.root = current.left
            } else {
                parent[isleft? 'left': 'right'] = current.left
            }
        } else if (current.left === null) {
            if (this.root === current) {
                this.root = current.right
            } else {
                parent[isleft? 'left': 'right'] = current.right
            }
        } else { // 4. 左右节点都有 这时候要找这个节点的前驱或者后继（左子树中最大值或者右子树中最小值）来做新的节点
            // 先找新节点，这里我们就找前驱
            let nextNode = current.left
            while (nextNode !== null) {
                nextNode = nextNode.right // 左子树的最大值，朝右边找
            }
            // 
            nextNode.right = current.right
        }
    }
}

const tree = new BinarySearchTree()
tree.insert(7)
tree.insert(8)
tree.insert(6)
tree.insert(4)
tree.insert(5)
tree.insert(3)
tree.insert(10)
tree.insert(59)
