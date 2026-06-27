/**
 * NeetCode / LeetCode Style Problem
 * =================================
 * Problem: 3Sum
 *
 * Goal:
 * Given an integer array nums, return all the unique triplets [nums[i], nums[j], nums[k]]
 * such that:
 *
 *   i != j, i != k, j != k
 *   nums[i] + nums[j] + nums[k] === 0
 *
 * The solution set must NOT contain duplicate triplets.
 *
 * ------------------------------------------------------------
 * EXAMPLES
 * ------------------------------------------------------------
 * Input:  nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 *
 * Input:  nums = [0,1,1]
 * Output: []
 *
 * Input:  nums = [0,0,0]
 * Output: [[0,0,0]]
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is a VERY IMPORTANT interview problem.
 *
 * It teaches:
 * 1. Sorting + Two Pointers pattern
 * 2. Handling duplicates carefully
 * 3. Extending Two Sum → 3Sum
 * 4. Reducing time complexity from O(n^3) to O(n^2)
 *
 * This problem is the base for:
 * - 4Sum
 * - kSum
 * - Closest sum problems
 *
 * ============================================================
 * CORE IDEA
 * ============================================================
 *
 * Fix one number → reduce problem to Two Sum
 *
 * For each index i:
 * - find pairs (j, k) such that:
 *     nums[j] + nums[k] = -nums[i]
 *
 * This transforms 3Sum into multiple Two Sum problems.
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force (3 nested loops)
 * 2. Sorting + HashSet
 * 3. Sorting + Two Pointers (Optimal)
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE (TRIPLE LOOP)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Try every triplet (i, j, k).
 *
 * Check if:
 * nums[i] + nums[j] + nums[k] === 0
 *
 * Why it works:
 * -------------
 * Checks all possible combinations.
 *
 * Why it is slow:
 * ---------------
 * O(n^3) time → too slow for large inputs.
 */

function threeSumBruteForce(nums) {
    const result = new Set();

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 0) {
                    const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
                    result.add(triplet.join(","));
                }
            }
        }
    }

    return Array.from(result).map(str => str.split(",").map(Number));
}

/**
 * Time Complexity:
 * ----------------
 * O(n^3)
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * When to use:
 * ------------
 * Only for explanation, not for interview final answer
 */

/**
 * ============================================================
 * SOLUTION 2: SORTING + HASHSET (BETTER)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Sort array.
 *
 * Fix i, then use a Set to find complements:
 *   needed = -nums[i] - nums[j]
 *
 * Why it works:
 * -------------
 * Converts inner part into Two Sum using a Set.
 */

function threeSumHashSet(nums) {
    nums.sort((a, b) => a - b);
    const result = new Set();

    for (let i = 0; i < nums.length; i++) {
        const seen = new Set();

        for (let j = i + 1; j < nums.length; j++) {
            const complement = -nums[i] - nums[j];

            if (seen.has(complement)) {
                const triplet = [nums[i], nums[j], complement].sort((a, b) => a - b);
                result.add(triplet.join(","));
            }

            seen.add(nums[j]);
        }
    }

    return Array.from(result).map(str => str.split(",").map(Number));
}

/**
 * Time Complexity:
 * ----------------
 * O(n^2)
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * When to use:
 * ------------
 * Good intermediate solution
 */

/**
 * ============================================================
 * SOLUTION 3: SORTING + TWO POINTERS (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * 1. Sort the array
 * 2. Fix index i
 * 3. Use two pointers (left, right)
 *
 * left = i + 1
 * right = n - 1
 *
 * While left < right:
 *   sum = nums[i] + nums[left] + nums[right]
 *
 * If sum === 0 → valid triplet
 * If sum < 0 → move left++
 * If sum > 0 → move right--
 *
 * IMPORTANT:
 * ----------
 * Skip duplicates to avoid repeated triplets.
 */

function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        // Skip duplicate values for i
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates for left
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }

                // Skip duplicates for right
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

/**
 * ------------------------------------------------------------
 * WHY THIS WORKS
 * ------------------------------------------------------------
 *
 * Sorting allows:
 * - efficient duplicate handling
 * - two pointer technique
 *
 * Two pointer logic:
 *
 * If sum is too small → increase left → bigger value
 * If sum is too big   → decrease right → smaller value
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * nums = [-1,0,1,2,-1,-4]
 *
 * After sorting:
 * [-4,-1,-1,0,1,2]
 *
 * i = 0 → nums[i] = -4
 * find pairs → none
 *
 * i = 1 → nums[i] = -1
 * left = 2, right = 5
 *
 * sum = -1 + (-1) + 2 = 0 → add [-1,-1,2]
 *
 * move pointers skipping duplicates
 *
 * next:
 * sum = -1 + 0 + 1 = 0 → add [-1,0,1]
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAM
 * ------------------------------------------------------------
 *
 * nums = [-4,-1,-1,0,1,2]
 *
 * Fix i = -1
 *
 * [-1, -1, 0, 1, 2]
 *      ^        ^
 *    left     right
 *
 * Move pointers inward depending on sum
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Time Complexity:
 * ----------------
 * Sorting: O(n log n)
 * Two-pointer scan: O(n^2)
 *
 * Total: O(n^2)
 *
 * Space Complexity:
 * -----------------
 * O(1) extra (excluding output)
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use this when:
 * - array problems involve sums
 * - duplicates must be handled
 * - sorted + two pointer is possible
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION
 * ============================================================
 */

function threeSumRecommended(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "I sort the array, then fix one element and use two pointers
 * to find pairs that sum to the negative of that element.
 * I skip duplicates to avoid repeating triplets.
 * This gives O(n^2) time complexity."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Not sorting the array
 * 2. Forgetting to skip duplicates
 * 3. Using Set unnecessarily in optimal solution
 * 4. Not moving pointers correctly
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Empty array → []
 * 2. Less than 3 elements → []
 * 3. All zeros → [[0,0,0]]
 * 4. No valid triplets → []
 */

/**
 * ============================================================
 * REVISION NOTES
 * ============================================================
 *
 * Pattern:
 * --------
 * Sorting + Two Pointers
 *
 * Memory Hook:
 * ------------
 * "Fix one, solve Two Sum"
 *
 * Key Trick:
 * ----------
 * Skip duplicates carefully
 *
 * Interview Flow:
 * ---------------
 * Brute → HashSet → Two Pointers
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        { nums: [-1, 0, 1, 2, -1, -4] },
        { nums: [0, 1, 1] },
        { nums: [0, 0, 0] },
        { nums: [-2, 0, 1, 1, 2] }
    ];

    const methods = [
        { name: "Brute", fn: threeSumBruteForce },
        { name: "HashSet", fn: threeSumHashSet },
        { name: "Optimal", fn: threeSum },
        { name: "Recommended", fn: threeSumRecommended }
    ];

    for (const test of testCases) {
        console.log("=======================================");
        console.log("Input:", test.nums);

        for (const method of methods) {
            console.log(method.name, "=>", method.fn([...test.nums]));
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
 * Sorting + Two Pointers
 *
 * Core Idea:
 * ----------
 * Fix one element → solve Two Sum
 *
 * Complexity:
 * -----------
 * Time: O(n^2)
 * Space: O(1)
 *
 * One-line:
 * ---------
 * "Sort the array, fix one number, and use two pointers to find pairs."
 */