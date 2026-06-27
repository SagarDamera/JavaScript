/**
 * LeetCode 1. Two Sum
 * =================================
 *
 * Problem:
 * Given an array of integers nums and an integer target,
 * return indices of the two numbers such that they add up to target.
 *
 * You may assume:
 * - exactly one solution exists
 * - you may not use the same element twice
 *
 * Return the answer in any order.
 *
 * ------------------------------------------------------------
 * EXAMPLES
 * ------------------------------------------------------------
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 *
 * Input: nums = [3,2,4], target = 6
 * Output: [1,2]
 *
 * Input: nums = [3,3], target = 6
 * Output: [0,1]
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is one of the MOST IMPORTANT interview problems.
 *
 * It teaches:
 * 1. Brute force thinking
 * 2. HashMap optimization
 * 3. Complement pattern (VERY IMPORTANT)
 *
 * This problem appears in many variations:
 * - 3Sum
 * - 4Sum
 * - Subarray Sum
 * - Pair problems
 *
 * ============================================================
 * CORE IDEA (VERY IMPORTANT)
 * ============================================================
 *
 * Instead of asking:
 * "Which two numbers add to target?"
 *
 * Ask:
 * "For each number x, what number do I need?"
 *
 * needed = target - x
 *
 * This is called the **complement pattern**
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force (Nested loop)
 * 2. Sorting + Two pointers
 * 3. HashMap (Optimal)
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE (NESTED LOOP)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Try every pair of numbers.
 *
 * For each i:
 *   check all j > i
 *   if nums[i] + nums[j] === target
 *   return [i, j]
 *
 * Why it works:
 * -------------
 * We check all possible pairs, so we won't miss the answer.
 *
 * Why it's slow:
 * --------------
 * Number of pairs = O(n^2)
 */

function twoSumBruteForce(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}

/**
 * Step-by-step:
 * -------------
 * nums = [2,7,11,15], target = 9
 *
 * i = 0 → nums[i] = 2
 *   j = 1 → 2 + 7 = 9 → match
 * return [0,1]
 *
 * Time Complexity:
 * ----------------
 * O(n^2)
 *
 * Space Complexity:
 * -----------------
 * O(1)
 *
 * When to use:
 * ------------
 * - First approach to explain in interview
 * - Not optimal
 */

/**
 * ============================================================
 * SOLUTION 2: SORTING + TWO POINTERS
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * 1. Sort the array
 * 2. Use two pointers:
 *    - left at start
 *    - right at end
 *
 * Move pointers:
 * - if sum < target → move left
 * - if sum > target → move right
 * - if sum === target → found pair
 *
 * Problem:
 * --------
 * Sorting loses original indices.
 * So we must store value + index.
 */

function twoSumSorting(nums, target) {
    const arr = nums.map((num, index) => [num, index]);

    arr.sort((a, b) => a[0] - b[0]);

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const sum = arr[left][0] + arr[right][0];

        if (sum === target) {
            return [arr[left][1], arr[right][1]];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}

/**
 * Step-by-step:
 * -------------
 * nums = [2,7,11,15], target = 9
 *
 * After mapping:
 * [[2,0], [7,1], [11,2], [15,3]]
 *
 * left = 0, right = 3
 * sum = 2 + 15 = 17 → too big → right--
 *
 * left = 0, right = 2
 * sum = 2 + 11 = 13 → too big → right--
 *
 * left = 0, right = 1
 * sum = 2 + 7 = 9 → match
 *
 * return [0,1]
 *
 * Time Complexity:
 * ----------------
 * Sorting: O(n log n)
 * Two pointer scan: O(n)
 *
 * Total: O(n log n)
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * When to use:
 * ------------
 * - Good when sorted structure helps
 * - Not optimal for this problem specifically
 */

/**
 * ============================================================
 * SOLUTION 3: HASHMAP (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Use a HashMap to store:
 * value → index
 *
 * For each number:
 * - compute complement = target - num
 * - check if complement already exists in map
 * - if yes → return indices
 * - if no → store current number
 *
 * This avoids nested loops.
 */

function twoSum(nums, target) {
    const map = {}; // value → index

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map[complement] !== undefined) {
            return [map[complement], i];
        }

        map[nums[i]] = i;
    }
}

