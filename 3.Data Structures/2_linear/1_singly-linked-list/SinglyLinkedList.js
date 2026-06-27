/**
 * Singly Linked List
 * ----------------------------------------
 * Interview-ready, clean, maintainable implementation
 * with strong naming, edge-case handling, and readable methods.
 */

class ListNode {
    /**
     * @param {*} value
     * @param {ListNode|null} next
     */
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
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

        let current = this.head;
        let currentIndex = 0;

        while (currentIndex < index) {
            current = current.next;
            currentIndex++;
        }

        return current;
    }

    /**
     * ---------------------------
     * Insertion operations
     * ---------------------------
     */

    prepend(value) {
        const newNode = new ListNode(value, this.head);
        this.head = newNode;

        if (this.tail === null) {
            this.tail = newNode;
        }

        this.length++;
        return this;
    }

    append(value) {
        const newNode = new ListNode(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
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

        const previousNode = this._getNodeAt(index - 1);
        const newNode = new ListNode(value, previousNode.next);

        previousNode.next = newNode;
        this.length++;

        return this;
    }

    insertAfter(targetValue, value) {
        let current = this.head;

        while (current !== null) {
            if (current.value === targetValue) {
                const newNode = new ListNode(value, current.next);
                current.next = newNode;

                if (this.tail === current) {
                    this.tail = newNode;
                }

                this.length++;
                return true;
            }
            current = current.next;
        }

        return false;
    }

    insertBefore(targetValue, value) {
        if (this.isEmpty()) {
            return false;
        }

        if (this.head.value === targetValue) {
            this.prepend(value);
            return true;
        }

        let previous = null;
        let current = this.head;

        while (current !== null) {
            if (current.value === targetValue) {
                const newNode = new ListNode(value, current);
                previous.next = newNode;
                this.length++;
                return true;
            }

            previous = current;
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
        this.head = this.head.next;
        this.length--;

        if (this.head === null) {
            this.tail = null;
        }

        removedNode.next = null;
        return removedNode;
    }

    deleteTail() {
        if (this.isEmpty()) {
            return null;
        }

        if (this.length === 1) {
            const removedNode = this.head;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return removedNode;
        }

        let current = this.head;

        while (current.next !== this.tail) {
            current = current.next;
        }

        const removedNode = this.tail;
        current.next = null;
        this.tail = current;
        this.length--;

        return removedNode;
    }

    deleteAt(index) {
        this._validateIndex(index);

        if (index === 0) {
            return this.deleteHead();
        }

        const previousNode = this._getNodeAt(index - 1);
        const removedNode = previousNode.next;

        previousNode.next = removedNode.next;

        if (removedNode === this.tail) {
            this.tail = previousNode;
        }

        removedNode.next = null;
        this.length--;

        return removedNode;
    }

    deleteByValue(value) {
        if (this.isEmpty()) {
            return null;
        }

        if (this.head.value === value) {
            return this.deleteHead();
        }

        let previous = this.head;
        let current = this.head.next;

        while (current !== null) {
            if (current.value === value) {
                previous.next = current.next;

                if (current === this.tail) {
                    this.tail = previous;
                }

                current.next = null;
                this.length--;
                return current;
            }

            previous = current;
            current = current.next;
        }

        return null;
    }

    deleteAllByValue(value) {
        let deletedCount = 0;

        while (this.head !== null && this.head.value === value) {
            this.deleteHead();
            deletedCount++;
        }

        if (this.isEmpty()) {
            return deletedCount;
        }

        let current = this.head;

        while (current !== null && current.next !== null) {
            if (current.next.value === value) {
                const nodeToDelete = current.next;
                current.next = nodeToDelete.next;

                if (nodeToDelete === this.tail) {
                    this.tail = current;
                }

                nodeToDelete.next = null;
                this.length--;
                deletedCount++;
            } else {
                current = current.next;
            }
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
     * Read / search operations
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

    toArray() {
        const values = [];
        let current = this.head;

        while (current !== null) {
            values.push(current.value);
            current = current.next;
        }

        return values;
    }

    static fromArray(values) {
        const list = new SinglyLinkedList();

        for (const value of values) {
            list.append(value);
        }

        return list;
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        return this.toArray().join(" -> ");
    }

    clone() {
        return SinglyLinkedList.fromArray(this.toArray());
    }

    /**
     * ---------------------------
     * Reverse operations
     * ---------------------------
     */

    reverse() {
        if (this.isEmpty() || this.length === 1) {
            return this;
        }

        let previous = null;
        let current = this.head;
        this.tail = this.head;

        while (current !== null) {
            const nextNode = current.next;
            current.next = previous;
            previous = current;
            current = nextNode;
        }

        this.head = previous;
        return this;
    }

    reverseRecursive() {
        if (this.isEmpty() || this.length === 1) {
            return this;
        }

        this.tail = this.head;

        const reverseNodes = (node) => {
            if (node === null || node.next === null) {
                return node;
            }

            const newHead = reverseNodes(node.next);
            node.next.next = node;
            node.next = null;

            return newHead;
        };

        this.head = reverseNodes(this.head);
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
        if (!Number.isInteger(n) || n <= 0) {
            throw new RangeError("n must be a positive integer");
        }

        let fast = this.head;
        let slow = this.head;

        for (let i = 0; i < n; i++) {
            if (fast === null) {
                throw new RangeError(`n is greater than list length: ${n}`);
            }
            fast = fast.next;
        }

        while (fast !== null) {
            slow = slow.next;
            fast = fast.next;
        }

        return slow;
    }

    removeNthFromEnd(n) {
        if (!Number.isInteger(n) || n <= 0) {
            throw new RangeError("n must be a positive integer");
        }

        const dummy = new ListNode(0, this.head);
        let fast = dummy;
        let slow = dummy;

        for (let i = 0; i <= n; i++) {
            if (fast === null) {
                throw new RangeError(`n is greater than list length: ${n}`);
            }
            fast = fast.next;
        }

        while (fast !== null) {
            fast = fast.next;
            slow = slow.next;
        }

        const nodeToRemove = slow.next;
        slow.next = nodeToRemove.next;

        if (nodeToRemove === this.head) {
            this.head = nodeToRemove.next;
        } else {
            this.head = dummy.next;
        }

        if (nodeToRemove === this.tail) {
            this.tail = slow === dummy ? this.head : slow;
        }

        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        nodeToRemove.next = null;
        return nodeToRemove;
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

    removeDuplicates() {
        const seen = new Set();
        let current = this.head;
        let previous = null;

        while (current !== null) {
            if (seen.has(current.value)) {
                previous.next = current.next;

                if (current === this.tail) {
                    this.tail = previous;
                }

                this.length--;
            } else {
                seen.add(current.value);
                previous = current;
            }

            current = current.next;
        }

        return this;
    }

    isPalindrome() {
        const values = this.toArray();
        let left = 0;
        let right = values.length - 1;

        while (left < right) {
            if (values[left] !== values[right]) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }

    rotateRight(k) {
        if (this.isEmpty() || this.length === 1 || k === 0) {
            return this;
        }

        const rotations = k % this.length;

        if (rotations === 0) {
            return this;
        }

        let newTailIndex = this.length - rotations - 1;
        let newTail = this._getNodeAt(newTailIndex);
        let newHead = newTail.next;

        this.tail.next = this.head;
        newTail.next = null;

        this.head = newHead;
        this.tail = newTail;

        return this;
    }

    /**
     * ---------------------------
     * Static helper
     * ---------------------------
     */

    static mergeTwoSortedLists(list1, list2) {
        const mergedList = new SinglyLinkedList();
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
}

/**
 * ----------------------------------------
 * Example usage
 * ----------------------------------------
 */

const list = new SinglyLinkedList();

list.append(10);
list.append(20);
list.prepend(5);
list.insertAt(2, 15);

console.log("List:", list.toString()); // 5 -> 10 -> 15 -> 20
console.log("Size:", list.size()); // 4
console.log("Head:", list.peekHead()); // 5
console.log("Tail:", list.peekTail()); // 20
console.log("Contains 15:", list.contains(15)); // true
console.log("Middle:", list.middleNode()?.value); // 15

list.reverse();
console.log("Reversed:", list.toString()); // 20 -> 15 -> 10 -> 5

const listA = SinglyLinkedList.fromArray([1, 3, 5]);
const listB = SinglyLinkedList.fromArray([2, 4, 6]);
const merged = SinglyLinkedList.mergeTwoSortedLists(listA, listB);

console.log("Merged:", merged.toString()); // 1 -> 2 -> 3 -> 4 -> 5 -> 6




/*
============================================================
SINGLY LINKED LIST — OPERATIONS (MEMORIZATION GUIDE)
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
4. Return node


2. INSERTION OPERATIONS
------------------------------------------------------------

prepend(value)  // insert at beginning
Steps:
1. Create new node
2. node.next = head
3. head = node
4. If list empty → tail = node
5. length++

append(value)  // insert at end
Steps:
1. Create new node
2. If list empty:
   - head = node
   - tail = node
3. Else:
   - tail.next = node
   - tail = node
4. length++

insertAt(index, value)
Steps:
1. Validate index
2. If index == 0 → prepend
3. If index == length → append
4. Traverse to index - 1
5. Create new node
6. node.next = prev.next
7. prev.next = node
8. length++

insertAfter(targetValue, value)
Steps:
1. Traverse list
2. Find node with targetValue
3. Create new node
4. node.next = current.next
5. current.next = node
6. If current == tail → tail = node
7. length++
8. Return true/false

insertBefore(targetValue, value)
Steps:
1. If empty → return false
2. If head.value == target → prepend
3. Traverse with prev & current
4. Find target node
5. Create new node
6. prev.next = node
7. node.next = current
8. length++
9. Return true/false


3. DELETION OPERATIONS
------------------------------------------------------------

deleteHead()
Steps:
1. If empty → return null
2. temp = head
3. head = head.next
4. If head == null → tail = null
5. length--
6. Disconnect temp
7. Return temp

deleteTail()
Steps:
1. If empty → return null
2. If single node:
   - head = null
   - tail = null
3. Else:
   - Traverse to second last node
   - temp = tail
   - prev.next = null
   - tail = prev
4. length--
5. Return temp

deleteAt(index)
Steps:
1. Validate index
2. If index == 0 → deleteHead
3. Traverse to index - 1
4. temp = prev.next
5. prev.next = temp.next
6. If temp == tail → tail = prev
7. length--
8. Disconnect temp
9. Return temp

deleteByValue(value)
Steps:
1. If empty → return null
2. If head.value == value → deleteHead
3. Traverse with prev & current
4. Find matching node
5. prev.next = current.next
6. If current == tail → tail = prev
7. length--
8. Return node

deleteAllByValue(value)
Steps:
1. Remove matching nodes from head
2. Traverse list
3. If next node matches:
   - skip node
   - update tail if needed
4. length--
5. Continue traversal
6. Return count

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
2. Traverse to index
3. Return node

find(value)
Steps:
1. Traverse list
2. If value matches → return node
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

updateByValue(oldValue, newValue)
Steps:
1. Find node
2. If found → update value
3. Return true/false


6. TRAVERSAL OPERATIONS
------------------------------------------------------------

traverse(callback)
Steps:
1. Start from head
2. Loop through nodes
3. Call callback(node, index)

print()
Steps:
1. Convert to string
2. Print values

toArray()
Steps:
1. Traverse list
2. Push values into array
3. Return array

fromArray(array)
Steps:
1. Create new list
2. Loop array
3. Append each value
4. Return list


7. REVERSE OPERATIONS
------------------------------------------------------------

reverse()  // iterative
Steps:
1. prev = null, current = head
2. tail = head
3. Loop:
   - next = current.next
   - current.next = prev
   - prev = current
   - current = next
4. head = prev

reverseRecursive()
Steps:
1. Base case: node.next == null
2. Recursively reverse rest
3. node.next.next = node
4. node.next = null
5. Return new head


8. UTILITY OPERATIONS
------------------------------------------------------------

peekHead()
Steps:
1. Return head.value

peekTail()
Steps:
1. Return tail.value

clone()
Steps:
1. Convert to array
2. Build new list from array

toString()
Steps:
1. Convert to array
2. Join with " -> "


9. INTERVIEW-FOCUSED OPERATIONS
------------------------------------------------------------

middleNode()
Steps:
1. slow = head, fast = head
2. Move slow by 1, fast by 2
3. When fast ends → slow is middle

nthFromEnd(n)
Steps:
1. fast = head
2. Move fast n steps
3. Move slow & fast together
4. When fast ends → slow is answer

removeNthFromEnd(n)
Steps:
1. Use dummy node
2. Move fast n+1 steps
3. Move both pointers
4. Remove node

hasCycle()
Steps:
1. slow = head, fast = head
2. Move slow by 1, fast by 2
3. If they meet → cycle exists

findCycleStart()
Steps:
1. Detect cycle
2. Move one pointer to head
3. Move both one step
4. Meeting point = start

removeCycle()
Steps:
1. Find cycle start
2. Traverse to last node in cycle
3. Set next = null

mergeTwoSortedLists(l1, l2)
Steps:
1. Create dummy node
2. Compare nodes
3. Attach smaller node
4. Move pointer
5. Attach remaining nodes

sort()  // merge sort
Steps:
1. Find middle
2. Split list
3. Recursively sort
4. Merge lists

isPalindrome()
Steps:
1. Convert to array OR reverse second half
2. Compare both sides

partition(x)
Steps:
1. Create two lists (less, greater)
2. Traverse list
3. Add nodes accordingly
4. Merge lists

removeDuplicates()
Steps:
1. Use Set or two pointers
2. Remove duplicates

intersectionNode(l1, l2)
Steps:
1. Use two pointers
2. Switch lists when reaching end
3. Meeting point = intersection

rotateRight(k)
Steps:
1. Find length
2. Make list circular
3. Break at new position

swapPairs()
Steps:
1. Use dummy node
2. Swap pairs of nodes
3. Move pointers

reverseKGroup(k)
Steps:
1. Count k nodes
2. Reverse k nodes
3. Recursively process rest

============================================================
END OF MEMORIZATION GUIDE
============================================================
*/