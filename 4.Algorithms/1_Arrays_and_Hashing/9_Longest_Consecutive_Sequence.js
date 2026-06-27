/**
 * NeetCode / LeetCode Style Problem
 * =================================
 * Problem: Longest Consecutive Sequence
 *
 * Goal:
 * Given an unsorted array of integers nums, return the length of the
 * longest consecutive elements sequence.
 *
 * A consecutive sequence means numbers follow one after another with gap 1.
 *
 * Example:
 * nums = [100, 4, 200, 1, 3, 2]
 * longest consecutive sequence = [1, 2, 3, 4]
 * answer = 4
 *
 * Important:
 * ----------
 * - Array is unsorted
 * - Numbers can be negative
 * - Duplicates may exist
 * - We only need the length, not the actual sequence
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This problem is very popular in interviews because it tests:
 * 1. HashSet usage
 * 2. Detecting sequence starts
 * 3. Avoiding unnecessary repeated work
 * 4. Moving from sorting-based thinking to linear-time thinking
 *
 * This is a classic "use a Set for O(1) lookup" problem.
 *
 * ============================================================
 * CORE IDEA
 * ============================================================
 *
 * We want the longest chain like:
 * x, x+1, x+2, x+3, ...
 *
 * A brute-force idea would repeatedly search for next numbers.
 * A better idea is sorting.
 * The optimal idea is:
 *
 * - Put all numbers into a Set
 * - Only start counting from numbers that are the START of a sequence
 * - A number is a start if (num - 1) is NOT present
 *
 * This avoids recounting the same sequence many times.
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force:
 *    For every number, keep checking whether num+1, num+2, ... exists.
 *
 * 2. Sorting:
 *    Sort the array, then count longest streak while skipping duplicates.
 *
 * 3. HashSet Optimal:
 *    Use a Set and only expand from sequence starts.
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * For each number in the array:
 * - treat it as starting point
 * - keep checking whether next number exists in the array
 * - count how long the streak is
 *
 * Example:
 * nums = [100, 4, 200, 1, 3, 2]
 *
 * For 1:
 * - check 2 exists?
 * - check 3 exists?
 * - check 4 exists?
 * => streak = 4
 *
 * Why it works:
 * -------------
 * It checks every possible sequence directly.
 *
 * Why it is slow:
 * ---------------
 * Two problems:
 * 1. Finding whether next number exists may itself take O(n)
 * 2. We repeat the same checks many times
 *
 * So this becomes expensive.
 */

function longestConsecutiveBruteForce(nums) {
    let longest = 0;

    for (let i = 0; i < nums.length; i++) {
        let currentNum = nums[i];
        let currentStreak = 1;

        while (nums.includes(currentNum + 1)) {
            currentNum += 1;
            currentStreak += 1;
        }

        longest = Math.max(longest, currentStreak);
    }

    return longest;
}

/**
 * Step-by-step explanation:
 * -------------------------
 * 1. Loop through every number
 * 2. Assume this number starts a sequence
 * 3. Check whether currentNum + 1 exists in array
 * 4. If yes, increase streak and continue
 * 5. Track the maximum streak seen so far
 *
 * Time Complexity:
 * ----------------
 * nums.includes(...) is O(n)
 * Outer loop is O(n)
 * Inner while can run many times
 *
 * Worst case: O(n^2)
 * In some loose repeated-work discussions, it can feel even worse,
 * but interview-wise O(n^2) is the right way to describe it here.
 *
 * Space Complexity:
 * -----------------
 * O(1)
 *
 * When to use:
 * ------------
 * - Good as first thought
 * - Good for understanding the problem
 * - Not good for final interview answer
 */

/**
 * ============================================================
 * SOLUTION 2: SORTING APPROACH
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * If numbers are sorted, consecutive numbers become neighbors.
 *
 * Example:
 * [100, 4, 200, 1, 3, 2]
 * sort =>
 * [1, 2, 3, 4, 100, 200]
 *
 * Then we can walk once and count streaks.
 *
 * But there is one important detail:
 * Duplicates must be skipped.
 *
 * Example:
 * [1, 2, 2, 3]
 *
 * After sorting:
 * [1, 2, 2, 3]
 *
 * If current number equals previous number:
 * - ignore it
 * - do not reset streak
 *
 * Why it works:
 * -------------
 * Sorting brings consecutive values next to each other.
 * Then a single pass can count the longest streak.
 */

