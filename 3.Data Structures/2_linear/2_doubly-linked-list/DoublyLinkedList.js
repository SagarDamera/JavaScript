/**
 * Doubly Linked List
 * ------------------------------------------------------------
 * Interview-ready, clean, maintainable implementation
 * with strong naming, edge-case handling, and readable methods.
 */

class DoublyListNode {
    /**
     * @param {*} value
     * @param {DoublyListNode|null} next
     * @param {DoublyListNode|null} prev
     */
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * ---------------------------
     * Node creation
     * ---------------------------
     */
    createNode(value) {
        return new DoublyListNode(value);
    }

    /**
     * ---------------------------
     * Basic state helpers
     * ---------------------------
     */
    isEmpty() {
        return this.length === 0;
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
        return this.head ? this.head.value : null;
    }

    peekTail() {
        return this.tail ? this.tail.value : null;
    }

    /**
     * ---------------------------
     * Internal validation helpers
     * ---------------------------
     */
    _validateIndex(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.length) {
            throw new RangeError(`Invalid index: ${index}`);
        }
    }

    _validateInsertIndex(index) {
        if (!Number.isInteger(index) || index < 0 || index > this.length) {
            throw new RangeError(`Invalid insert index: ${index}`);
        }
    }

    _getNodeAt(index) {
        this._validateIndex(index);

        if (index < this.length / 2) {
            let current = this.head;
            let currentIndex = 0;

            while (currentIndex < index) {
                current = current.next;
                currentIndex++;
            }

            return current;
        }

        let current = this.tail;
        let currentIndex = this.length - 1;

        while (currentIndex > index) {
            current = current.prev;
            currentIndex--;
        }

        return current;
    }

    /**
     * ---------------------------
     * Insertion operations
     * ---------------------------
     */
    prepend(value) {
        const newNode = this.createNode(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.length++;
        return this;
    }

    append(value) {
        const newNode = this.createNode(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    insertAt(index, value) {
        this._validateInsertIndex(index);

        if (index === 0) {
            return this.prepend(value);
        }

        if (index === this.length) {
            return this.append(value);
        }

        const nextNode = this._getNodeAt(index);
        const previousNode = nextNode.prev;
        const newNode = this.createNode(value);

        newNode.prev = previousNode;
        newNode.next = nextNode;
        previousNode.next = newNode;
        nextNode.prev = newNode;

        this.length++;
        return this;
    }

    insertAfter(targetValue, value) {
        let current = this.head;

        while (current !== null) {
            if (current.value === targetValue) {
                if (current === this.tail) {
                    this.append(value);
                    return true;
                }

                const newNode = this.createNode(value);
                const nextNode = current.next;

                newNode.prev = current;
                newNode.next = nextNode;
                current.next = newNode;
                nextNode.prev = newNode;

                this.length++;
                return true;
            }

            current = current.next;
        }

        return false;
    }

    insertBefore(targetValue, value) {
        let current = this.head;

        while (current !== null) {
            if (current.value === targetValue) {
                if (current === this.head) {
                    this.prepend(value);
                    return true;
                }

                const newNode = this.createNode(value);
                const previousNode = current.prev;

                newNode.prev = previousNode;
                newNode.next = current;
                previousNode.next = newNode;
                current.prev = newNode;

                this.length++;
                return true;
            }

            current = current.next;
        }

        return false;
    }

    /**
     * ---------------------------
     * Deletion operations
     * ---------------------------
     */
    deleteHead() {
        if (this.isEmpty()) {
            return null;
        }

        const removedNode = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = removedNode.next;
            this.head.prev = null;
            removedNode.next = null;
        }

        this.length--;
        return removedNode;
    }

    deleteTail() {
        if (this.isEmpty()) {
            return null;
        }

        const removedNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = removedNode.prev;
            this.tail.next = null;
            removedNode.prev = null;
        }

        this.length--;
        return removedNode;
    }

    deleteAt(index) {
        this._validateIndex(index);

        if (index === 0) {
            return this.deleteHead();
        }

        if (index === this.length - 1) {
            return this.deleteTail();
        }

        const removedNode = this._getNodeAt(index);
        const previousNode = removedNode.prev;
        const nextNode = removedNode.next;

        previousNode.next = nextNode;
        nextNode.prev = previousNode;
        removedNode.next = null;
        removedNode.prev = null;

        this.length--;
        return removedNode;
    }

    deleteByValue(value) {
        let current = this.head;

        while (current !== null) {
            if (current.value === value) {
                if (current === this.head) {
                    return this.deleteHead();
                }

                if (current === this.tail) {
                    return this.deleteTail();
                }

                const previousNode = current.prev;
                const nextNode = current.next;

                previousNode.next = nextNode;
                nextNode.prev = previousNode;
                current.next = null;
                current.prev = null;

                this.length--;
                return current;
            }

            current = current.next;
        }

        return null;
    }

    deleteAllByValue(value) {
        let deletedCount = 0;
        let current = this.head;

        while (current !== null) {
            const nextNode = current.next;

            if (current.value === value) {
                if (current === this.head) {
                    this.deleteHead();
                } else if (current === this.tail) {
                    this.deleteTail();
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    current.next = null;
                    current.prev = null;
                    this.length--;
                }

                deletedCount++;
            }

            current = nextNode;
        }

        return deletedCount;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
        return this;
    }

    /**
     * ---------------------------
     * Access / search operations
     * ---------------------------
     */
    getAt(index) {
        return this._getNodeAt(index);
    }

    find(value) {
        let current = this.head;

        while (current !== null) {
            if (current.value === value) {
                return current;
            }

            current = current.next;
        }

        return null;
    }

    contains(value) {
        return this.find(value) !== null;
    }

    /**
     * ---------------------------
     * Update operations
     * ---------------------------
     */
    setAt(index, newValue) {
        const node = this._getNodeAt(index);
        node.value = newValue;
        return node;
    }

    updateByValue(oldValue, newValue) {
        const node = this.find(oldValue);

        if (!node) {
            return false;
        }

        node.value = newValue;
        return true;
    }

    /**
     * ---------------------------
     * Traversal / conversion
     * ---------------------------
     */
    traverse(callback) {
        if (typeof callback !== "function") {
            throw new TypeError("Callback must be a function");
        }

        let current = this.head;
        let index = 0;

        while (current !== null) {
            callback(current, index);
            current = current.next;
            index++;
        }
    }

    traverseReverse(callback) {
        if (typeof callback !== "function") {
            throw new TypeError("Callback must be a function");
        }

        let current = this.tail;
        let index = this.length - 1;

        while (current !== null) {
            callback(current, index);
            current = current.prev;
            index--;
        }
    }

    toArray() {
        const values = [];
        this.traverse((node) => values.push(node.value));
        return values;
    }

    toReverseArray() {
        const values = [];
        this.traverseReverse((node) => values.push(node.value));
        return values;
    }

    static fromArray(values) {
        const list = new DoublyLinkedList();

        for (const value of values) {
            list.append(value);
        }

        return list;
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        return this.toArray().join(" <-> ");
    }

    clone() {
        return DoublyLinkedList.fromArray(this.toArray());
    }

    /**
     * ---------------------------
     * Reverse operations
     * ---------------------------
     */
    reverse() {
        if (this.length <= 1) {
            return this;
        }

        let current = this.head;

        while (current !== null) {
            const nextNode = current.next;
            current.next = current.prev;
            current.prev = nextNode;
            current = nextNode;
        }

        const oldHead = this.head;
        this.head = this.tail;
        this.tail = oldHead;

        return this;
    }

    reverseRecursive() {
        if (this.length <= 1) {
            return this;
        }

        const swapPointers = (node) => {
            if (node === null) {
                return null;
            }

            const nextNode = node.next;
            node.next = node.prev;
            node.prev = nextNode;

            if (nextNode === null) {
                return node;
            }

            return swapPointers(nextNode);
        };

        const oldHead = this.head;
        this.head = swapPointers(this.head);
        this.tail = oldHead;

        return this;
    }

    /**
     * ---------------------------
     * Interview-focused operations
     * ---------------------------
     */
    middleNode() {
        if (this.isEmpty()) {
            return null;
        }

        let slow = this.head;
        let fast = this.head;

        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }

    nthFromEnd(n) {
        if (!Number.isInteger(n) || n <= 0 || n > this.length) {
            throw new RangeError(`Invalid n: ${n}`);
        }

        return this._getNodeAt(this.length - n);
    }

    removeNthFromEnd(n) {
        const node = this.nthFromEnd(n);
        return this.deleteAt(this.indexOfNode(node));
    }

    hasCycle() {
        let slow = this.head;
        let fast = this.head;

        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow === fast) {
                return true;
            }
        }

        return false;
    }

    findCycleStart() {
        let slow = this.head;
        let fast = this.head;

        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow === fast) {
                let pointer1 = this.head;
                let pointer2 = slow;

                while (pointer1 !== pointer2) {
                    pointer1 = pointer1.next;
                    pointer2 = pointer2.next;
                }

                return pointer1;
            }
        }

        return null;
    }

    removeCycle() {
        const cycleStart = this.findCycleStart();

        if (!cycleStart) {
            return false;
        }

        let current = cycleStart;

        while (current.next !== cycleStart) {
            current = current.next;
        }

        current.next = null;
        this.tail = current;

        return true;
    }

    removeDuplicates() {
        const seen = new Set();
        let current = this.head;

        while (current !== null) {
            const nextNode = current.next;

            if (seen.has(current.value)) {
                if (current === this.head) {
                    this.deleteHead();
                } else if (current === this.tail) {
                    this.deleteTail();
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    current.next = null;
                    current.prev = null;
                    this.length--;
                }
            } else {
                seen.add(current.value);
            }

            current = nextNode;
        }

        return this;
    }

    isPalindrome() {
        let left = this.head;
        let right = this.tail;

        while (left !== null && right !== null && left !== right && left.prev !== right) {
            if (left.value !== right.value) {
                return false;
            }

            left = left.next;
            right = right.prev;
        }

        return true;
    }

    partition(x) {
        const less = new DoublyLinkedList();
        const greaterOrEqual = new DoublyLinkedList();

        let current = this.head;

        while (current !== null) {
            if (current.value < x) {
                less.append(current.value);
            } else {
                greaterOrEqual.append(current.value);
            }

            current = current.next;
        }

        this.clear();

        less.traverse((node) => this.append(node.value));
        greaterOrEqual.traverse((node) => this.append(node.value));

        return this;
    }

    rotateRight(k) {
        if (this.length <= 1 || k === 0) {
            return this;
        }

        const rotations = k % this.length;

        if (rotations === 0) {
            return this;
        }

        const newTailIndex = this.length - rotations - 1;
        const newTail = this._getNodeAt(newTailIndex);
        const newHead = newTail.next;

        this.tail.next = this.head;
        this.head.prev = this.tail;

        newTail.next = null;
        newHead.prev = null;

        this.head = newHead;
        this.tail = newTail;

        return this;
    }

    swapPairs() {
        if (this.length <= 1) {
            return this;
        }

        const values = this.toArray();

        for (let i = 0; i < values.length - 1; i += 2) {
            [values[i], values[i + 1]] = [values[i + 1], values[i]];
        }

        this.clear();

        for (const value of values) {
            this.append(value);
        }

        return this;
    }

    reverseKGroup(k) {
        if (!Number.isInteger(k) || k <= 1 || this.length <= 1) {
            return this;
        }

        const values = this.toArray();

        for (let start = 0; start + k <= values.length; start += k) {
            let left = start;
            let right = start + k - 1;

            while (left < right) {
                [values[left], values[right]] = [values[right], values[left]];
                left++;
                right--;
            }
        }

        this.clear();

        for (const value of values) {
            this.append(value);
        }

        return this;
    }

    sort(compareFn = (a, b) => a - b) {
        const values = this.toArray().sort(compareFn);
        this.clear();

        for (const value of values) {
            this.append(value);
        }

        return this;
    }

    indexOfNode(targetNode) {
        let current = this.head;
        let index = 0;

        while (current !== null) {
            if (current === targetNode) {
                return index;
            }

            current = current.next;
            index++;
        }

        return -1;
    }

    static mergeTwoSortedLists(list1, list2) {
        const mergedList = new DoublyLinkedList();
        let pointer1 = list1.head;
        let pointer2 = list2.head;

        while (pointer1 !== null && pointer2 !== null) {
            if (pointer1.value <= pointer2.value) {
                mergedList.append(pointer1.value);
                pointer1 = pointer1.next;
            } else {
                mergedList.append(pointer2.value);
                pointer2 = pointer2.next;
            }
        }

        while (pointer1 !== null) {
            mergedList.append(pointer1.value);
            pointer1 = pointer1.next;
        }

        while (pointer2 !== null) {
            mergedList.append(pointer2.value);
            pointer2 = pointer2.next;
        }

        return mergedList;
    }

    static intersectionNode(list1, list2) {
        const visited = new Set();
        let current = list1.head;

        while (current !== null) {
            visited.add(current);
            current = current.next;
        }

        current = list2.head;

        while (current !== null) {
            if (visited.has(current)) {
                return current;
            }

            current = current.next;
        }

        return null;
    }
}

