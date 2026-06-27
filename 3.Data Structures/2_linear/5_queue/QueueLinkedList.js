/**
 * Queue Using Singly Linked List
 * ------------------------------------------------------------
 * Interview-ready, clean, maintainable implementation
 * with strong naming, edge-case handling, and readable methods.
 *
 * Design Choice:
 * - front = head of linked list
 * - rear  = tail of linked list
 * - enqueue() at rear  => O(1)
 * - dequeue() from front => O(1)
 * - Follows FIFO (First In, First Out)
 */

class QueueNode {
    /**
     * @param {*} value
     * @param {QueueNode|null} next
     */
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class QueueUsingLinkedList {
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
        return new QueueNode(value);
    }

    createQueue(initialValues = []) {
        if (!Array.isArray(initialValues)) {
            throw new TypeError("Initial values must be an array");
        }

        this.clear();

        for (const value of initialValues) {
            this.enqueue(value);
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
     * Core queue operations
     * ---------------------------
     */
    enqueue(value) {
        const newNode = this.createNode(value);

        if (this.isEmpty()) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }

        this.length++;
        return this;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        const removedNode = this.front;
        this.front = this.front.next;
        this.length--;

        if (this.front === null) {
            this.rear = null;
        }

        removedNode.next = null;
        return removedNode.value;
    }

    peek() {
        return this.front ? this.front.value : null;
    }

    /**
     * ---------------------------
     * Access / Read operations
     * ---------------------------
     */
    getFront() {
        return this.front;
    }

    getRear() {
        return this.rear;
    }

    getFrontValue() {
        return this.front ? this.front.value : null;
    }

    getRearValue() {
        return this.rear ? this.rear.value : null;
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

    setAt(indexFromFront, newValue) {
        this._validateIndex(indexFromFront);

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

    toArray() {
        const values = [];

        this.traverse((node) => {
            values.push(node.value);
        });

        return values;
    }

    toArrayFromRear() {
        return this.toArray().reverse();
    }

    static fromArray(values) {
        if (!Array.isArray(values)) {
            throw new TypeError("Values must be an array");
        }

        const queue = new QueueUsingLinkedList();

        for (const value of values) {
            queue.enqueue(value);
        }

        return queue;
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        return this.isEmpty()
            ? "Queue is empty"
            : `FRONT -> ${this.toArray().join(" -> ")} <- REAR`;
    }

    clone() {
        return QueueUsingLinkedList.fromArray(this.toArray());
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

    enqueueMany(values) {
        if (!Array.isArray(values)) {
            throw new TypeError("Values must be an array");
        }

        for (const value of values) {
            this.enqueue(value);
        }

        return this;
    }

    dequeueMany(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new RangeError("Count must be a non-negative integer");
        }

        const removedValues = [];

        for (let i = 0; i < count; i++) {
            const value = this.dequeue();

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

        if (this.front.value === value) {
            this.dequeue();
            return true;
        }

        let previous = this.front;
        let current = this.front.next;

        while (current !== null) {
            if (current.value === value) {
                previous.next = current.next;

                if (current === this.rear) {
                    this.rear = previous;
                }

                current.next = null;
                this.length--;
                return true;
            }

            previous = current;
            current = current.next;
        }

        return false;
    }

    removeAllByValue(value) {
        let removedCount = 0;

        while (this.front !== null && this.front.value === value) {
            this.dequeue();
            removedCount++;
        }

        if (this.isEmpty()) {
            return removedCount;
        }

        let previous = this.front;
        let current = this.front.next;

        while (current !== null) {
            if (current.value === value) {
                previous.next = current.next;

                if (current === this.rear) {
                    this.rear = previous;
                }

                current.next = null;
                current = previous.next;
                this.length--;
                removedCount++;
            } else {
                previous = current;
                current = current.next;
            }
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

        let previous = null;
        let current = this.front;
        const oldFront = this.front;

        while (current !== null) {
            const nextNode = current.next;
            current.next = previous;
            previous = current;
            current = nextNode;
        }

        this.front = previous;
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

        let current = this.front;
        let currentIndex = 0;

        while (currentIndex < indexFromFront) {
            current = current.next;
            currentIndex++;
        }

        return current;
    }
}

/*
============================================================
QUEUE USING LINKED LIST — OPERATIONS (MEMORIZATION GUIDE)
============================================================

Important Rule:
1. Queue follows FIFO
2. front points to first node
3. rear points to last node
4. enqueue at rear  => O(1)
5. dequeue from front => O(1)
6. Best queue design in linked list:
   - front = head
   - rear = tail

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
4. Return node

createQueue(initialValues)
Steps:
1. Validate input is array
2. Clear old queue
3. Enqueue each value in order
4. Return queue


2. INSERTION OPERATIONS
------------------------------------------------------------

enqueue(value)
Steps:
1. Create new node
2. If queue is empty:
   - front = node
   - rear = node
3. Else:
   - rear.next = node
   - rear = node
4. length++

enqueueMany(values)
Steps:
1. Validate input array
2. Loop through values
3. Enqueue each value
4. Return queue


3. DELETION OPERATIONS
------------------------------------------------------------

dequeue()
Steps:
1. If queue is empty → return null
2. temp = front
3. front = front.next
4. length--
5. If front becomes null:
   - rear = null
6. Disconnect temp
7. Return temp.value

dequeueMany(count)
Steps:
1. Validate count
2. Repeat dequeue count times
3. Stop if queue becomes empty
4. Return removed values

removeByValue(value)
Steps:
1. If empty → return false
2. If front matches → dequeue
3. Traverse with previous and current
4. Find first matching node
5. previous.next = current.next
6. If current is rear → rear = previous
7. Disconnect current
8. length--
9. Return true/false

removeAllByValue(value)
Steps:
1. Remove matching values from front first
2. Traverse remaining nodes
3. If current matches:
   - previous.next = current.next
   - if current is rear → rear = previous
   - disconnect current
   - length--
4. Return removed count

clear()
Steps:
1. front = null
2. rear = null
3. length = 0


4. ACCESS / READ OPERATIONS
------------------------------------------------------------

peek()
Steps:
1. If empty → return null
2. Return front.value
3. Do not remove it

getFront()
Steps:
1. Return front node

getRear()
Steps:
1. Return rear node

getFrontValue()
Steps:
1. Return front.value or null

getRearValue()
Steps:
1. Return rear.value or null

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

setAt(indexFromFront, newValue)
Steps:
1. Validate index
2. Traverse to node at index
3. Update node.value
4. Return node


6. TRAVERSAL OPERATIONS
------------------------------------------------------------

traverse(callback)
Steps:
1. Validate callback
2. Start from front
3. Move node by node
4. Call callback(node, indexFromFront)

print()
Steps:
1. Convert queue to readable string
2. Print front-to-rear view

toArray()
Steps:
1. Traverse from front
2. Push values into array
3. Return array in front-to-rear order

toArrayFromRear()
Steps:
1. Convert to array
2. Reverse array
3. Return rear-to-front order

fromArray(array)
Steps:
1. Validate input array
2. Create new queue
3. Enqueue each value
4. Return queue


7. REVERSE OPERATIONS
------------------------------------------------------------

reverse()
Steps:
1. If size <= 1 → return
2. prev = null
3. current = front
4. Store old front
5. Loop:
   - next = current.next
   - current.next = prev
   - prev = current
   - current = next
6. front = prev
7. rear = old front


8. UTILITY OPERATIONS
------------------------------------------------------------

clone()
Steps:
1. Convert queue to array
2. Build new queue from that array
3. Return new queue

toString()
Steps:
1. If empty → return "Queue is empty"
2. Traverse from front
3. Join with " -> "
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

Why Queue with Linked List is Good:
Steps:
1. enqueue = O(1)
2. dequeue = O(1)
3. No shifting needed
4. No fixed-size limitation
5. Good for dynamic memory usage

Common Interview Use Cases:
Steps:
1. BFS traversal
2. Level order traversal in trees
3. Task scheduling
4. Printer queue
5. Call center queue
6. Rate limiting systems
7. Producer-consumer patterns

============================================================
END OF MEMORIZATION GUIDE
============================================================
*/

// Example usage
const queue = new QueueUsingLinkedList();

queue.enqueue(10).enqueue(20).enqueue(30);
console.log(queue.toString()); // FRONT -> 10 -> 20 -> 30 <- REAR

console.log(queue.peek()); // 10
console.log(queue.dequeue()); // 10
console.log(queue.toString()); // FRONT -> 20 -> 30 <- REAR

queue.enqueueMany([40, 50]);
console.log(queue.toArray()); // [20, 30, 40, 50]
console.log(queue.toArrayFromRear()); // [50, 40, 30, 20]

console.log(queue.getMin()); // 20
console.log(queue.getMax()); // 50

queue.reverse();
console.log(queue.toString()); // FRONT -> 50 -> 40 -> 30 -> 20 <- REAR