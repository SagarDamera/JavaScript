/**
 * Deque (Double-Ended Queue) Using Doubly Linked List
 * ------------------------------------------------------------
 * Interview-ready, clean, maintainable implementation
 * with strong naming, edge-case handling, and readable methods.
 *
 * Design Choice:
 * - front = head of doubly linked list
 * - rear  = tail of doubly linked list
 * - insert/delete at both ends => O(1)
 * - Follows:
 *   - enqueueFront()
 *   - enqueueRear()
 *   - dequeueFront()
 *   - dequeueRear()
 */

class DequeNode {
    /**
     * @param {*} value
     * @param {DequeNode|null} next
     * @param {DequeNode|null} prev
     */
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class Deque {
    constructor() {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }

    /**
     * ---------------------------
     * Creation / Initialization
     * ---------------------------
     */
    createNode(value) {
        return new DequeNode(value);
    }

    createDeque(initialValues = []) {
        if (!Array.isArray(initialValues)) {
            throw new TypeError("Initial values must be an array");
        }

        this.clear();

        for (const value of initialValues) {
            this.enqueueRear(value);
        }

        return this;
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

    /**
     * ---------------------------
     * Core deque operations
     * ---------------------------
     */
    enqueueFront(value) {
        const newNode = this.createNode(value);

        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            newNode.next = this.front;
            this.front.prev = newNode;
            this.front = newNode;
        }

        this.length++;
        return this;
    }

    enqueueRear(value) {
        const newNode = this.createNode(value);

        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            newNode.prev = this.rear;
            this.rear.next = newNode;
            this.rear = newNode;
        }

        this.length++;
        return this;
    }

    dequeueFront() {
        if (this.isEmpty()) {
            return null;
        }

        const removedNode = this.front;

        if (this.length === 1) {
            this.front = null;
            this.rear = null;
        } else {
            this.front = removedNode.next;
            this.front.prev = null;
            removedNode.next = null;
        }

        this.length--;
        return removedNode.value;
    }

    dequeueRear() {
        if (this.isEmpty()) {
            return null;
        }

        const removedNode = this.rear;

        if (this.length === 1) {
            this.front = null;
            this.rear = null;
        } else {
            this.rear = removedNode.prev;
            this.rear.next = null;
            removedNode.prev = null;
        }

        this.length--;
        return removedNode.value;
    }

    /**
     * ---------------------------
     * Access / Read operations
     * ---------------------------
     */
    peekFront() {
        return this.front ? this.front.value : null;
    }

    peekRear() {
        return this.rear ? this.rear.value : null;
    }

    getFront() {
        return this.front;
    }

    getRear() {
        return this.rear;
    }

    contains(value) {
        return this.find(value) !== null;
    }

    find(value) {
        let current = this.front;
        let indexFromFront = 0;

        while (current !== null) {
            if (current.value === value) {
                return {
                    node: current,
                    value: current.value,
                    indexFromFront,
                    indexFromRear: this.length - 1 - indexFromFront,
                };
            }

            current = current.next;
            indexFromFront++;
        }

        return null;
    }

    getAt(indexFromFront) {
        return this._getNodeAt(indexFromFront);
    }

    /**
     * ---------------------------
     * Update operations
     * ---------------------------
     */
    updateFront(newValue) {
        if (this.isEmpty()) {
            return false;
        }

        this.front.value = newValue;
        return true;
    }

    updateRear(newValue) {
        if (this.isEmpty()) {
            return false;
        }

        this.rear.value = newValue;
        return true;
    }

    setAt(indexFromFront, newValue) {
        const node = this._getNodeAt(indexFromFront);
        node.value = newValue;
        return node;
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

        let current = this.front;
        let indexFromFront = 0;

        while (current !== null) {
            callback(current, indexFromFront);
            current = current.next;
            indexFromFront++;
        }
    }

    traverseReverse(callback) {
        if (typeof callback !== "function") {
            throw new TypeError("Callback must be a function");
        }

        let current = this.rear;
        let indexFromRear = 0;

        while (current !== null) {
            callback(current, indexFromRear);
            current = current.prev;
            indexFromRear++;
        }
    }

    toArray() {
        const values = [];

        this.traverse((node) => {
            values.push(node.value);
        });

        return values;
    }

