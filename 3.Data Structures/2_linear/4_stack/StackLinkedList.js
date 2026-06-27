/**
 * Stack Using Singly Linked List
 * ------------------------------------------------------------
 * Interview-ready, clean, maintainable implementation
 * with strong naming, edge-case handling, and readable methods.
 *
 * Design Choice:
 * - Top of stack = head of linked list
 * - push()  => insert at head     => O(1)
 * - pop()   => remove from head   => O(1)
 * - peek()  => read head          => O(1)
 */

class StackNode {
    /**
     * @param {*} value
     * @param {StackNode|null} next
     */
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class StackUsingLinkedList {
    constructor() {
        this.top = null;
        this.length = 0;
    }

    /**
     * ---------------------------
     * Creation / Initialization
     * ---------------------------
     */
    createNode(value) {
        return new StackNode(value);
    }

    createStack(initialValues = []) {
        if (!Array.isArray(initialValues)) {
            throw new TypeError("Initial values must be an array");
        }

        this.clear();

        for (let i = initialValues.length - 1; i >= 0; i--) {
            this.push(initialValues[i]);
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
     * Core stack operations
     * ---------------------------
     */
    push(value) {
        const newNode = this.createNode(value, this.top);
        newNode.next = this.top;
        this.top = newNode;
        this.length++;
        return this;
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }

        const removedNode = this.top;
        this.top = this.top.next;
        this.length--;

        removedNode.next = null;
        return removedNode.value;
    }

    peek() {
        return this.top ? this.top.value : null;
    }

    /**
     * ---------------------------
     * Access / Read operations
     * ---------------------------
     */
    getTop() {
        return this.top;
    }

    getTopValue() {
        return this.peek();
    }

    getBottom() {
        if (this.isEmpty()) {
            return null;
        }

        let current = this.top;

        while (current.next !== null) {
            current = current.next;
        }

        return current;
    }

    getBottomValue() {
        const bottomNode = this.getBottom();
        return bottomNode ? bottomNode.value : null;
    }

    contains(value) {
        return this.find(value) !== null;
    }

    find(value) {
        let current = this.top;
        let indexFromTop = 0;

        while (current !== null) {
            if (current.value === value) {
                return {
                    node: current,
                    value: current.value,
                    indexFromTop,
                    indexFromBottom: this.length - 1 - indexFromTop,
                };
            }

            current = current.next;
            indexFromTop++;
        }

        return null;
    }

    /**
     * ---------------------------
     * Update operations
     * ---------------------------
     */
    updateTop(newValue) {
        if (this.isEmpty()) {
            return false;
        }

        this.top.value = newValue;
        return true;
    }

    setAt(indexFromTop, newValue) {
        this._validateIndexFromTop(indexFromTop);

        const node = this._getNodeAtFromTop(indexFromTop);
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

        let current = this.top;
        let indexFromTop = 0;

        while (current !== null) {
            callback(current, indexFromTop);
            current = current.next;
            indexFromTop++;
        }
    }

    toArrayFromTop() {
        const values = [];

        this.traverse((node) => {
            values.push(node.value);
        });

        return values;
    }

    toArray() {
        return this.toArrayFromTop().reverse();
    }

    static fromArray(values) {
        if (!Array.isArray(values)) {
            throw new TypeError("Values must be an array");
        }

        const stack = new StackUsingLinkedList();

        for (const value of values) {
            stack.push(value);
        }

        return stack.reverse();
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
        return StackUsingLinkedList.fromArray(this.toArray());
    }

    /**
     * ---------------------------
     * Deletion / utility operations
     * ---------------------------
     */
    clear() {
        this.top = null;
        this.length = 0;
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

        const removedValues = [];

        for (let i = 0; i < count; i++) {
            const value = this.pop();

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

        if (this.top.value === value) {
            this.pop();
            return true;
        }

        let previous = this.top;
        let current = this.top.next;

        while (current !== null) {
            if (current.value === value) {
                previous.next = current.next;
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

        while (this.top !== null && this.top.value === value) {
            this.pop();
            removedCount++;
        }

        if (this.isEmpty()) {
            return removedCount;
        }

        let previous = this.top;
        let current = this.top.next;

        while (current !== null) {
            if (current.value === value) {
                previous.next = current.next;
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
        let previous = null;
        let current = this.top;

        while (current !== null) {
            const nextNode = current.next;
            current.next = previous;
            previous = current;
            current = nextNode;
        }

        this.top = previous;
        return this;
    }

    swapTop() {
        if (this.length < 2) {
            return false;
        }

        const first = this.top;
        const second = this.top.next;

        first.next = second.next;
        second.next = first;
        this.top = second;

        return true;
    }

    getMin() {
        if (this.isEmpty()) {
            return null;
        }

        let min = this.top.value;
        let current = this.top.next;

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

        let max = this.top.value;
        let current = this.top.next;

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
    _validateIndexFromTop(indexFromTop) {
        if (
            !Number.isInteger(indexFromTop) ||
            indexFromTop < 0 ||
            indexFromTop >= this.length
        ) {
            throw new RangeError(`Invalid index from top: ${indexFromTop}`);
        }
    }

    _getNodeAtFromTop(indexFromTop) {
        this._validateIndexFromTop(indexFromTop);

        let current = this.top;
        let currentIndex = 0;

        while (currentIndex < indexFromTop) {
            current = current.next;
            currentIndex++;
        }

        return current;
    }
}

/*
============================================================
STACK USING LINKED LIST — OPERATIONS (MEMORIZATION GUIDE)
============================================================

Important Rule:
1. Stack follows LIFO
2. Best linked list choice:
   - top = head
3. push at head  => O(1)
4. pop from head => O(1)
5. Never use tail for normal stack operations in singly linked list

1. CREATION / INITIALIZATION
------------------------------------------------------------

constructor()
Steps:
1. Initialize top = null
2. Initialize length = 0

createNode(value)
Steps:
1. Create new node
2. node.value = value
3. node.next = null
4. Return node

createStack(initialValues)
Steps:
1. Validate input is array
2. Clear old stack
3. Insert values in correct order
4. Return stack


2. INSERTION OPERATIONS
------------------------------------------------------------

push(value)
Steps:
1. Create new node
2. node.next = current top
3. top = node
4. length++

pushMany(values)
Steps:
1. Validate input is array
2. Loop through values
3. Push each value
4. Return stack


3. DELETION OPERATIONS
------------------------------------------------------------

pop()
Steps:
1. If empty → return null
2. temp = top
3. top = top.next
4. length--
5. Disconnect temp
6. Return temp.value

popMany(count)
Steps:
1. Validate count
2. Repeat pop count times
3. Stop if stack becomes empty
4. Return removed values

removeByValue(value)
Steps:
1. If empty → return false
2. If top matches → pop
3. Traverse with previous and current
4. Find first matching node
5. previous.next = current.next
6. Disconnect current
7. length--
8. Return true/false

removeAllByValue(value)
Steps:
1. Remove matching values from top first
2. Traverse remaining nodes
3. If current matches:
   - previous.next = current.next
   - disconnect current
   - length--
4. Return removed count

clear()
Steps:
1. top = null
2. length = 0


4. ACCESS / READ OPERATIONS
------------------------------------------------------------

peek()
Steps:
1. If empty → return null
2. Return top.value
3. Do not remove node

getTop()
Steps:
1. Return top node

getTopValue()
Steps:
1. Return peek()

getBottom()
Steps:
1. If empty → return null
2. Traverse until current.next == null
3. Return last node

getBottomValue()
Steps:
1. Get bottom node
2. Return node.value or null

contains(value)
Steps:
1. Use find()
2. Return true/false

find(value)
Steps:
1. Start from top
2. Traverse downward
3. If found:
   - return node
   - return indexFromTop
   - return indexFromBottom
4. Else return null

size()
Steps:
1. Return length

isEmpty()
Steps:
1. Return length === 0


5. UPDATE OPERATIONS
------------------------------------------------------------

updateTop(newValue)
Steps:
1. If empty → return false
2. top.value = newValue
3. Return true

setAt(indexFromTop, newValue)
Steps:
1. Validate index
2. Traverse to node at index from top
3. Update node.value
4. Return node


6. TRAVERSAL OPERATIONS
------------------------------------------------------------

traverse(callback)
Steps:
1. Validate callback
2. Start from top
3. Move node by node
4. Call callback(node, indexFromTop)

print()
Steps:
1. Convert stack to readable string
2. Print top-to-bottom view

toArrayFromTop()
Steps:
1. Traverse from top
2. Push node values into array
3. Return array in top-to-bottom order

toArray()
Steps:
1. Get top-to-bottom array
2. Reverse it
3. Return bottom-to-top order

fromArray(array)
Steps:
1. Validate input
2. Create new stack
3. Push values in correct order
4. Return stack


7. REVERSE OPERATIONS
------------------------------------------------------------

reverse()
Steps:
1. prev = null
2. current = top
3. Loop:
   - next = current.next
   - current.next = prev
   - prev = current
   - current = next
4. top = prev


8. UTILITY OPERATIONS
------------------------------------------------------------

clone()
Steps:
1. Convert stack to array
2. Build new stack from that array
3. Return new stack

toString()
Steps:
1. If empty → return "Stack is empty"
2. Traverse from top
3. Join with " -> "
4. Prefix with "TOP -> "

swapTop()
Steps:
1. If size < 2 → return false
2. first = top
3. second = top.next
4. first.next = second.next
5. second.next = first
6. top = second
7. Return true


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

Why Stack with Linked List is Good:
Steps:
1. push = O(1)
2. pop = O(1)
3. No fixed size problem
4. No shifting needed
5. Good for dynamic memory usage

Common Interview Use Cases of Stack:
Steps:
1. Balanced parentheses
2. Undo / redo
3. Expression evaluation
4. Browser history
5. DFS traversal
6. Monotonic stack problems
7. Next greater element

============================================================
END OF MEMORIZATION GUIDE
============================================================
*/

// Example usage
const stack = new StackUsingLinkedList();

stack.push(10).push(20).push(30);
console.log(stack.toString()); // TOP -> 30 -> 20 -> 10

console.log(stack.peek()); // 30
console.log(stack.pop()); // 30
console.log(stack.toString()); // TOP -> 20 -> 10

stack.pushMany([40, 50]);
console.log(stack.toArrayFromTop()); // [50, 40, 20, 10]
console.log(stack.toArray()); // [10, 20, 40, 50]

console.log(stack.getMin()); // 10
console.log(stack.getMax()); // 50

stack.swapTop();
console.log(stack.toString()); // TOP -> 40 -> 50 -> 20 -> 10