/**
 * NeetCode / LeetCode Style Problem
 * =================================
 * Problem: Two Sum II - Input Array Is Sorted
 *
 * Goal:
 * Given a 1-indexed array of integers numbers that is sorted in non-decreasing order,
 * find two numbers such that they add up to a specific target number.
 *
 * Return the indices of the two numbers (1-based index).
 *
 * Constraints:
 * - Exactly one solution exists
 * - Cannot use the same element twice
 * - Must use constant extra space (important hint)
 *
 * ------------------------------------------------------------
 * EXAMPLES
 * ------------------------------------------------------------
 * Input: numbers = [2,7,11,15], target = 9
 * Output: [1,2]
 *
 * Input: numbers = [2,3,4], target = 6
 * Output: [1,3]
 *
 * Input: numbers = [-1,0], target = -1
 * Output: [1,2]
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is a direct extension of:
 * → Two Sum (LeetCode 1)
 *
 * But here:
 * - array is SORTED
 * - we must use O(1) extra space
 *
 * This unlocks:
 * → Two Pointer technique (VERY IMPORTANT)
 *
 * ============================================================
 * CORE IDEA
 * ============================================================
 *
 * Since array is sorted:
 *
 * If sum is too small → move left pointer right
 * If sum is too big   → move right pointer left
 *
 * This is the key optimization.
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force
 * 2. Binary Search
 * 3. Two Pointers (Optimal)
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE
 * ============================================================
 *
 * Approach:
 * ---------
 * Try all pairs (i, j)
 */

function twoSumIIBruteForce(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === target) {
                return [i + 1, j + 1]; // 1-based index
            }
        }
    }
}

/**
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
 * Only for initial explanation
 */

/**
 * ============================================================
 * SOLUTION 2: BINARY SEARCH
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * For each element numbers[i]:
 * - find (target - numbers[i]) using binary search
 *
 * Why it works:
 * -------------
 * Array is sorted → binary search works
 */

function twoSumIIBinarySearch(numbers, target) {
    const binarySearch = (arr, start, target) => {
        let left = start;
        let right = arr.length - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (arr[mid] === target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }

        return -1;
    };

    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        const index = binarySearch(numbers, i + 1, complement);

        if (index !== -1) {
            return [i + 1, index + 1];
        }
    }
}

/**
 * Time Complexity:
 * ----------------
 * O(n log n)
 *
 * Space Complexity:
 * -----------------
 * O(1)
 *
 * When to use:
 * ------------
 * Good intermediate solution
 */

/**
 * ============================================================
 * SOLUTION 3: TWO POINTERS (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Use two pointers:
 * left = 0
 * right = n - 1
 *
 * While left < right:
 * - sum = numbers[left] + numbers[right]
 *
 * If sum == target → return result
 * If sum < target → move left++
 * If sum > target → move right--
 *
 * Why it works:
 * -------------
 * Because array is sorted.
 */

function twoSumII(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1]; // 1-based index
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}

/**
 * ------------------------------------------------------------
 * WHY THIS WORKS
 * ------------------------------------------------------------
 *
 * Sorted array property:
 *
 * numbers[left] <= numbers[left+1]
 * numbers[right] >= numbers[right-1]
 *
 * If sum is too small:
 * → increase left → bigger sum
 *
 * If sum is too big:
 * → decrease right → smaller sum
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * numbers = [2,7,11,15], target = 9
 *
 * left = 0 (2)
 * right = 3 (15)
 * sum = 17 → too big → right--
 *
 * left = 0 (2)
 * right = 2 (11)
 * sum = 13 → too big → right--
 *
 * left = 0 (2)
 * right = 1 (7)
 * sum = 9 → match
 *
 * return [1,2]
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAM
 * ------------------------------------------------------------
 *
 * numbers = [2,3,4], target = 6
 *
 * left → 2
 * right → 4
 *
 * sum = 6 → return [1,3]
 *
 * Visual:
 *
 * [2, 3, 4]
 *  ^     ^
 * left  right
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
 * O(1)
 *
 * No extra data structures used.
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use this when:
 * - array is sorted
 * - need O(1) space
 * - need O(n) time
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION
 * ============================================================
 */

function twoSumIIRecommended(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "Since the array is sorted, I use two pointers.
 * If the sum is too small, I move the left pointer right.
 * If the sum is too large, I move the right pointer left.
 * This guarantees finding the pair in O(n) time and O(1) space."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Returning 0-based index instead of 1-based
 * 2. Using HashMap (not needed and violates O(1) space)
 * 3. Not using sorted property
 * 4. Moving both pointers incorrectly
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Only two elements
 * 2. Negative numbers
 * 3. Large numbers
 * 4. Target formed by first and last elements
 */

/**
 * ============================================================
 * REVISION NOTES
 * ============================================================
 *
 * Pattern:
 * --------
 * Two Pointers (Sorted Array)
 *
 * Memory Hook:
 * ------------
 * "Sorted → Two pointers"
 *
 * Rule:
 * -----
 * sum < target → left++
 * sum > target → right--
 *
 * Interview Flow:
 * ---------------
 * Brute → Binary Search → Two Pointers
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        { nums: [2, 7, 11, 15], target: 9, expected: [1, 2] },
        { nums: [2, 3, 4], target: 6, expected: [1, 3] },
        { nums: [-1, 0], target: -1, expected: [1, 2] },
        { nums: [1, 2, 3, 4, 4, 9], target: 8, expected: [4, 5] }
    ];

    const methods = [
        { name: "Brute", fn: twoSumIIBruteForce },
        { name: "Binary", fn: twoSumIIBinarySearch },
        { name: "Optimal", fn: twoSumII },
        { name: "Recommended", fn: twoSumIIRecommended }
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
 * Two Pointers
 *
 * Core Idea:
 * ----------
 * Use sorted property to adjust pointers
 *
 * Complexity:
 * -----------
 * Time: O(n)
 * Space: O(1)
 *
 * One-line:
 * ---------
 * "Since array is sorted, use two pointers to find pair in linear time."
 */