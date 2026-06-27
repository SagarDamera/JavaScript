/**
 * Stack
 * ------------------------------------------------------------
 * Interview-ready, clean, maintainable implementation
 * with strong naming, edge-case handling, and readable methods.
 *
 * Implementation:
 * - Uses internal array
 * - Follows LIFO (Last In, First Out)
 */

class Stack {
    constructor() {
        this.items = [];
    }

    /**
     * ---------------------------
     * Creation / Initialization
     * ---------------------------
     */
    createStack(initialValues = []) {
        if (!Array.isArray(initialValues)) {
            throw new TypeError("Initial values must be an array");
        }

        this.items = [...initialValues];
        return this;
    }

    /**
     * ---------------------------
     * Basic state helpers
     * ---------------------------
     */
    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    /**
     * ---------------------------
     * Core stack operations
     * ---------------------------
     */
    push(value) {
        this.items.push(value);
        return this;
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items[this.items.length - 1];
    }

    /**
     * ---------------------------
     * Access / Read operations
     * ---------------------------
     */
    getTop() {
        return this.peek();
    }

    getBottom() {
        if (this.isEmpty()) {
            return null;
        }

        return this.items[0];
    }

    contains(value) {
        return this.items.includes(value);
    }

    search(value) {
        for (let index = this.items.length - 1; index >= 0; index--) {
            if (this.items[index] === value) {
                return {
                    indexFromBottom: index,
                    indexFromTop: this.items.length - 1 - index,
                    value: this.items[index],
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
    setAt(index, newValue) {
        this._validateIndex(index);
        this.items[index] = newValue;
        return this.items[index];
    }

    updateTop(newValue) {
        if (this.isEmpty()) {
            return false;
        }

        this.items[this.items.length - 1] = newValue;
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

        for (let index = this.items.length - 1; index >= 0; index--) {
            const indexFromTop = this.items.length - 1 - index;
            callback(this.items[index], index, indexFromTop);
        }
    }

    toArray() {
        return [...this.items];
    }

    toArrayFromTop() {
        return [...this.items].reverse();
    }

    static fromArray(values) {
        if (!Array.isArray(values)) {
            throw new TypeError("Values must be an array");
        }

        const stack = new Stack();
        stack.items = [...values];
        return stack;
    }

    print() {
        console.log(this.toString());
    }

    toString() {
        return this.isEmpty()
            ? "Stack is empty"
            : `TOP -> ${this.toArrayFromTop().join(" -> ")}`;
    }

    clone() {
        return Stack.fromArray(this.items);
    }

    /**
     * ---------------------------
     * Deletion / utility operations
     * ---------------------------
     */
    clear() {
        this.items = [];
        return this;
    }

    /**
     * ---------------------------
     * Interview-focused operations
     * ---------------------------
     */
    reverse() {
        this.items.reverse();
        return this;
    }

    pushMany(values) {
        if (!Array.isArray(values)) {
            throw new TypeError("Values must be an array");
        }

        for (const value of values) {
            this.push(value);
        }

        return this;
    }

    popMany(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new RangeError("Count must be a non-negative integer");
        }

        const removedItems = [];

        for (let i = 0; i < count; i++) {
            const removed = this.pop();

            if (removed === null) {
                break;
            }

            removedItems.push(removed);
        }

        return removedItems;
    }

    removeByValue(value) {
        const index = this.items.lastIndexOf(value);

        if (index === -1) {
            return false;
        }

        this.items.splice(index, 1);
        return true;
    }

    removeAllByValue(value) {
        const originalLength = this.items.length;
        this.items = this.items.filter((item) => item !== value);
        return originalLength - this.items.length;
    }

    swapTop() {
        if (this.size() < 2) {
            return false;
        }

        const lastIndex = this.items.length - 1;
        [this.items[lastIndex], this.items[lastIndex - 1]] = [
            this.items[lastIndex - 1],
            this.items[lastIndex],
        ];

        return true;
    }

    getMin() {
        if (this.isEmpty()) {
            return null;
        }

        let min = this.items[0];

        for (let i = 1; i < this.items.length; i++) {
            if (this.items[i] < min) {
                min = this.items[i];
            }
        }

        return min;
    }

    getMax() {
        if (this.isEmpty()) {
            return null;
        }

        let max = this.items[0];

        for (let i = 1; i < this.items.length; i++) {
            if (this.items[i] > max) {
                max = this.items[i];
            }
        }

        return max;
    }

    /**
     * ---------------------------
     * Internal validation helpers
     * ---------------------------
     */
    _validateIndex(index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.items.length) {
            throw new RangeError(`Invalid index: ${index}`);
        }
    }
}

/*
============================================================
STACK — OPERATIONS (MEMORIZATION GUIDE)
============================================================

Important Rule:
1. Stack follows LIFO
2. Last inserted item is removed first
3. All main operations happen at the top

1. CREATION / INITIALIZATION
------------------------------------------------------------

constructor()
Steps:
1. Initialize internal storage
2. Usually use an empty array
3. Stack starts empty

createStack(initialValues)
Steps:
1. Validate input is array
2. Copy values into internal storage
3. Return stack


2. INSERTION OPERATIONS
------------------------------------------------------------

push(value)
Steps:
1. Add value at the end
2. New value becomes top
3. Return stack if chaining needed

pushMany(values)
Steps:
1. Validate input is array
2. Loop through values
3. Push each value one by one
4. Return stack


3. DELETION OPERATIONS
------------------------------------------------------------

pop()
Steps:
1. If stack empty → return null
2. Remove last element
3. Return removed value

popMany(count)
Steps:
1. Validate count
2. Repeat pop count times
3. Stop early if stack becomes empty
4. Return removed values

removeByValue(value)
Steps:
1. Find last matching value
2. Remove it from internal storage
3. Return true/false

removeAllByValue(value)
Steps:
1. Filter all items not equal to value
2. Replace old storage
3. Return number of removed items

clear()
Steps:
1. Reset internal storage to empty array
2. Stack becomes empty


4. ACCESS / READ OPERATIONS
------------------------------------------------------------

peek()
Steps:
1. If empty → return null
2. Return last element
3. Do not remove it

getTop()
Steps:
1. Same as peek()
2. Return top element

getBottom()
Steps:
1. If empty → return null
2. Return first inserted element

contains(value)
Steps:
1. Check whether value exists
2. Return true/false

search(value)
Steps:
1. Traverse from top to bottom
2. If value found:
   - return value
   - return index from bottom
   - return index from top
3. Else return null

size()
Steps:
1. Return total number of items

isEmpty()
Steps:
1. Return size === 0


5. UPDATE OPERATIONS
------------------------------------------------------------

setAt(index, newValue)
Steps:
1. Validate index
2. Update item at that index
3. Return updated value

updateTop(newValue)
Steps:
1. If empty → return false
2. Replace top value
3. Return true


6. TRAVERSAL OPERATIONS
------------------------------------------------------------

traverse(callback)
Steps:
1. Validate callback
2. Start from top
3. Move toward bottom
4. Call callback(value, index, indexFromTop)

print()
Steps:
1. Convert stack to readable string
2. Print top-to-bottom view

toArray()
Steps:
1. Return shallow copy of internal array
2. Order remains bottom to top

toArrayFromTop()
Steps:
1. Copy array
2. Reverse copied array
3. Return top to bottom order

fromArray(array)
Steps:
1. Validate input is array
2. Create new stack
3. Copy array values
4. Return stack


7. REVERSE OPERATIONS
------------------------------------------------------------

reverse()
Steps:
1. Reverse internal storage
2. Old bottom becomes new top
3. Return stack


8. UTILITY OPERATIONS
------------------------------------------------------------

clone()
Steps:
1. Copy internal array
2. Create new stack from copied array
3. Return new stack

toString()
Steps:
1. If empty → return "Stack is empty"
2. Convert to top-to-bottom order
3. Join with " -> "
4. Prefix with "TOP -> "

swapTop()
Steps:
1. If size < 2 → return false
2. Swap top two items
3. Return true


9. INTERVIEW-FOCUSED OPERATIONS
------------------------------------------------------------

getMin()
Steps:
1. If empty → return null
2. Traverse all items
3. Keep track of smallest value
4. Return min

getMax()
Steps:
1. If empty → return null
2. Traverse all items
3. Keep track of largest value
4. Return max

Common Interview Use Cases of Stack:
Steps:
1. Balanced parentheses
2. Undo / redo
3. Function call stack
4. Expression evaluation
5. Monotonic stack problems
6. Next greater element
7. Browser back tracking

============================================================
END OF MEMORIZATION GUIDE
============================================================
*/

// Example usage
const stack = new Stack();

stack.push(10).push(20).push(30);
console.log(stack.toString()); // TOP -> 30 -> 20 -> 10

console.log(stack.peek()); // 30
console.log(stack.pop()); // 30
console.log(stack.toString()); // TOP -> 20 -> 10

stack.pushMany([40, 50]);
console.log(stack.toArray()); // [10, 20, 40, 50]
console.log(stack.toArrayFromTop()); // [50, 40, 20, 10]

console.log(stack.getMin()); // 10
console.log(stack.getMax()); // 50

stack.swapTop();
console.log(stack.toString()); // TOP -> 40 -> 50 -> 20 -> 10