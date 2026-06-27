/**
 * LeetCode 217. Contains Duplicate
 * =================================
 *
 * Problem:
 * Given an integer array nums, return true if any value appears at least twice in the array,
 * and return false if every element is distinct.
 *
 * ------------------------------------------------------------
 * EXAMPLE
 * ------------------------------------------------------------
 * Input:  nums = [1,2,3,1]
 * Output: true
 *
 * Input:  nums = [1,2,3,4]
 * Output: false
 *
 * Input:  nums = [1,1,1,3,3,4,3,2,4,2]
 * Output: true
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is one of the most important beginner interview problems.
 *
 * It teaches:
 * 1. Brute force comparison
 * 2. Sorting-based duplicate detection
 * 3. HashSet / Set usage
 * 4. How to optimize lookup from O(n) to O(1) average
 *
 * This is also a foundation problem for many other patterns:
 * - frequency counting
 * - visited tracking
 * - sliding window duplicate checks
 * - hashing-based optimizations
 *
 * ============================================================
 * PROBLEM UNDERSTANDING
 * ============================================================
 *
 * We need to answer one simple question:
 *
 * "Does any number appear more than once?"
 *
 * If yes -> return true
 * If no  -> return false
 *
 * We do NOT need:
 * - the duplicate value itself
 * - the count of duplicates
 * - the index positions
 *
 * We only need a boolean answer.
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force Nested Loop
 * 2. Sorting
 * 3. HashSet / Set (Optimal)
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE (NESTED LOOP)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Compare every element with every other element after it.
 *
 * If any two elements are equal, then a duplicate exists.
 *
 * Example:
 * nums = [1,2,3,1]
 *
 * Compare:
 * - 1 with 2, 3, 1 -> match found
 * return true
 *
 * Why it works:
 * -------------
 * If a duplicate exists, then at least one pair of indices (i, j)
 * will have nums[i] === nums[j].
 *
 * By checking all pairs, we cannot miss any duplicate.
 *
 * Why it is slow:
 * ---------------
 * Because for each element, we may compare with many remaining elements.
 * That gives quadratic time complexity.
 */

function containsDuplicateBruteForce(nums) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === nums[j]) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Step-by-step explanation:
 * -------------------------
 * 1. Start with first element
 * 2. Compare it with every element after it
 * 3. If equal, return true immediately
 * 4. Move to next element and repeat
 * 5. If all comparisons finish with no match, return false
 *
 * Dry run:
 * --------
 * nums = [1,2,3,1]
 *
 * i = 0 -> nums[i] = 1
 *   j = 1 -> 1 === 2 ? no
 *   j = 2 -> 1 === 3 ? no
 *   j = 3 -> 1 === 1 ? yes
 * return true
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
 * - Good as first thought in interview
 * - Good when showing basic reasoning
 * - Not good when input size is large
 */

/**
 * ============================================================
 * SOLUTION 2: SORTING APPROACH
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * If we sort the array, duplicate values will become neighbors.
 *
 * Example:
 * nums = [3,1,4,1]
 * sorted = [1,1,3,4]
 *
 * Now we only need to check adjacent elements.
 *
 * Why it works:
 * -------------
 * In sorted order, all equal values are grouped together.
 * So if a duplicate exists, at least one adjacent pair will be equal.
 */

function containsDuplicateSorting(nums) {
    const sorted = [...nums].sort((a, b) => a - b);

    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === sorted[i - 1]) {
            return true;
        }
    }

    return false;
}

/**
 * Step-by-step explanation:
 * -------------------------
 * 1. Make a copy of the array and sort it
 * 2. Loop from index 1 to end
 * 3. Compare current value with previous value
 * 4. If equal, duplicate exists -> return true
 * 5. If loop ends, return false
 *
 * Dry run:
 * --------
 * nums = [1,2,3,1]
 * sorted = [1,1,2,3]
 *
 * i = 1 -> sorted[1] = 1, sorted[0] = 1
 * equal -> return true
 *
 * Why sorting helps:
 * ------------------
 * Without sorting:
 * [1,2,3,1]
 * duplicate values are far apart
 *
 * With sorting:
 * [1,1,2,3]
 * duplicate values are next to each other
 *
 * Time Complexity:
 * ----------------
 * Sorting takes O(n log n)
 * Scan takes O(n)
 *
 * Total: O(n log n)
 *
 * Space Complexity:
 * -----------------
 * O(n) here because we created a copied array using [...nums]
 *
 * Note:
 * -----
 * If sorting in place is allowed, extra space may be smaller depending
 * on implementation, but interview-safe answer for this code is O(n).
 *
 * When to use:
 * ------------
 * - Good when modifying order is acceptable
 * - Good intermediate improvement over brute force
 * - Not the best if we want linear time
 */

