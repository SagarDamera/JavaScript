/**
 * Queue Using Array
 * ------------------------------------------------------------
 * Interview-ready, clean, maintainable implementation
 * with strong naming, edge-case handling, and readable methods.
 *
 * Design Choice:
 * - Uses array with front pointer (optimized)
 * - Avoids costly shift() operation
 * - Follows FIFO (First In, First Out)
 */

class Queue {
    constructor() {
        this.items = [];
        this.frontIndex = 0; // pointer to front
    }

    /**
     * ---------------------------
     * Creation / Initialization
     * ---------------------------
     */
    createQueue(initialValues = []) {
        if (!Array.isArray(initialValues)) {
            throw new TypeError("Initial values must be an array");
        }

        this.items = [...initialValues];
        this.frontIndex = 0;
        return this;
    }

    /**
     * ---------------------------
     * Basic state helpers
     * ---------------------------
     */
    isEmpty() {
        return this.size() === 0;
    }

    size() {
        return this.items.length - this.frontIndex;
    }

    /**
     * ---------------------------
     * Core queue operations
     * ---------------------------
     */
    enqueue(value) {
        this.items.push(value);
        return this;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }

        const value = this.items[this.frontIndex];
        this.frontIndex++;

        // Optimization: reset array if too much unused space
        if (this.frontIndex > 50 && this.frontIndex * 2 >= this.items.length) {
            this.items = this.items.slice(this.frontIndex);
            this.frontIndex = 0;
        }

        return value;
    }

    peek() {
        return this.isEmpty() ? null : this.items[this.frontIndex];
    }

    /**
     * ---------------------------
     * Access / Read operations
     * ---------------------------
     */
    getFront() {
        return this.peek();
    }

    getRear() {
        return this.isEmpty() ? null : this.items[this.items.length - 1];
    }

    contains(value) {
        return this.items.slice(this.frontIndex).includes(value);
    }

    find(value) {
        for (let i = this.frontIndex; i < this.items.length; i++) {
            if (this.items[i] === value) {
                return {
                    value: this.items[i],
                    indexFromFront: i - this.frontIndex,
                    indexFromRear: this.items.length - 1 - i,
                };
            }
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

        this.items[this.frontIndex] = newValue;
        return true;
    }

    setAt(indexFromFront, newValue) {
        this._validateIndex(indexFromFront);

        this.items[this.frontIndex + indexFromFront] = newValue;
        return newValue;
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

        let indexFromFront = 0;

        for (let i = this.frontIndex; i < this.items.length; i++) {
            callback(this.items[i], indexFromFront);
            indexFromFront++;
        }
    }

    toArray() {
        return this.items.slice(this.frontIndex);
    }

    toArrayFromRear() {
        return this.toArray().reverse();
    }

    static fromArray(values) {
        const queue = new Queue();
        queue.createQueue(values);
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
        return Queue.fromArray(this.toArray());
    }

    /**
     * ---------------------------
     * Deletion / utility operations
     * ---------------------------
     */
    clear() {
        this.items = [];
        this.frontIndex = 0;
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

        const removed = [];

        for (let i = 0; i < count; i++) {
            const value = this.dequeue();
            if (value === null) break;
            removed.push(value);
        }

        return removed;
    }

    removeByValue(value) {
        const arr = this.toArray();
        const index = arr.indexOf(value);

        if (index === -1) return false;

        arr.splice(index, 1);
        this.createQueue(arr);
        return true;
    }

    removeAllByValue(value) {
        const arr = this.toArray();
        const filtered = arr.filter((v) => v !== value);
        const removedCount = arr.length - filtered.length;

        this.createQueue(filtered);
        return removedCount;
    }

    /**
     * ---------------------------
     * Interview-focused operations
     * ---------------------------
     */
    reverse() {
        const arr = this.toArray().reverse();
        this.createQueue(arr);
        return this;
    }

    getMin() {
        if (this.isEmpty()) return null;

        let min = this.items[this.frontIndex];

        for (let i = this.frontIndex + 1; i < this.items.length; i++) {
            if (this.items[i] < min) {
                min = this.items[i];
            }
        }

        return min;
    }

    getMax() {
        if (this.isEmpty()) return null;

        let max = this.items[this.frontIndex];

        for (let i = this.frontIndex + 1; i < this.items.length; i++) {
            if (this.items[i] > max) {
                max = this.items[i];
            }
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
            indexFromFront >= this.size()
        ) {
            throw new RangeError(`Invalid index: ${indexFromFront}`);
        }
    }
}

