/********************************************************************************************
 * NeetCode 150: Sliding Window
 * Sliding Window Maximum
 *
 * LeetCode 239. Sliding Window Maximum
 *
 * ------------------------------------------------------------------------------------------
 * Problem:
 * ------------------------------------------------------------------------------------------
 * You are given an integer array nums and an integer k.
 *
 * There is a sliding window of size k moving from the left side of the array to the right.
 * Return the maximum value in each window.
 *
 * ------------------------------------------------------------------------------------------
 * Example:
 * ------------------------------------------------------------------------------------------
 * Input:
 * nums = [1, 3, -1, -3, 5, 3, 6, 7]
 * k = 3
 *
 * Output:
 * [3, 3, 5, 5, 6, 7]
 *
 ********************************************************************************************/


/********************************************************************************************
 * SOLUTION 1: BRUTE FORCE
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * For every window of size k, scan all k elements and find the maximum.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Since we manually check every element in every window, we definitely find the correct
 * maximum for each window.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Start each window at index i.
 * 2. End of window is i + k - 1.
 * 3. Scan all elements inside that window.
 * 4. Find max.
 * 5. Push max into result.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n * k)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(1) extra space, excluding output array.
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Only for understanding.
 * Too slow for large inputs.
 *
 ********************************************************************************************/

function maxSlidingWindowBruteForce(nums, k) {
    const result = [];

    for (let left = 0; left <= nums.length - k; left++) {
        let maxValue = -Infinity;

        for (let i = left; i < left + k; i++) {
            maxValue = Math.max(maxValue, nums[i]);
        }

        result.push(maxValue);
    }

    return result;
}


/********************************************************************************************
 * SOLUTION 2: BETTER APPROACH USING MAX HEAP
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Use a max heap to always keep the largest value available at the top.
 *
 * Store both:
 *  - value
 *  - index
 *
 * Why index?
 * Because some values in the heap may be outside the current window.
 * We remove outdated values when they reach the top.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * A max heap gives the largest value quickly.
 * By checking indexes, we make sure the top value belongs to the current window.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Add each element to the max heap with its index.
 * 2. Once we have processed at least k elements:
 *      a. Remove heap top while its index is outside the current window.
 *      b. Heap top is the current window maximum.
 *      c. Add heap top value to result.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n log n)
 *
 * Each push/pop costs log n.
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Good if you already know heap.
 * But deque solution is better for this problem.
 *
 ********************************************************************************************/

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(item) {
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);

        return max;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);

            if (this.heap[parent].value >= this.heap[index].value) {
                break;
            }

            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    bubbleDown(index) {
        while (true) {
            let largest = index;
            const left = index * 2 + 1;
            const right = index * 2 + 2;

            if (
                left < this.heap.length &&
                this.heap[left].value > this.heap[largest].value
            ) {
                largest = left;
            }

            if (
                right < this.heap.length &&
                this.heap[right].value > this.heap[largest].value
            ) {
                largest = right;
            }

            if (largest === index) {
                break;
            }

            [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
            index = largest;
        }
    }
}

function maxSlidingWindowHeap(nums, k) {
    const result = [];
    const maxHeap = new MaxHeap();

    for (let right = 0; right < nums.length; right++) {
        maxHeap.push({
            value: nums[right],
            index: right
        });

        if (right >= k - 1) {
            const left = right - k + 1;

            while (maxHeap.size() > 0 && maxHeap.peek().index < left) {
                maxHeap.pop();
            }

            result.push(maxHeap.peek().value);
        }
    }

    return result;
}


/********************************************************************************************
 * SOLUTION 3: OPTIMAL MONOTONIC DEQUE
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Use a deque to store indexes of elements.
 *
 * The deque will be maintained in decreasing order of values.
 *
 * Meaning:
 * nums[deque[0]] is always the maximum of the current window.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * If current number is greater than numbers at the back of the deque, those smaller numbers
 * can never become maximum while current number is still in the window.
 *
 * So we remove them.
 *
 * This keeps only useful candidates for maximum.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Create empty deque.
 * 2. Move right pointer from 0 to n - 1.
 * 3. Remove indexes from front if they are outside the current window.
 * 4. Remove indexes from back while nums[back] < nums[right].
 * 5. Push current index to back.
 * 6. Once first full window is formed, nums[deque[0]] is the maximum.
 * 7. Add it to result.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * Each index is pushed once and popped at most once.
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(k)
 *
 * Deque stores at most k indexes.
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * This is the best interview solution.
 * This is the main recommended solution.
 *
 ********************************************************************************************/