/**
 * ============================================================
 * SOLUTION 3: HASHSET / SET (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Use a Set to track values we have already seen.
 *
 * While scanning the array:
 * - if current value is already in the Set -> duplicate found
 * - otherwise add it to the Set
 *
 * Why it works:
 * -------------
 * A Set stores unique values only.
 * So if we see a value that is already in the Set,
 * that means the value appeared earlier in the array.
 *
 * This gives very fast lookup on average: O(1).
 */

function containsDuplicate(nums) {
    const seen = new Set();

    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }

        seen.add(num);
    }

    return false;
}

/**
 * ------------------------------------------------------------
 * WHY THE OPTIMAL SOLUTION WORKS
 * ------------------------------------------------------------
 *
 * We process numbers one by one.
 *
 * Suppose nums = [1,2,3,1]
 *
 * seen = {}
 *
 * read 1:
 * - is 1 in seen? no
 * - add 1
 *
 * seen = {1}
 *
 * read 2:
 * - is 2 in seen? no
 * - add 2
 *
 * seen = {1,2}
 *
 * read 3:
 * - is 3 in seen? no
 * - add 3
 *
 * seen = {1,2,3}
 *
 * read 1:
 * - is 1 in seen? yes
 * - duplicate found -> return true
 *
 * Since Set lookup is O(1) average, this becomes linear time overall.
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Create an empty Set called seen
 * 2. Traverse each number in nums
 * 3. For each number:
 *    - if seen already contains it, return true
 *    - else add it to seen
 * 4. If loop finishes, return false
 *
 * This is a classic "visited before?" pattern.
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 * ------------------------------------------------------------
 *
 * Example:
 * nums = [4, 1, 5, 2, 1]
 *
 * Start:
 * seen = {}
 *
 * Read 4:
 * - has 4? no
 * - add 4
 * seen = {4}
 *
 * Read 1:
 * - has 1? no
 * - add 1
 * seen = {4,1}
 *
 * Read 5:
 * - has 5? no
 * - add 5
 * seen = {4,1,5}
 *
 * Read 2:
 * - has 2? no
 * - add 2
 * seen = {4,1,5,2}
 *
 * Read 1:
 * - has 1? yes
 * return true
 *
 * ------------------------------------------------------------
 * VISUAL IDEA
 * ------------------------------------------------------------
 *
 * nums:   [4, 1, 5, 2, 1]
 * seen:    ^
 *
 * Step 1 -> seen = {4}
 * Step 2 -> seen = {4,1}
 * Step 3 -> seen = {4,1,5}
 * Step 4 -> seen = {4,1,5,2}
 * Step 5 -> 1 already exists -> duplicate
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Let n = nums.length
 *
 * Time Complexity:
 * ----------------
 * O(n)
 *
 * Reason:
 * We scan the array once, and Set lookup/add is O(1) average.
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * Reason:
 * In the worst case, all elements are unique,
 * so the Set stores all n elements.
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use this when:
 * - you want the best common interview solution
 * - extra memory is allowed
 * - you need fast duplicate detection
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION (SEPARATE CLEAN VERSION)
 * ============================================================
 *
 * This is the version you should present first in interview
 * after briefly mentioning brute force and sorting.
 */

function containsDuplicateRecommended(nums) {
    const set = new Set();

    for (const num of nums) {
        if (set.has(num)) {
            return true;
        }
        set.add(num);
    }

    return false;
}

/**
 * ============================================================
 * ALTERNATIVE SHORT OPTIMAL VERSION
 * ============================================================
 *
 * Another very common one-liner style:
 * If Set size is smaller than array length,
 * duplicates must exist.
 */

function containsDuplicateSetSize(nums) {
    return new Set(nums).size !== nums.length;
}