/*
============================================================
QUEUE USING ARRAY — OPERATIONS (MEMORIZATION GUIDE)
============================================================

Important Rule:
1. Queue follows FIFO
2. First inserted element is removed first
3. enqueue at rear, dequeue from front
4. Use front pointer to avoid costly shift()

1. CREATION / INITIALIZATION
------------------------------------------------------------

constructor()
Steps:
1. Initialize items = []
2. Initialize frontIndex = 0

createQueue(initialValues)
Steps:
1. Validate input is array
2. Copy values into items
3. frontIndex = 0
4. Return queue


2. INSERTION OPERATIONS
------------------------------------------------------------

enqueue(value)
Steps:
1. Add value at end of array
2. This becomes rear

enqueueMany(values)
Steps:
1. Validate input array
2. Loop values
3. Call enqueue for each


3. DELETION OPERATIONS
------------------------------------------------------------

dequeue()
Steps:
1. If empty → return null
2. Get value at frontIndex
3. Increment frontIndex
4. If too much unused space:
   - slice array
   - reset frontIndex
5. Return value

dequeueMany(count)
Steps:
1. Validate count
2. Repeat dequeue count times
3. Stop if empty
4. Return removed values

removeByValue(value)
Steps:
1. Convert to array
2. Find first occurrence
3. Remove it
4. Rebuild queue

removeAllByValue(value)
Steps:
1. Convert to array
2. Filter out values
3. Rebuild queue
4. Return count

clear()
Steps:
1. items = []
2. frontIndex = 0


4. ACCESS / READ OPERATIONS
------------------------------------------------------------

peek()
Steps:
1. If empty → return null
2. Return items[frontIndex]

getFront()
Steps:
1. Same as peek()

getRear()
Steps:
1. If empty → return null
2. Return last element

contains(value)
Steps:
1. Check in valid portion of array
2. Return true/false

find(value)
Steps:
1. Traverse from frontIndex
2. If found:
   - return value
   - indexFromFront
   - indexFromRear
3. Else return null

size()
Steps:
1. Return items.length - frontIndex

isEmpty()
Steps:
1. Return size === 0


5. UPDATE OPERATIONS
------------------------------------------------------------

updateFront(newValue)
Steps:
1. If empty → return false
2. Replace front value
3. Return true

setAt(indexFromFront, newValue)
Steps:
1. Validate index
2. items[frontIndex + index] = newValue
3. Return new value


6. TRAVERSAL OPERATIONS
------------------------------------------------------------

traverse(callback)
Steps:
1. Validate callback
2. Loop from frontIndex to end
3. Call callback(value, indexFromFront)

print()
Steps:
1. Convert queue to string
2. Print in FIFO order

toArray()
Steps:
1. Slice from frontIndex
2. Return array

toArrayFromRear()
Steps:
1. Reverse toArray()
2. Return reversed array

fromArray(array)
Steps:
1. Validate array
2. Create new queue
3. Copy values


7. REVERSE OPERATIONS
------------------------------------------------------------

reverse()
Steps:
1. Convert to array
2. Reverse array
3. Rebuild queue


8. UTILITY OPERATIONS
------------------------------------------------------------

clone()
Steps:
1. Convert to array
2. Create new queue
3. Return copy

toString()
Steps:
1. If empty → return "Queue is empty"
2. Convert to array
3. Join with " -> "
4. Add FRONT and REAR labels


9. INTERVIEW-FOCUSED OPERATIONS
------------------------------------------------------------

getMin()
Steps:
1. If empty → return null
2. Traverse valid range
3. Track minimum value

getMax()
Steps:
1. If empty → return null
2. Traverse valid range
3. Track maximum value

Why use front pointer:
Steps:
1. Avoid shift() → O(n)
2. dequeue becomes O(1)
3. Improves performance significantly

Common Interview Use Cases:
Steps:
1. BFS traversal
2. Sliding window problems
3. Task scheduling
4. Printer queue
5. Rate limiting systems
6. Level order traversal

============================================================
END OF MEMORIZATION GUIDE
============================================================
*/

// Example usage
const queue = new Queue();

queue.enqueue(10).enqueue(20).enqueue(30);
console.log(queue.toString()); // FRONT -> 10 -> 20 -> 30 <- REAR

console.log(queue.peek()); // 10
console.log(queue.dequeue()); // 10

console.log(queue.toString()); // FRONT -> 20 -> 30 <- REAR

queue.enqueueMany([40, 50]);
console.log(queue.toArray()); // [20, 30, 40, 50]

console.log(queue.getMin()); // 20
console.log(queue.getMax()); // 50

queue.reverse();
console.log(queue.toString()); // FRONT -> 50 -> 40 -> 30 -> 20 <- REAR