/**
 * ------------------------------------------------------------
 * WHY THIS WORKS
 * ------------------------------------------------------------
 *
 * nums = [2,7,11,15], target = 9
 *
 * Step 1:
 * i = 0 → num = 2
 * complement = 7
 * map = {}
 * → not found → store 2
 *
 * map = {2:0}
 *
 * Step 2:
 * i = 1 → num = 7
 * complement = 2
 * map has 2 → yes
 *
 * return [0,1]
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Create empty map
 * 2. Loop through array
 * 3. For each number:
 *    - calculate complement = target - current
 *    - if complement exists in map → return indices
 *    - otherwise store current number with index
 *
 * Key insight:
 * ------------
 * We check BEFORE inserting current element,
 * so we don't use the same element twice.
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAM
 * ------------------------------------------------------------
 *
 * nums = [3,2,4], target = 6
 *
 * i=0 → num=3
 * complement=3
 * map={}
 * → store 3
 * map={3:0}
 *
 * i=1 → num=2
 * complement=4
 * map={3:0}
 * → store 2
 * map={3:0,2:1}
 *
 * i=2 → num=4
 * complement=2
 * map has 2 → yes
 *
 * return [1,2]
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Time Complexity:
 * ----------------
 * O(n)
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * Reason:
 * Map stores up to n elements.
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use this when:
 * - need best performance
 * - order doesn't matter
 * - want clean logic
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION
 * ============================================================
 */

function twoSumRecommended(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "Instead of checking all pairs, I use a HashMap.
 * For each number, I compute the complement needed to reach target.
 * If that complement already exists in the map, I return the indices.
 * Otherwise I store the current number."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Adding element before checking complement
 *    → may use same index twice
 *
 * 2. Forgetting duplicates case
 *    nums = [3,3]
 *
 * 3. Using sorting without tracking indices
 *
 * 4. Returning values instead of indices
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. nums = [3,3], target = 6
 *    → return [0,1]
 *
 * 2. Negative numbers
 *    nums = [-1,-2,-3,-4,-5], target = -8
 *
 * 3. Only one valid solution guaranteed
 *
 * 4. Large input → use O(n) solution
 */

/**
 * ============================================================
 * REVISION NOTES
 * ============================================================
 *
 * Pattern:
 * --------
 * HashMap + Complement
 *
 * Memory Hook:
 * ------------
 * "What do I need?"
 *
 * For each num:
 * needed = target - num
 *
 * Interview Flow:
 * ---------------
 * Brute Force → Sorting → HashMap
 *
 * Key Insight:
 * ------------
 * Check complement BEFORE inserting current value
 *
 * Best Solution:
 * --------------
 * HashMap
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { nums: [3, 2, 4], target: 6, expected: [1, 2] },
        { nums: [3, 3], target: 6, expected: [0, 1] },
        { nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4] }
    ];

    const methods = [
        { name: "Brute Force", fn: twoSumBruteForce },
        { name: "Sorting", fn: twoSumSorting },
        { name: "HashMap", fn: twoSum },
        { name: "Recommended", fn: twoSumRecommended }
    ];

    for (const test of testCases) {
        console.log("=======================================");
        console.log(`nums = ${JSON.stringify(test.nums)}, target = ${test.target}`);
        console.log(`Expected: ${JSON.stringify(test.expected)}`);

        for (const method of methods) {
            const result = method.fn(test.nums, test.target);
            console.log(`${method.name.padEnd(12)} => ${JSON.stringify(result)}`);
        }
    }
}

runTests();

/**
 * ============================================================
 * FINAL QUICK REVISION
 * ============================================================
 *
 * Best Solution:
 * --------------
 * HashMap
 *
 * Core Idea:
 * ----------
 * complement = target - num
 *
 * Complexity:
 * -----------
 * Time: O(n)
 * Space: O(n)
 *
 * One-line:
 * ---------
 * "For each number, check if its complement has already been seen."
 */