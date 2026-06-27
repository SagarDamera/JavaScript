class LinkNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class SingleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    isEmpty() {
        return this.length == 0;
    }
    size() {
        return this.length;
    }

    getHead() {
        return this.head;
    }
    getTail() {
        return this.tail;
    }

    peekHead() {
        return this.head ? this.head.value : null
    }
    peekTail() {
        return this.tail ? this.tail.value : null
    }
}
const list = new SingleLinkedList();
console.log("Is Empty", list.isEmpty())
console.log("Size", list.size())

console.log("Head", list.getHead())
console.log("Tail", list.getTail())

console.log("Head Value", list.peekHead())
console.log("Tail Value", list.peekTail())
