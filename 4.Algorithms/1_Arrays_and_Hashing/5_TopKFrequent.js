/*
============================================================
LeetCode 347. Top K Frequent Elements
All Best Approaches + Revision-Friendly Notes
============================================================

Problem:
Given an integer array nums and an integer k,
return the k most frequent elements.

Example:
nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

------------------------------------------------------------
PATTERN:
HashMap + Heap / Bucket Sort

------------------------------------------------------------
CORE IDEA:
1. Count frequency of each number
2. Extract top k based on frequency

============================================================
*/

/*
============================================================
1) BRUTE FORCE (SORTING BY FREQUENCY)
============================================================

Idea:
- Count frequency using Map
- Convert to array
- Sort by frequency descending
- Take first k elements

Time: O(n log n)
Space: O(n)
*/

function topKFrequentSorting(nums, k) {
    const freqMap = new Map();

    // Step 1: Count frequency
    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Step 2: Sort by frequency
    const sorted = [...freqMap.entries()].sort((a, b) => b[1] - a[1]);

    // Step 3: Take top k elements
    return sorted.slice(0, k).map(entry => entry[0]);
}

/*
============================================================
2) MIN HEAP (OPTIMAL FOR LARGE DATA)
============================================================

Idea:
- Use Map for frequency
- Maintain a min heap of size k
- Keep only top k frequent elements

Time: O(n log k)
Space: O(n)

Note:
JS doesn’t have built-in heap → simulate using sorting or library
Below is simplified version using array (conceptual)
*/

function topKFrequentHeap(nums, k) {
    const freqMap = new Map();

    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    const heap = [];

    for (let [num, freq] of freqMap.entries()) {
        heap.push([num, freq]);

        // Maintain size k
        heap.sort((a, b) => a[1] - b[1]); // min heap behavior

        if (heap.length > k) {
            heap.shift(); // remove smallest
        }
    }

    return heap.map(item => item[0]);
}

/*
============================================================
3) BUCKET SORT (BEST OVERALL)
============================================================

Idea:
- Frequency range is limited (0 to n)
- Create buckets where index = frequency
- Place numbers in corresponding bucket
- Traverse from high frequency to low

Time: O(n)
Space: O(n)

This is the BEST solution for interviews.
*/

function topKFrequentBucket(nums, k) {
    const freqMap = new Map();

    // Step 1: Count frequency
    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Step 2: Create buckets
    const buckets = Array(nums.length + 1).fill().map(() => []);

    for (let [num, freq] of freqMap.entries()) {
        buckets[freq].push(num);
    }

    // Step 3: Collect top k
    const result = [];

    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        for (let num of buckets[i]) {
            result.push(num);
            if (result.length === k) break;
        }
    }

    return result;
}

/*
============================================================
4) MAIN RECOMMENDED FUNCTION
============================================================
*/

function topKFrequent(nums, k) {
    const freqMap = new Map();

    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    const buckets = Array(nums.length + 1).fill().map(() => []);

    for (let [num, freq] of freqMap.entries()) {
        buckets[freq].push(num);
    }

    const result = [];

    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }

    return result.slice(0, k);
}

/*
============================================================
DRY RUN (DIAGRAM STYLE)
============================================================

nums = [1,1,1,2,2,3], k = 2

Step 1: Frequency Map
1 → 3
2 → 2
3 → 1

Step 2: Buckets
index = frequency

bucket[1] = [3]
bucket[2] = [2]
bucket[3] = [1]

Step 3: Traverse from end

i=3 → [1] → result = [1]
i=2 → [2] → result = [1,2] → stop

------------------------------------------------------------
VISUAL:

freqMap:
{1:3, 2:2, 3:1}

buckets:
index:   0   1    2    3
        []  [3]  [2]  [1]

Traverse ↑ from right
→ pick 1, then 2

============================================================
*/

/*
============================================================
COMPLEXITY
============================================================

Sorting:
Time: O(n log n)

Heap:
Time: O(n log k)

Bucket:
Time: O(n)  ← BEST

Space: O(n)

============================================================
*/

/*
============================================================
REVISION HOOK (IMPORTANT)
============================================================

"Count → Bucket → Reverse traverse → Top k"

OR

"Frequency → Buckets → Highest first"

============================================================
*/

/*
============================================================
TEST CASES
============================================================
*/

const testCases = [
    { nums: [1, 1, 1, 2, 2, 3], k: 2 },
    { nums: [1], k: 1 },
    { nums: [4, 4, 4, 6, 6, 2], k: 2 }
];

for (let { nums, k } of testCases) {
    console.log("Input:", nums, "k:", k);
    console.log("Sorting:", topKFrequentSorting(nums, k));
    console.log("Heap:", topKFrequentHeap(nums, k));
    console.log("Bucket:", topKFrequentBucket(nums, k));
    console.log("Recommended:", topKFrequent(nums, k));
    console.log("--------------------------------------------------");
}