    toArrayFromRear() {
        const values = [];

        this.traverseReverse((node) => {
            values.push(node.value);
        });

        return values;
    }

    static fromArray(values) {
        if (!Array.isArray(values)) {
            throw new TypeError("Values must be an array");
        }

        const deque = new Deque();

        for (const value of values) {
            deque.enqueueRear(value);
        }

        return deque;
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        return this.isEmpty()
            ? "Deque is empty"
            : `FRONT -> ${this.toArray().join(" <-> ")} <- REAR`;
    }

    clone() {
        return Deque.fromArray(this.toArray());
    }

    /**
     * ---------------------------
     * Deletion / utility operations
     * ---------------------------
     */
    clear() {
        this.front = null;
        this.rear = null;
        this.length = 0;
        return this;
    }

    enqueueManyFront(values) {
        if (!Array.isArray(values)) {
            throw new TypeError("Values must be an array");
        }

        for (const value of values) {
            this.enqueueFront(value);
        }

        return this;
    }

    enqueueManyRear(values) {
        if (!Array.isArray(values)) {
            throw new TypeError("Values must be an array");
        }

        for (const value of values) {
            this.enqueueRear(value);
        }

        return this;
    }

    dequeueManyFront(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new RangeError("Count must be a non-negative integer");
        }

        const removedValues = [];

        for (let i = 0; i < count; i++) {
            const value = this.dequeueFront();

            if (value === null) {
                break;
            }

            removedValues.push(value);
        }

        return removedValues;
    }

    dequeueManyRear(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new RangeError("Count must be a non-negative integer");
        }

        const removedValues = [];

        for (let i = 0; i < count; i++) {
            const value = this.dequeueRear();

            if (value === null) {
                break;
            }

            removedValues.push(value);
        }

        return removedValues;
    }

    removeByValue(value) {
        if (this.isEmpty()) {
            return false;
        }

        let current = this.front;

        while (current !== null) {
            if (current.value === value) {
                if (current === this.front) {
                    this.dequeueFront();
                    return true;
                }

                if (current === this.rear) {
                    this.dequeueRear();
                    return true;
                }

                current.prev.next = current.next;
                current.next.prev = current.prev;
                current.next = null;
                current.prev = null;
                this.length--;

                return true;
            }

            current = current.next;
        }

        return false;
    }

    removeAllByValue(value) {
        let removedCount = 0;
        let current = this.front;

        while (current !== null) {
            const nextNode = current.next;

            if (current.value === value) {
                if (current === this.front) {
                    this.dequeueFront();
                } else if (current === this.rear) {
                    this.dequeueRear();
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                    current.next = null;
                    current.prev = null;
                    this.length--;
                }

                removedCount++;
            }

            current = nextNode;
        }

        return removedCount;
    }

    /**
     * ---------------------------
     * Interview-focused operations
     * ---------------------------
     */
    reverse() {
        if (this.length <= 1) {
            return this;
        }

        let current = this.front;

        while (current !== null) {
            const nextNode = current.next;
            current.next = current.prev;
            current.prev = nextNode;
            current = nextNode;
        }

        const oldFront = this.front;
        this.front = this.rear;
        this.rear = oldFront;

        return this;
    }

    getMin() {
        if (this.isEmpty()) {
            return null;
        }

        let min = this.front.value;
        let current = this.front.next;

        while (current !== null) {
            if (current.value < min) {
                min = current.value;
            }

            current = current.next;
        }

        return min;
    }

    getMax() {
        if (this.isEmpty()) {
            return null;
        }

        let max = this.front.value;
        let current = this.front.next;

        while (current !== null) {
            if (current.value > max) {
                max = current.value;
            }

            current = current.next;
        }

        return max;
    }

    rotateLeft(steps = 1) {
        if (!Number.isInteger(steps) || steps < 0) {
            throw new RangeError("Steps must be a non-negative integer");
        }

        if (this.length <= 1 || steps === 0) {
            return this;
        }

        const rotations = steps % this.length;

        for (let i = 0; i < rotations; i++) {
            const value = this.dequeueFront();
            this.enqueueRear(value);
        }

        return this;
    }

    rotateRight(steps = 1) {
        if (!Number.isInteger(steps) || steps < 0) {
            throw new RangeError("Steps must be a non-negative integer");
        }

        if (this.length <= 1 || steps === 0) {
            return this;
        }

        const rotations = steps % this.length;

        for (let i = 0; i < rotations; i++) {
            const value = this.dequeueRear();
            this.enqueueFront(value);
        }

        return this;
    }

    /**
     * ---------------------------
     * Internal helpers
     * ---------------------------
     */
    _validateIndex(indexFromFront) {
        if (
            !Number.isInteger(indexFromFront) ||
            indexFromFront < 0 ||
            indexFromFront >= this.length
        ) {
            throw new RangeError(`Invalid index from front: ${indexFromFront}`);
        }
    }

    _getNodeAt(indexFromFront) {
        this._validateIndex(indexFromFront);

        if (indexFromFront < this.length / 2) {
            let current = this.front;
            let currentIndex = 0;

            while (currentIndex < indexFromFront) {
                current = current.next;
                currentIndex++;
            }

            return current;
        }

        let current = this.rear;
        let currentIndex = this.length - 1;

        while (currentIndex > indexFromFront) {
            current = current.prev;
            currentIndex--;
        }

        return current;
    }
}