/*
============================================================
DOUBLY LINKED LIST — OPERATIONS (MEMORIZATION GUIDE)
============================================================

1. CREATION / INITIALIZATION
------------------------------------------------------------

constructor()
Steps:
1. Initialize head = null
2. Initialize tail = null
3. Initialize length = 0

createNode(value)
Steps:
1. Create new node
2. node.value = value
3. node.next = null
4. node.prev = null
5. Return node


2. INSERTION OPERATIONS
------------------------------------------------------------

prepend(value)  // insert at beginning
Steps:
1. Create new node
2. If list is empty:
   - head = node
   - tail = node
3. Else:
   - node.next = head
   - head.prev = node
   - head = node
4. length++

append(value)  // insert at end
Steps:
1. Create new node
2. If list is empty:
   - head = node
   - tail = node
3. Else:
   - node.prev = tail
   - tail.next = node
   - tail = node
4. length++

insertAt(index, value)
Steps:
1. Validate index
2. If index == 0 → prepend
3. If index == length → append
4. Find node at index
5. previous = nextNode.prev
6. Create new node
7. newNode.prev = previous
8. newNode.next = nextNode
9. previous.next = newNode
10. nextNode.prev = newNode
11. length++

insertAfter(targetValue, value)
Steps:
1. Traverse list
2. Find target node
3. If target is tail → append
4. Else:
   - create new node
   - connect new node between current and current.next
5. Update prev and next links
6. length++
7. Return true/false

insertBefore(targetValue, value)
Steps:
1. Traverse list
2. Find target node
3. If target is head → prepend
4. Else:
   - create new node
   - connect new node between current.prev and current
5. Update prev and next links
6. length++
7. Return true/false


3. DELETION OPERATIONS
------------------------------------------------------------

deleteHead()
Steps:
1. If empty → return null
2. Store head in temp
3. If only one node:
   - head = null
   - tail = null
4. Else:
   - head = head.next
   - head.prev = null
5. Disconnect temp
6. length--
7. Return temp

deleteTail()
Steps:
1. If empty → return null
2. Store tail in temp
3. If only one node:
   - head = null
   - tail = null
4. Else:
   - tail = tail.prev
   - tail.next = null
5. Disconnect temp
6. length--
7. Return temp

deleteAt(index)
Steps:
1. Validate index
2. If index == 0 → deleteHead
3. If index == last index → deleteTail
4. Find node at index
5. previous.next = next
6. next.prev = previous
7. Disconnect removed node
8. length--
9. Return removed node

deleteByValue(value)
Steps:
1. Traverse list
2. Find first matching node
3. If head → deleteHead
4. If tail → deleteTail
5. Else:
   - previous.next = next
   - next.prev = previous
6. Disconnect node
7. length--
8. Return node

deleteAllByValue(value)
Steps:
1. Traverse list
2. Store next first
3. If current matches:
   - remove current safely
   - update links
   - length--
4. Continue traversal
5. Return deleted count

clear()
Steps:
1. head = null
2. tail = null
3. length = 0


4. ACCESS / READ OPERATIONS
------------------------------------------------------------

getHead()
Steps:
1. Return head

getTail()
Steps:
1. Return tail

getAt(index)
Steps:
1. Validate index
2. If index in first half → traverse from head
3. Else traverse from tail
4. Return node

find(value)
Steps:
1. Traverse list
2. If match found → return node
3. Else return null

contains(value)
Steps:
1. Use find()
2. Return true/false

size()
Steps:
1. Return length

isEmpty()
Steps:
1. Return length === 0


5. UPDATE OPERATIONS
------------------------------------------------------------

setAt(index, newValue)
Steps:
1. Get node at index
2. Update node.value
3. Return node

updateByValue(oldValue, newValue)
Steps:
1. Find node by oldValue
2. If found → update value
3. Return true/false


6. TRAVERSAL OPERATIONS
------------------------------------------------------------

traverse(callback)
Steps:
1. Start from head
2. Move using next
3. Call callback(node, index)

traverseReverse(callback)
Steps:
1. Start from tail
2. Move using prev
3. Call callback(node, index)

print()
Steps:
1. Convert list to string
2. Print values

toArray()
Steps:
1. Traverse forward
2. Push values to array
3. Return array

toReverseArray()
Steps:
1. Traverse backward
2. Push values to array
3. Return array

fromArray(array)
Steps:
1. Create new list
2. Loop through array
3. Append each value
4. Return list


7. REVERSE OPERATIONS
------------------------------------------------------------

reverse()
Steps:
1. Traverse each node
2. Swap node.next and node.prev
3. Move using original next
4. Swap head and tail

reverseRecursive()
Steps:
1. Recursively visit node
2. Swap next and prev at each node
3. Base case: last node becomes new head
4. Swap head and tail


8. UTILITY OPERATIONS
------------------------------------------------------------

peekHead()
Steps:
1. Return head.value or null

peekTail()
Steps:
1. Return tail.value or null

clone()
Steps:
1. Convert to array
2. Build new list from array

toString()
Steps:
1. Convert to array
2. Join with " <-> "


9. INTERVIEW-FOCUSED OPERATIONS
------------------------------------------------------------

middleNode()
Steps:
1. slow = head, fast = head
2. Move slow by 1, fast by 2
3. When fast ends → slow is middle

nthFromEnd(n)
Steps:
1. Validate n
2. Convert to index = length - n
3. Return node at that index

removeNthFromEnd(n)
Steps:
1. Find nth node from end
2. Get its index
3. Delete node at that index

hasCycle()
Steps:
1. slow = head, fast = head
2. Move slow by 1, fast by 2
3. If they meet → cycle exists

findCycleStart()
Steps:
1. Detect cycle
2. Move one pointer to head
3. Move both one step at a time
4. Meeting point = cycle start

removeCycle()
Steps:
1. Find cycle start
2. Traverse cycle to last node
3. Set last.next = null
4. Update tail

mergeTwoSortedLists(list1, list2)
Steps:
1. Create new result list
2. Compare both current nodes
3. Append smaller value
4. Move pointer
5. Append remaining nodes

sort()
Steps:
1. Convert to array
2. Sort array
3. Clear list
4. Rebuild list

isPalindrome()
Steps:
1. Use left from head and right from tail
2. Compare values
3. Move inward
4. If all match → palindrome

partition(x)
Steps:
1. Create less list
2. Create greater/equal list
3. Traverse nodes
4. Place each value into correct list
5. Rebuild original list

removeDuplicates()
Steps:
1. Use Set
2. Traverse list
3. If value already seen → delete node
4. Else add to Set

intersectionNode(list1, list2)
Steps:
1. Store nodes of first list in Set
2. Traverse second list
3. First repeated node = intersection

rotateRight(k)
Steps:
1. Find effective rotations using k % length
2. Make list circular
3. Find new tail
4. Break circle
5. Update head and tail

swapPairs()
Steps:
1. Convert to array or swap links
2. Swap each adjacent pair
3. Rebuild or relink list

reverseKGroup(k)
Steps:
1. Count k nodes
2. Reverse each complete group of k
3. Keep leftover nodes unchanged

============================================================
END OF MEMORIZATION GUIDE
============================================================
*/

// Example usage
const dll = new DoublyLinkedList();
dll.append(10).append(20).append(30);
dll.prepend(5);
dll.insertAt(2, 15);

console.log(dll.toString()); // 5 <-> 10 <-> 15 <-> 20 <-> 30
console.log(dll.peekHead()); // 5
console.log(dll.peekTail()); // 30
console.log(dll.middleNode()?.value); // 15

dll.reverse();
console.log(dll.toString()); // 30 <-> 20 <-> 15 <-> 10 <-> 5