/**
 * Why this works:
 * ---------------
 * A Set removes duplicates automatically.
 *
 * Example:
 * nums = [1,2,3,1]
 * new Set(nums) = {1,2,3}
 * size = 3
 * nums.length = 4
 *
 * Since 3 !== 4, duplicate exists.
 *
 * Time Complexity:
 * ----------------
 * O(n)
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * When to use:
 * ------------
 * - Very clean and short
 * - Great when only boolean answer is needed
 * - In interview, still explain the logic clearly
 */

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "The brute force solution is to compare every pair, which is O(n^2).
 * A better solution is sorting, which makes duplicates adjacent and takes O(n log n).
 * The optimal solution uses a Set.
 *
 * I scan the array once, and for each number I check whether it has already
 * been seen. If yes, I return true immediately. Otherwise I add it to the Set.
 * If the loop finishes, all elements are distinct, so I return false."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Forgetting that we only need true/false
 *    ---------------------------------------
 *    We do not need duplicate count or duplicate value.
 *
 * 2. Using an object/map when a Set is enough
 *    ----------------------------------------
 *    Since we only care whether value has appeared before,
 *    Set is simpler.
 *
 * 3. Confusing Set with sorted order
 *    -------------------------------
 *    Set does not sort values. It only stores unique ones.
 *
 * 4. Forgetting negative numbers or zero
 *    -----------------------------------
 *    Set handles all integer values fine.
 *
 * 5. Sorting the original array by mistake
 *    -------------------------------------
 *    If the caller expects original order preserved,
 *    use a copied array: [...nums]
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Empty array
 *    nums = []
 *    answer = false
 *    Reason: no values, so no duplicates
 *
 * 2. Single element
 *    nums = [5]
 *    answer = false
 *
 * 3. All unique
 *    nums = [1,2,3,4]
 *    answer = false
 *
 * 4. Duplicate exists
 *    nums = [1,2,3,1]
 *    answer = true
 *
 * 5. Multiple duplicates
 *    nums = [1,1,2,2,3]
 *    answer = true
 *
 * 6. Negative values
 *    nums = [-1,-2,-3,-1]
 *    answer = true
 *
 * 7. Zero values
 *    nums = [0,1,2,0]
 *    answer = true
 */

/**
 * ============================================================
 * REVISION-FRIENDLY NOTES
 * ============================================================
 *
 * Pattern Used:
 * -------------
 * - Hashing
 * - Set / seen-values tracking
 *
 * Memory Hook:
 * ------------
 * "Seen before?"
 *
 * That is the whole pattern.
 *
 * For each number:
 * - if already seen -> duplicate
 * - else mark seen
 *
 * Another memory hook:
 * --------------------
 * "Set = unique box"
 *
 * If number is already inside the unique box,
 * then it is a duplicate.
 *
 * Interview Explanation:
 * ----------------------
 * "I use a Set to track visited numbers. As I iterate through the array,
 * I check if the number is already in the Set. If it is, I return true.
 * Otherwise I add it. This gives O(n) time and O(n) space."
 *
 * Brute Force vs Sorting vs Set:
 * ------------------------------
 * Brute Force: O(n^2), O(1)
 * Sorting:     O(n log n), O(n) for copied sort
 * Set:         O(n), O(n)
 *
 * Best Solution:
 * --------------
 * Set approach
 *
 * Why?
 * ----
 * Because it gives linear time and is very easy to explain.
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        {
            input: [1, 2, 3, 1],
            expected: true,
            description: "Simple duplicate"
        },
        {
            input: [1, 2, 3, 4],
            expected: false,
            description: "All unique"
        },
        {
            input: [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],
            expected: true,
            description: "Multiple duplicates"
        },
        {
            input: [],
            expected: false,
            description: "Empty array"
        },
        {
            input: [5],
            expected: false,
            description: "Single element"
        },
        {
            input: [-1, -2, -3, -1],
            expected: true,
            description: "Negative numbers with duplicate"
        },
        {
            input: [0, 1, 2, 0],
            expected: true,
            description: "Zero repeated"
        }
    ];

    const methods = [
        { name: "Brute Force", fn: containsDuplicateBruteForce },
        { name: "Sorting", fn: containsDuplicateSorting },
        { name: "Optimal Set", fn: containsDuplicate },
        { name: "Recommended", fn: containsDuplicateRecommended },
        { name: "Set Size", fn: containsDuplicateSetSize }
    ];

    for (const test of testCases) {
        console.log("==================================================");
        console.log(`Test: ${test.description}`);
        console.log(`Input: ${JSON.stringify(test.input)}`);
        console.log(`Expected: ${test.expected}`);

        for (const method of methods) {
            const actual = method.fn(test.input);
            console.log(`${method.name.padEnd(12)} => ${actual} | Pass: ${actual === test.expected}`);
        }
    }
}

runTests();

/**
 * ============================================================
 * FINAL QUICK REVISION SUMMARY
 * ============================================================
 *
 * Best Solution:
 * --------------
 * HashSet / Set
 *
 * Core Trick:
 * -----------
 * Track seen values.
 * If current value is already seen, duplicate exists.
 *
 * Complexity:
 * -----------
 * Brute Force: O(n^2), O(1)
 * Sorting:     O(n log n), O(n)
 * Set:         O(n), O(n)
 *
 * One-line interview summary:
 * ---------------------------
 * "I use a Set to track numbers I have already seen. If a number appears
 * again, I return true immediately; otherwise I add it to the Set. If I
 * finish scanning the array, then all elements are distinct."
 */