function maxSlidingWindowDeque(nums, k) {
    const result = [];
    const deque = [];

    for (let right = 0; right < nums.length; right++) {
        const left = right - k + 1;

        while (deque.length > 0 && deque[0] < left) {
            deque.shift();
        }

        while (
            deque.length > 0 &&
            nums[deque[deque.length - 1]] < nums[right]
        ) {
            deque.pop();
        }

        deque.push(right);

        if (right >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}


/********************************************************************************************
 * MAIN RECOMMENDED SOLUTION
 *
 * ------------------------------------------------------------------------------------------
 * Use this in interviews:
 * ------------------------------------------------------------------------------------------
 * Monotonic Deque
 *
 * Reason:
 *  - O(n) time
 *  - O(k) space
 *  - Best possible solution
 *  - Classic Sliding Window Maximum pattern
 *
 ********************************************************************************************/

function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = [];

    for (let right = 0; right < nums.length; right++) {
        const left = right - k + 1;

        while (deque.length > 0 && deque[0] < left) {
            deque.shift();
        }

        while (
            deque.length > 0 &&
            nums[deque[deque.length - 1]] < nums[right]
        ) {
            deque.pop();
        }

        deque.push(right);

        if (right >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}


/********************************************************************************************
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 *
 * nums = [1, 3, -1, -3, 5, 3, 6, 7]
 * k = 3
 *
 * ------------------------------------------------------------------------------------------
 * Deque stores indexes, not values.
 * Values inside deque are kept in decreasing order.
 *
 * ------------------------------------------------------------------------------------------
 * right = 0, nums[right] = 1
 *
 * deque = [0]
 * values = [1]
 *
 * No full window yet.
 *
 * ------------------------------------------------------------------------------------------
 * right = 1, nums[right] = 3
 *
 * Current value 3 is greater than 1.
 * Remove index 0 from back.
 *
 * deque = []
 * Push index 1.
 *
 * deque = [1]
 * values = [3]
 *
 * No full window yet.
 *
 * ------------------------------------------------------------------------------------------
 * right = 2, nums[right] = -1
 *
 * -1 is smaller than 3.
 * Push index 2.
 *
 * deque = [1, 2]
 * values = [3, -1]
 *
 * First full window:
 * [1, 3, -1]
 *
 * Max = nums[deque[0]] = nums[1] = 3
 *
 * result = [3]
 *
 * ------------------------------------------------------------------------------------------
 * right = 3, nums[right] = -3
 *
 * Push index 3.
 *
 * deque = [1, 2, 3]
 * values = [3, -1, -3]
 *
 * Current window:
 * [3, -1, -3]
 *
 * Max = nums[1] = 3
 *
 * result = [3, 3]
 *
 * ------------------------------------------------------------------------------------------
 * right = 4, nums[right] = 5
 *
 * Current window should be:
 * [-1, -3, 5]
 *
 * Index 1 is outside the window, remove from front.
 *
 * deque before removing smaller values:
 * [2, 3]
 * values = [-1, -3]
 *
 * 5 is greater than -3, remove -3.
 * 5 is greater than -1, remove -1.
 *
 * Push index 4.
 *
 * deque = [4]
 * values = [5]
 *
 * Max = 5
 *
 * result = [3, 3, 5]
 *
 * ------------------------------------------------------------------------------------------
 * right = 5, nums[right] = 3
 *
 * 3 is smaller than 5.
 * Push index 5.
 *
 * deque = [4, 5]
 * values = [5, 3]
 *
 * Current window:
 * [-3, 5, 3]
 *
 * Max = 5
 *
 * result = [3, 3, 5, 5]
 *
 * ------------------------------------------------------------------------------------------
 * right = 6, nums[right] = 6
 *
 * Current value 6 is greater than 3, remove 3.
 * Current value 6 is greater than 5, remove 5.
 *
 * Push index 6.
 *
 * deque = [6]
 * values = [6]
 *
 * Current window:
 * [5, 3, 6]
 *
 * Max = 6
 *
 * result = [3, 3, 5, 5, 6]
 *
 * ------------------------------------------------------------------------------------------
 * right = 7, nums[right] = 7
 *
 * Current value 7 is greater than 6, remove 6.
 *
 * Push index 7.
 *
 * deque = [7]
 * values = [7]
 *
 * Current window:
 * [3, 6, 7]
 *
 * Max = 7
 *
 * result = [3, 3, 5, 5, 6, 7]
 *
 * Final Answer = [3, 3, 5, 5, 6, 7]
 *
 ********************************************************************************************/


/********************************************************************************************
 * IMPORTANT DETAIL: WHY STORE INDEXES IN DEQUE?
 *
 * ------------------------------------------------------------------------------------------
 * We store indexes instead of values because we need to know when an element moves outside
 * the current window.
 *
 * Example:
 * nums = [1, 3, -1, -3, 5]
 * k = 3
 *
 * When right = 4, current window is:
 * [-1, -3, 5]
 *
 * Index 1, value 3, is no longer inside the window.
 * So we remove it from the front if it is still there.
 *
 ********************************************************************************************/


/********************************************************************************************
 * IMPORTANT DETAIL: WHY REMOVE SMALLER VALUES FROM BACK?
 *
 * ------------------------------------------------------------------------------------------
 * Suppose current value is 5.
 *
 * If deque back has value -1 or -3, those values can never be maximum while 5 is in the
 * same window because:
 *
 *  - 5 is bigger
 *  - 5 is newer, so it will stay in the window longer
 *
 * Therefore, smaller values behind 5 are useless and can be removed.
 *
 ********************************************************************************************/


/********************************************************************************************
 * REVISION-FRIENDLY NOTES
 *
 * ------------------------------------------------------------------------------------------
 * Pattern Used:
 * ------------------------------------------------------------------------------------------
 * Sliding Window + Monotonic Deque
 *
 * ------------------------------------------------------------------------------------------
 * Memory Hook:
 * ------------------------------------------------------------------------------------------
 * "Deque front is always the max."
 *
 * ------------------------------------------------------------------------------------------
 * Interview Explanation:
 * ------------------------------------------------------------------------------------------
 * I use a deque to store indexes of useful elements in decreasing order of values.
 *
 * For each new element, I remove indexes from the front if they are outside the current
 * window. Then I remove indexes from the back while their values are smaller than the
 * current value because they can never be maximum anymore.
 *
 * After the first full window is formed, the index at the front of the deque always points
 * to the maximum value for the current window.
 *
 * ------------------------------------------------------------------------------------------
 * Edge Cases:
 * ------------------------------------------------------------------------------------------
 * 1. k = 1:
 *      Every element is its own window.
 *      Answer = nums
 *
 * 2. k = nums.length:
 *      Only one window.
 *      Answer = [maximum of nums]
 *
 * 3. All increasing:
 *      nums = [1, 2, 3, 4]
 *      deque keeps removing smaller previous values.
 *
 * 4. All decreasing:
 *      nums = [4, 3, 2, 1]
 *      deque keeps all values until they expire.
 *
 * 5. Duplicate values:
 *      nums = [1, 1, 1]
 *      All windows have max 1.
 *
 ********************************************************************************************/


/********************************************************************************************
 * TEST CASES
 ********************************************************************************************/

function runTests() {
    const testCases = [
        {
            nums: [1, 3, -1, -3, 5, 3, 6, 7],
            k: 3,
            expected: [3, 3, 5, 5, 6, 7]
        },
        {
            nums: [1],
            k: 1,
            expected: [1]
        },
        {
            nums: [1, -1],
            k: 1,
            expected: [1, -1]
        },
        {
            nums: [9, 11],
            k: 2,
            expected: [11]
        },
        {
            nums: [4, 3, 2, 1],
            k: 2,
            expected: [4, 3, 2]
        },
        {
            nums: [1, 2, 3, 4],
            k: 2,
            expected: [2, 3, 4]
        },
        {
            nums: [1, 1, 1],
            k: 2,
            expected: [1, 1]
        },
        {
            nums: [7, 2, 4],
            k: 2,
            expected: [7, 4]
        }
    ];

    for (const { nums, k, expected } of testCases) {
        const result = maxSlidingWindow(nums, k);

        console.log(
            `nums = [${nums}], k = ${k} | expected = [${expected}] | result = [${result}] | ${arraysAreEqual(result, expected) ? "PASS" : "FAIL"
            }`
        );
    }
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }

    return true;
}

runTests();