function longestConsecutiveSorting(nums) {
    if (nums.length === 0) return 0;

    const sorted = [...nums].sort((a, b) => a - b);

    let longest = 1;
    let currentStreak = 1;

    for (let i = 1; i < sorted.length; i++) {
        // Skip duplicates
        if (sorted[i] === sorted[i - 1]) {
            continue;
        }

        // Consecutive number found
        if (sorted[i] === sorted[i - 1] + 1) {
            currentStreak += 1;
        } else {
            // Sequence broke
            currentStreak = 1;
        }

        longest = Math.max(longest, currentStreak);
    }

    return longest;
}

/**
 * Step-by-step explanation:
 * -------------------------
 * 1. If array is empty, return 0
 * 2. Sort the array
 * 3. Start streak at 1
 * 4. Compare each number with previous:
 *    - if duplicate: skip
 *    - if previous + 1: extend streak
 *    - otherwise: reset streak to 1
 * 5. Keep updating longest
 *
 * Dry small example:
 * ------------------
 * nums = [1, 2, 2, 3]
 * sorted = [1, 2, 2, 3]
 *
 * compare 2 with 1 => consecutive => streak = 2
 * compare 2 with 2 => duplicate => skip
 * compare 3 with 2 => consecutive => streak = 3
 *
 * answer = 3
 *
 * Time Complexity:
 * ----------------
 * Sorting takes O(n log n)
 * One pass after sorting takes O(n)
 *
 * Total: O(n log n)
 *
 * Space Complexity:
 * -----------------
 * If we copy array for sorting: O(n)
 * If language sorting implementation uses extra memory, practical answer is often O(n)
 *
 * Interview-safe answer:
 * Space: O(n) because we created a copied sorted array
 *
 * When to use:
 * ------------
 * - Very solid when O(n log n) is acceptable
 * - Easier to think about than optimal Set solution
 * - Good stepping stone before optimal answer
 */

/**
 * ============================================================
 * SOLUTION 3: HASHSET OPTIMAL SOLUTION
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Use a Set for O(1) average lookup.
 *
 * Key observation:
 * ----------------
 * We should only start counting from the beginning of a sequence.
 *
 * A number num is the START of a sequence if:
 *   num - 1 is NOT in the Set
 *
 * Example:
 * nums = [100, 4, 200, 1, 3, 2]
 * set = {100, 4, 200, 1, 3, 2}
 *
 * Sequence starts:
 * - 100 is a start (99 not present)
 * - 200 is a start (199 not present)
 * - 1 is a start (0 not present)
 * - 2 is NOT a start because 1 exists
 * - 3 is NOT a start because 2 exists
 * - 4 is NOT a start because 3 exists
 *
 * So from 1 we expand:
 * 1 -> 2 -> 3 -> 4 => length 4
 *
 * Why this is powerful:
 * ---------------------
 * Every sequence is counted exactly once.
 * We do not repeatedly recount from the middle.
 */

function longestConsecutive(nums) {
    if (nums.length === 0) return 0;

    const numSet = new Set(nums);
    let longest = 0;

    for (const num of numSet) {
        // Only start if this is the beginning of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentStreak = 1;

            while (numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }

            longest = Math.max(longest, currentStreak);
        }
    }

    return longest;
}