/*
============================================================
DEQUE — OPERATIONS (MEMORIZATION GUIDE)
============================================================

Important Rule:
1. Deque = Double-Ended Queue
2. Insertions happen at both ends
3. Deletions happen at both ends
4. Best implementation uses doubly linked list
5. front = head, rear = tail
6. All end operations are O(1)

1. CREATION / INITIALIZATION
------------------------------------------------------------

constructor()
Steps:
1. Initialize front = null
2. Initialize rear = null
3. Initialize length = 0

createNode(value)
Steps:
1. Create new node
2. node.value = value
3. node.next = null
4. node.prev = null
5. Return node

createDeque(initialValues)
Steps:
1. Validate input is array
2. Clear old deque
3. Insert each value at rear
4. Return deque


2. INSERTION OPERATIONS
------------------------------------------------------------

enqueueFront(value)
Steps:
1. Create new node
2. If deque is empty:
   - front = node
   - rear = node
3. Else:
   - node.next = front
   - front.prev = node
   - front = node
4. length++

enqueueRear(value)
Steps:
1. Create new node
2. If deque is empty:
   - front = node
   - rear = node
3. Else:
   - node.prev = rear
   - rear.next = node
   - rear = node
4. length++

enqueueManyFront(values)
Steps:
1. Validate input array
2. Loop through values
3. Enqueue each at front
4. Return deque

enqueueManyRear(values)
Steps:
1. Validate input array
2. Loop through values
3. Enqueue each at rear
4. Return deque


3. DELETION OPERATIONS
------------------------------------------------------------

dequeueFront()
Steps:
1. If empty → return null
2. temp = front
3. If only one node:
   - front = null
   - rear = null
4. Else:
   - front = front.next
   - front.prev = null
5. length--
6. Disconnect temp
7. Return temp.value

dequeueRear()
Steps:
1. If empty → return null
2. temp = rear
3. If only one node:
   - front = null
   - rear = null
4. Else:
   - rear = rear.prev
   - rear.next = null
5. length--
6. Disconnect temp
7. Return temp.value

dequeueManyFront(count)
Steps:
1. Validate count
2. Repeat dequeueFront count times
3. Stop if deque becomes empty
4. Return removed values

dequeueManyRear(count)
Steps:
1. Validate count
2. Repeat dequeueRear count times
3. Stop if deque becomes empty
4. Return removed values

removeByValue(value)
Steps:
1. If empty → return false
2. Traverse from front
3. Find first matching node
4. If front node → dequeueFront
5. If rear node → dequeueRear
6. Else:
   - previous.next = next
   - next.prev = previous
   - disconnect node
   - length--
7. Return true/false

removeAllByValue(value)
Steps:
1. Traverse all nodes
2. Store next node first
3. If current matches:
   - remove safely
   - update links
   - length--
4. Continue traversal
5. Return removed count

clear()
Steps:
1. front = null
2. rear = null
3. length = 0


4. ACCESS / READ OPERATIONS
------------------------------------------------------------

peekFront()
Steps:
1. If empty → return null
2. Return front.value

peekRear()
Steps:
1. If empty → return null
2. Return rear.value

getFront()
Steps:
1. Return front node

getRear()
Steps:
1. Return rear node

contains(value)
Steps:
1. Use find()
2. Return true/false

find(value)
Steps:
1. Start from front
2. Traverse node by node
3. If found:
   - return node
   - return value
   - return indexFromFront
   - return indexFromRear
4. Else return null

getAt(indexFromFront)
Steps:
1. Validate index
2. If index in first half → traverse from front
3. Else traverse from rear
4. Return node

size()
Steps:
1. Return length

isEmpty()
Steps:
1. Return length === 0


5. UPDATE OPERATIONS
------------------------------------------------------------

updateFront(newValue)
Steps:
1. If empty → return false
2. front.value = newValue
3. Return true

updateRear(newValue)
Steps:
1. If empty → return false
2. rear.value = newValue
3. Return true

setAt(indexFromFront, newValue)
Steps:
1. Get node at index
2. Update node.value
3. Return node


6. TRAVERSAL OPERATIONS
------------------------------------------------------------

traverse(callback)
Steps:
1. Validate callback
2. Start from front
3. Move using next
4. Call callback(node, indexFromFront)

traverseReverse(callback)
Steps:
1. Validate callback
2. Start from rear
3. Move using prev
4. Call callback(node, indexFromRear)

print()
Steps:
1. Convert deque to readable string
2. Print front-to-rear view

toArray()
Steps:
1. Traverse from front
2. Push values into array
3. Return array

toArrayFromRear()
Steps:
1. Traverse from rear
2. Push values into array
3. Return array

fromArray(array)
Steps:
1. Validate input array
2. Create new deque
3. Enqueue each value at rear
4. Return deque


7. REVERSE OPERATIONS
------------------------------------------------------------

reverse()
Steps:
1. If size <= 1 → return
2. Traverse each node
3. Swap node.next and node.prev
4. Move using original next
5. Swap front and rear


8. UTILITY OPERATIONS
------------------------------------------------------------

clone()
Steps:
1. Convert deque to array
2. Build new deque from that array
3. Return new deque

toString()
Steps:
1. If empty → return "Deque is empty"
2. Traverse from front
3. Join with " <-> "
4. Add FRONT and REAR labels


9. INTERVIEW-FOCUSED OPERATIONS
------------------------------------------------------------

getMin()
Steps:
1. If empty → return null
2. Traverse all nodes
3. Keep track of minimum value
4. Return min

getMax()
Steps:
1. If empty → return null
2. Traverse all nodes
3. Keep track of maximum value
4. Return max

rotateLeft(steps)
Steps:
1. Validate steps
2. Find effective rotations using steps % length
3. Repeat:
   - remove from front
   - insert at rear
4. Return deque

rotateRight(steps)
Steps:
1. Validate steps
2. Find effective rotations using steps % length
3. Repeat:
   - remove from rear
   - insert at front
4. Return deque

Why Deque is Useful:
Steps:
1. Supports queue operations from both ends
2. More flexible than queue
3. Good for sliding window problems
4. Good for palindrome checks
5. Good for monotonic queue problems

Common Interview Use Cases:
Steps:
1. Sliding window maximum
2. Palindrome checking
3. Undo/redo variants
4. Task scheduling with priorities at ends
5. 0-1 BFS
6. Cache-like end operations

============================================================
END OF MEMORIZATION GUIDE
============================================================
*/

// Example usage
const deque = new Deque();

deque.enqueueRear(10).enqueueRear(20).enqueueRear(30);
deque.enqueueFront(5);

console.log(deque.toString()); // FRONT -> 5 <-> 10 <-> 20 <-> 30 <- REAR
console.log(deque.peekFront()); // 5
console.log(deque.peekRear()); // 30

console.log(deque.dequeueFront()); // 5
console.log(deque.dequeueRear()); // 30
console.log(deque.toString()); // FRONT -> 10 <-> 20 <- REAR

deque.enqueueManyRear([30, 40]);
console.log(deque.toArray()); // [10, 20, 30, 40]

deque.rotateRight(1);
console.log(deque.toString()); // FRONT -> 40 <-> 10 <-> 20 <-> 30 <- REAR

deque.reverse();
console.log(deque.toString()); // FRONT -> 30 <-> 20 <-> 10 <-> 40 <- REAR