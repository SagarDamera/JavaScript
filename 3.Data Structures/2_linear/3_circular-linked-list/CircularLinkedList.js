/**
 * Circular Singly Linked List
 * ------------------------------------------------------------
 * Interview-ready, clean, maintainable implementation
 * with strong naming, edge-case handling, and readable methods.
 *
 * Rule:
 * - tail.next always points to head when list is not empty
 */

class CircularListNode {
    /**
     * @param {*} value
     * @param {CircularListNode|null} next
     */
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class CircularLinkedList {
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
        return new CircularListNode(value);
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
     * Internal helpers
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

    _connectCircularLinks() {
        if (this.tail !== null) {
            this.tail.next = this.head;
        }
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
            newNode.next = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
            this.tail.next = this.head;
        }

        this.length++;
        return this;
    }

    append(value) {
        const newNode = this.createNode(value);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
        } else {
            newNode.next = this.head;
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
        const newNode = this.createNode(value);

        newNode.next = previousNode.next;
        previousNode.next = newNode;

        this.length++;
        return this;
    }

    insertAfter(targetValue, value) {
        if (this.isEmpty()) {
            return false;
        }

        let current = this.head;

        for (let i = 0; i < this.length; i++) {
            if (current.value === targetValue) {
                const newNode = this.createNode(value);

                newNode.next = current.next;
                current.next = newNode;

                if (current === this.tail) {
                    this.tail = newNode;
                }

                this._connectCircularLinks();
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

        let previous = this.head;
        let current = this.head.next;

        for (let i = 1; i < this.length; i++) {
            if (current.value === targetValue) {
                const newNode = this.createNode(value);

                newNode.next = current;
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

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.tail.next = this.head;
        }

        this.length--;
        removedNode.next = null;

        return removedNode;
    }

    deleteTail() {
        if (this.isEmpty()) {
            return null;
        }

        if (this.length === 1) {
            const removedNode = this.tail;
            this.head = null;
            this.tail = null;
            this.length = 0;
            removedNode.next = null;
            return removedNode;
        }

        let previous = this.head;

        while (previous.next !== this.tail) {
            previous = previous.next;
        }

        const removedNode = this.tail;
        previous.next = this.head;
        this.tail = previous;
        this.length--;
        removedNode.next = null;

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

        const previousNode = this._getNodeAt(index - 1);
        const removedNode = previousNode.next;

        previousNode.next = removedNode.next;
        this.length--;
        removedNode.next = null;

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

        for (let i = 1; i < this.length; i++) {
            if (current.value === value) {
                previous.next = current.next;

                if (current === this.tail) {
                    this.tail = previous;
                    this.tail.next = this.head;
                }

                this.length--;
                current.next = null;
                return current;
            }

            previous = current;
            current = current.next;
        }

        return null;
    }

    deleteAllByValue(value) {
        let deletedCount = 0;

        while (!this.isEmpty() && this.head.value === value) {
            this.deleteHead();
            deletedCount++;
        }

        if (this.isEmpty()) {
            return deletedCount;
        }

        let previous = this.head;
        let current = this.head.next;
        let remainingChecks = this.length - 1;

        while (remainingChecks > 0) {
            if (current.value === value) {
                previous.next = current.next;

                if (current === this.tail) {
                    this.tail = previous;
                }

                const nodeToDelete = current;
                current = current.next;
                this.length--;
                deletedCount++;
                nodeToDelete.next = null;
                remainingChecks--;
            } else {
                previous = current;
                current = current.next;
                remainingChecks--;
            }
        }

        this._connectCircularLinks();
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
        if (this.isEmpty()) {
            return null;
        }

        let current = this.head;

        for (let i = 0; i < this.length; i++) {
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

        if (this.isEmpty()) {
            return;
        }

        let current = this.head;

        for (let index = 0; index < this.length; index++) {
            callback(current, index);
            current = current.next;
        }
    }

    toArray() {
        const values = [];
        this.traverse((node) => values.push(node.value));
        return values;
    }

    static fromArray(values) {
        const list = new CircularLinkedList();

        for (const value of values) {
            list.append(value);
        }

        return list;
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        return this.isEmpty() ? "" : `${this.toArray().join(" -> ")} -> (back to head)`;
    }

    clone() {
        return CircularLinkedList.fromArray(this.toArray());
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

        let previous = this.tail;
        let current = this.head;

        for (let i = 0; i < this.length; i++) {
            const nextNode = current.next;
            current.next = previous;
            previous = current;
            current = nextNode;
        }

        const oldHead = this.head;
        this.head = this.tail;
        this.tail = oldHead;
        this.tail.next = this.head;

        return this;
    }

    reverseRecursive() {
        if (this.length <= 1) {
            return this;
        }

        const nodes = this.toArray();
        nodes.reverse();

        this.clear();

        for (const value of nodes) {
            this.append(value);
        }

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

        while (fast.next !== this.head && fast.next.next !== this.head) {
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
        const index = this.length - n;
        return this.deleteAt(index);
    }

    hasCycle() {
        return !this.isEmpty() && this.tail.next === this.head;
    }

    findCycleStart() {
        return this.hasCycle() ? this.head : null;
    }

    removeCycle() {
        if (!this.hasCycle()) {
            return false;
        }

        this.tail.next = null;
        return true;
    }

    restoreCycle() {
        if (!this.isEmpty() && this.tail.next === null) {
            this.tail.next = this.head;
        }
        return this;
    }

    static mergeTwoSortedLists(list1, list2) {
        const mergedList = new CircularLinkedList();

        let pointer1 = list1.head;
        let pointer2 = list2.head;
        let count1 = 0;
        let count2 = 0;

        while (count1 < list1.length && count2 < list2.length) {
            if (pointer1.value <= pointer2.value) {
                mergedList.append(pointer1.value);
                pointer1 = pointer1.next;
                count1++;
            } else {
                mergedList.append(pointer2.value);
                pointer2 = pointer2.next;
                count2++;
            }
        }

        while (count1 < list1.length) {
            mergedList.append(pointer1.value);
            pointer1 = pointer1.next;
            count1++;
        }

        while (count2 < list2.length) {
            mergedList.append(pointer2.value);
            pointer2 = pointer2.next;
            count2++;
        }

        return mergedList;
    }

    sort(compareFn = (a, b) => a - b) {
        const values = this.toArray().sort(compareFn);

        this.clear();

        for (const value of values) {
            this.append(value);
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

    partition(x) {
        const less = [];
        const greaterOrEqual = [];

        this.traverse((node) => {
            if (node.value < x) {
                less.push(node.value);
            } else {
                greaterOrEqual.push(node.value);
            }
        });

        this.clear();

        for (const value of [...less, ...greaterOrEqual]) {
            this.append(value);
        }

        return this;
    }

    removeDuplicates() {
        const seen = new Set();
        const uniqueValues = [];

        this.traverse((node) => {
            if (!seen.has(node.value)) {
                seen.add(node.value);
                uniqueValues.push(node.value);
            }
        });

        this.clear();

        for (const value of uniqueValues) {
            this.append(value);
        }

        return this;
    }

    static intersectionNode(list1, list2) {
        const nodes = new Set();
        let current1 = list1.head;

        for (let i = 0; i < list1.length; i++) {
            nodes.add(current1);
            current1 = current1.next;
        }

        let current2 = list2.head;

        for (let i = 0; i < list2.length; i++) {
            if (nodes.has(current2)) {
                return current2;
            }
            current2 = current2.next;
        }

        return null;
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

        this.tail = newTail;
        this.head = newTail.next;
        this.tail.next = this.head;

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
}

/*
============================================================
CIRCULAR LINKED LIST — OPERATIONS (MEMORIZATION GUIDE)
============================================================

Important Rule:
1. In circular linked list, tail.next always points to head
2. There is no null at the end while list is circular
3. Traversal must use length or stop when reaching head again

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
2. If list is empty:
   - head = node
   - tail = node
   - node.next = node
3. Else:
   - node.next = head
   - head = node
   - tail.next = head
4. length++

append(value)  // insert at end
Steps:
1. Create new node
2. If list is empty:
   - head = node
   - tail = node
   - node.next = node
3. Else:
   - node.next = head
   - tail.next = node
   - tail = node
4. length++

insertAt(index, value)
Steps:
1. Validate index
2. If index == 0 → prepend
3. If index == length → append
4. Find node at index - 1
5. Create new node
6. node.next = prev.next
7. prev.next = node
8. length++

insertAfter(targetValue, value)
Steps:
1. If empty → return false
2. Traverse using length
3. Find target node
4. Create new node
5. node.next = current.next
6. current.next = node
7. If current is tail → tail = node
8. tail.next = head
9. length++
10. Return true/false

insertBefore(targetValue, value)
Steps:
1. If empty → return false
2. If head.value == target → prepend
3. Traverse with prev and current
4. Find target node
5. Create new node
6. node.next = current
7. prev.next = node
8. length++
9. Return true/false


3. DELETION OPERATIONS
------------------------------------------------------------

deleteHead()
Steps:
1. If empty → return null
2. Store head in temp
3. If single node:
   - head = null
   - tail = null
4. Else:
   - head = head.next
   - tail.next = head
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
   - find node before tail
   - prev.next = head
   - tail = prev
4. length--
5. Disconnect removed tail
6. Return removed node

deleteAt(index)
Steps:
1. Validate index
2. If index == 0 → deleteHead
3. If index == last index → deleteTail
4. Find node at index - 1
5. temp = prev.next
6. prev.next = temp.next
7. length--
8. Disconnect temp
9. Return temp

deleteByValue(value)
Steps:
1. If empty → return null
2. If head matches → deleteHead
3. Traverse with prev and current using length
4. Find first matching node
5. prev.next = current.next
6. If current is tail:
   - tail = prev
   - tail.next = head
7. length--
8. Disconnect current
9. Return current

deleteAllByValue(value)
Steps:
1. Remove matching values from head first
2. If list becomes empty → return count
3. Traverse remaining nodes carefully
4. If current matches:
   - skip current
   - update tail if needed
   - length--
5. After loop, ensure tail.next = head
6. Return deleted count

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
2. Traverse index steps from head
3. Return node

find(value)
Steps:
1. If empty → return null
2. Traverse using length
3. If match found → return node
4. Else return null

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
1. If empty → stop
2. Start from head
3. Loop exactly length times
4. Call callback(node, index)
5. Move current = current.next

print()
Steps:
1. Convert list to string
2. Print values

toArray()
Steps:
1. Traverse list
2. Push values into array
3. Return array

fromArray(array)
Steps:
1. Create new circular list
2. Loop through array
3. Append each value
4. Return list


7. REVERSE OPERATIONS
------------------------------------------------------------

reverse()
Steps:
1. If size <= 1 → return
2. prev = tail, current = head
3. Loop length times:
   - next = current.next
   - current.next = prev
   - prev = current
   - current = next
4. Swap head and tail
5. tail.next = head

reverseRecursive()
Steps:
1. Easy interview version: convert to array and reverse
2. Clear list
3. Rebuild circular list
4. Ensure tail.next = head


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
2. Build new circular list from array

toString()
Steps:
1. Convert to array
2. Join with " -> "
3. Add " -> (back to head)"


9. INTERVIEW-FOCUSED OPERATIONS
------------------------------------------------------------

middleNode()
Steps:
1. slow = head, fast = head
2. Move slow by 1 and fast by 2
3. Stop when fast is about to wrap around
4. slow is middle

nthFromEnd(n)
Steps:
1. Validate n
2. Convert to index = length - n
3. Return node at that index

removeNthFromEnd(n)
Steps:
1. Convert nth from end to normal index
2. Delete node at that index

hasCycle()
Steps:
1. In proper circular list, cycle already exists
2. Check if tail.next === head

findCycleStart()
Steps:
1. If circular structure valid → head is cycle start
2. Return head or null

removeCycle()
Steps:
1. If circular → set tail.next = null
2. List becomes normal singly linked list
3. Return true/false

mergeTwoSortedLists(list1, list2)
Steps:
1. Create new result list
2. Traverse both lists using counters
3. Compare current values
4. Append smaller value
5. Add remaining values
6. Result remains circular

sort()
Steps:
1. Convert to array
2. Sort array
3. Clear list
4. Rebuild circular list

isPalindrome()
Steps:
1. Convert to array
2. Compare left and right values
3. If all same → palindrome

partition(x)
Steps:
1. Create two groups: less, greater/equal
2. Traverse list
3. Store values based on comparison
4. Rebuild list in partition order

removeDuplicates()
Steps:
1. Use Set
2. Traverse list once
3. Store only first occurrence
4. Rebuild list
5. Maintain circular link

intersectionNode(list1, list2)
Steps:
1. Store nodes of first list in Set
2. Traverse second list using length
3. First repeated node = intersection

rotateRight(k)
Steps:
1. Find effective rotations using k % length
2. New tail index = length - rotations - 1
3. Set tail = node at new tail index
4. head = tail.next
5. tail.next = head

swapPairs()
Steps:
1. Convert to array or swap links
2. Swap every adjacent pair
3. Rebuild circular list

reverseKGroup(k)
Steps:
1. Convert to array
2. Reverse each full group of k
3. Keep incomplete last group as is
4. Rebuild circular list

============================================================
END OF MEMORIZATION GUIDE
============================================================
*/

// Example usage
const cll = new CircularLinkedList();

cll.append(10).append(20).append(30);
cll.prepend(5);
cll.insertAt(2, 15);

console.log(cll.toString()); // 5 -> 10 -> 15 -> 20 -> 30 -> (back to head)
console.log(cll.peekHead()); // 5
console.log(cll.peekTail()); // 30
console.log(cll.middleNode()?.value); // 15

cll.reverse();
console.log(cll.toString()); // 30 -> 20 -> 15 -> 10 -> 5 -> (back to head)
console.log(cll.hasCycle()); // true