/**
 * ------------------------------------------------------------
 * WHY THE OPTIMAL SOLUTION WORKS
 * ------------------------------------------------------------
 *
 * Suppose we have a sequence:
 * [1, 2, 3, 4]
 *
 * If we started counting from every number:
 * - from 1 => count 4 numbers
 * - from 2 => count 3 numbers
 * - from 3 => count 2 numbers
 * - from 4 => count 1 number
 *
 * This repeats work.
 *
 * Instead, only count from true starts.
 *
 * For 1:
 * - 0 is not present => start
 *
 * For 2:
 * - 1 is present => not a start
 *
 * For 3:
 * - 2 is present => not a start
 *
 * For 4:
 * - 3 is present => not a start
 *
 * So we count the whole streak only once.
 *
 * That is why the total work becomes linear.
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Put all numbers into a Set
 *    Why?
 *    Because Set gives O(1) average lookup
 *
 * 2. Loop through each unique number in the Set
 *
 * 3. For each number, check:
 *      does num - 1 exist?
 *
 *    - If yes, this number is NOT the start
 *      skip it
 *
 *    - If no, this number IS the start
 *      begin counting forward
 *
 * 4. While num + 1 exists:
 *    keep extending the streak
 *
 * 5. Update longest answer
 *
 * 6. Return longest
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 * ------------------------------------------------------------
 *
 * Example:
 * nums = [100, 4, 200, 1, 3, 2]
 *
 * Step 1:
 * numSet = {100, 4, 200, 1, 3, 2}
 *
 * Step 2: iterate through set
 *
 * num = 100
 * - check 99 exists? No
 * => start sequence
 * - check 101 exists? No
 * streak = 1
 * longest = 1
 *
 * num = 4
 * - check 3 exists? Yes
 * => not a start
 * skip
 *
 * num = 200
 * - check 199 exists? No
 * => start sequence
 * - check 201 exists? No
 * streak = 1
 * longest = 1
 *
 * num = 1
 * - check 0 exists? No
 * => start sequence
 * - check 2 exists? Yes
 * - check 3 exists? Yes
 * - check 4 exists? Yes
 * - check 5 exists? No
 * streak = 4
 * longest = 4
 *
 * num = 3
 * - check 2 exists? Yes
 * => not a start
 *
 * num = 2
 * - check 1 exists? Yes
 * => not a start
 *
 * Final answer = 4
 */

/**
 * ------------------------------------------------------------
 * ANOTHER DRY RUN WITH DUPLICATES
 * ------------------------------------------------------------
 *
 * nums = [1, 2, 2, 3]
 *
 * numSet = {1, 2, 3}
 *
 * num = 1
 * - 0 not present => start
 * - 2 present
 * - 3 present
 * streak = 3
 *
 * num = 2
 * - 1 present => not a start
 *
 * num = 3
 * - 2 present => not a start
 *
 * answer = 3
 *
 * Notice:
 * duplicates do not hurt because Set removes duplicates.
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Let n = number of elements
 *
 * Time Complexity:
 * ----------------
 * Building Set = O(n)
 * Iterating through Set = O(n)
 * Sequence expansion across all numbers combined = O(n)
 *
 * Total = O(n)
 *
 * Why combined expansion is O(n), not O(n^2)?
 * -------------------------------------------
 * Because every number is expanded through at most once as part of some sequence.
 * We only expand from starts.
 *
 * Space Complexity:
 * -----------------
 * Set stores up to n unique numbers
 *
 * Space = O(n)
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use this solution when:
 * - interviewer asks for optimal solution
 * - input is unsorted
 * - you need O(n) time
 * - you can use extra memory
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION (SEPARATE CLEAN VERSION)
 * ============================================================
 *
 * This is the version you should present first in an interview
 * after discussing brute force and sorting.
 */

function longestConsecutiveRecommended(nums) {
    const set = new Set(nums);
    let longest = 0;

    for (const num of set) {
        if (!set.has(num - 1)) {
            let length = 1;
            let current = num;

            while (set.has(current + 1)) {
                current += 1;
                length += 1;
            }

            longest = Math.max(longest, length);
        }
    }

    return longest;
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "I use a HashSet for O(1) average lookup.
 * The important optimization is that I only start counting from numbers
 * that are the beginning of a sequence, meaning num - 1 is not present.
 *
 * Then I expand forward while num + 1 exists.
 * This ensures each sequence is counted only once, giving O(n) time."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Starting expansion from every number
 *    ------------------------------------
 *    This causes repeated work.
 *    Always check whether num - 1 exists.
 *
 * 2. Forgetting duplicates
 *    ---------------------
 *    Input may contain duplicates.
 *    Using Set automatically handles them.
 *
 * 3. Returning 1 for empty input
 *    ---------------------------
 *    If nums is empty, answer must be 0.
 *
 * 4. Using sorting and claiming O(n)
 *    -------------------------------
 *    Sorting solution is O(n log n), not O(n).
 *
 * 5. Confusing subsequence with consecutive values
 *    ---------------------------------------------
 *    This problem is about integer value adjacency,
 *    not array index adjacency.
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Empty array
 *    nums = []
 *    answer = 0
 *
 * 2. Single element
 *    nums = [5]
 *    answer = 1
 *
 * 3. Duplicates
 *    nums = [1, 2, 2, 3]
 *    answer = 3
 *
 * 4. Negative numbers
 *    nums = [-2, -1, 0, 1]
 *    answer = 4
 *
 * 5. No consecutive numbers
 *    nums = [10, 30, 50]
 *    answer = 1
 *
 * 6. Entire array is one chain
 *    nums = [5, 4, 3, 2, 1]
 *    answer = 5
 */

/**
 * ============================================================
 * REVISION-FRIENDLY NOTES
 * ============================================================
 *
 * Pattern Used:
 * -------------
 * - HashSet
 * - Sequence detection
 * - "Only start from the beginning"
 *
 * Memory Hook:
 * ------------
 * "Start only when previous is missing."
 *
 * That is the full trick.
 *
 * If num - 1 exists:
 * - current number is in the middle of a sequence
 * - skip it
 *
 * If num - 1 does NOT exist:
 * - current number is the sequence start
 * - count forward
 *
 * Another memory hook:
 * --------------------
 * "Find heads, not body parts."
 *
 * Meaning:
 * do not start from middle elements,
 * only from sequence heads.
 *
 * Interview Explanation:
 * ----------------------
 * "I store all numbers in a Set. Then for each number, I only begin
 * counting if the previous number is absent. That means this number is
 * the start of a consecutive sequence. I expand forward and update the
 * maximum streak length."
 *
 * Why Optimal:
 * ------------
 * - O(n) time
 * - O(n) space
 * - avoids sorting
 * - avoids repeated recounting
 *
 * Sorting vs Set:
 * ---------------
 * Sorting:
 * - easier idea
 * - O(n log n)
 *
 * Set:
 * - best runtime
 * - O(n)
 *
 * Good Interview Flow:
 * --------------------
 * 1. Mention brute force
 * 2. Improve with sorting
 * 3. Optimize with Set and start-detection
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        {
            input: [100, 4, 200, 1, 3, 2],
            expected: 4,
            description: "Classic example"
        },
        {
            input: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
            expected: 9,
            description: "Long chain with duplicate"
        },
        {
            input: [],
            expected: 0,
            description: "Empty array"
        },
        {
            input: [1],
            expected: 1,
            description: "Single element"
        },
        {
            input: [1, 2, 0, 1],
            expected: 3,
            description: "Duplicates present"
        },
        {
            input: [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6],
            expected: 7,
            description: "Mixed positive and negative"
        },
        {
            input: [10, 30, 50],
            expected: 1,
            description: "No consecutive numbers"
        },
        {
            input: [-2, -1, 0, 1],
            expected: 4,
            description: "Negative to positive sequence"
        }
    ];

    const methods = [
        { name: "Brute Force", fn: longestConsecutiveBruteForce },
        { name: "Sorting", fn: longestConsecutiveSorting },
        { name: "Optimal", fn: longestConsecutive },
        { name: "Recommended", fn: longestConsecutiveRecommended }
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
 * HashSet + start-of-sequence check
 *
 * Core Trick:
 * -----------
 * Only start counting from numbers where:
 *   num - 1 is NOT present
 *
 * Then extend:
 *   num, num+1, num+2, ...
 *
 * Complexity:
 * -----------
 * Brute Force: O(n^2)
 * Sorting:     O(n log n)
 * Optimal:     O(n)
 *
 * Space:
 * ------
 * Optimal uses O(n) Set space
 *
 * One-line interview summary:
 * ---------------------------
 * "I use a Set for O(1) lookup and only expand from numbers that are the
 * beginning of a sequence, meaning the previous number is missing. This
 * lets me count each sequence exactly once in linear time."
 */