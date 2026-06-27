/**
 * LeetCode 242. Valid Anagram
 * =================================
 *
 * Problem:
 * Given two strings s and t, return true if t is an anagram of s,
 * and false otherwise.
 *
 * An anagram means:
 * - Both strings contain the same characters
 * - With the same frequency
 * - Order does NOT matter
 *
 * ------------------------------------------------------------
 * EXAMPLES
 * ------------------------------------------------------------
 * Input:  s = "anagram", t = "nagaram"
 * Output: true
 *
 * Input:  s = "rat", t = "car"
 * Output: false
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is a fundamental string + hashing problem.
 *
 * It teaches:
 * 1. Frequency counting
 * 2. HashMap / Object usage
 * 3. Sorting-based comparison
 * 4. Optimizing space and time
 *
 * Very common in interviews and used in many variations:
 * - Group Anagrams
 * - Sliding window problems
 * - Character frequency tracking
 *
 * ============================================================
 * PROBLEM UNDERSTANDING
 * ============================================================
 *
 * We need to check:
 *
 * "Do both strings have the same characters with the same counts?"
 *
 * Example:
 * s = "aab"
 * t = "aba"
 *
 * Count:
 * a -> 2
 * b -> 1
 *
 * Both match => valid anagram
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force (remove characters)
 * 2. Sorting
 * 3. HashMap frequency count (Optimal)
 * 4. Fixed-size array (optimized for lowercase letters)
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE (REMOVE MATCHING CHARACTERS)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Convert string t into an array.
 * For each character in s:
 * - find that character in t
 * - remove it from t
 *
 * If at the end t is empty, then it's an anagram.
 *
 * Why it works:
 * -------------
 * We try to match each character one by one.
 *
 * Why it is slow:
 * ---------------
 * Each search and removal is O(n),
 * leading to O(n^2) time.
 */

function isAnagramBruteForce(s, t) {
    if (s.length !== t.length) return false;

    let arr = t.split("");

    for (let char of s) {
        const index = arr.indexOf(char);

        if (index === -1) return false;

        arr.splice(index, 1);
    }

    return true;
}

/**
 * Step-by-step:
 * -------------
 * s = "abc", t = "bca"
 *
 * arr = ["b","c","a"]
 *
 * read 'a' -> found at index 2 -> remove
 * arr = ["b","c"]
 *
 * read 'b' -> found at index 0 -> remove
 * arr = ["c"]
 *
 * read 'c' -> found -> remove
 * arr = []
 *
 * return true
 *
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
 * Only for understanding, not for interview final answer
 */

/**
 * ============================================================
 * SOLUTION 2: SORTING APPROACH
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * If two strings are anagrams,
 * their sorted versions will be identical.
 *
 * Example:
 * s = "anagram"
 * t = "nagaram"
 *
 * sorted(s) = "aaagmnr"
 * sorted(t) = "aaagmnr"
 *
 * Why it works:
 * -------------
 * Sorting arranges characters in order,
 * so equal frequency strings become identical.
 */

function isAnagramSorting(s, t) {
    if (s.length !== t.length) return false;

    const sortedS = s.split("").sort().join("");
    const sortedT = t.split("").sort().join("");

    return sortedS === sortedT;
}

/**
 * Step-by-step:
 * -------------
 * 1. If lengths differ, return false
 * 2. Sort both strings
 * 3. Compare sorted results
 *
 * Time Complexity:
 * ----------------
 * Sorting takes O(n log n)
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * When to use:
 * ------------
 * - Simple and clean
 * - Good if n is small
 * - Not optimal when O(n) solution is expected
 */

/**
 * ============================================================
 * SOLUTION 3: HASHMAP FREQUENCY COUNT (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Count frequency of characters in s.
 * Then subtract frequency using t.
 *
 * If all counts return to zero, it's an anagram.
 *
 * Why it works:
 * -------------
 * Anagrams must have identical frequency distribution.
 */

function isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const map = {};

    // Count characters in s
    for (let char of s) {
        map[char] = (map[char] || 0) + 1;
    }

    // Subtract using t
    for (let char of t) {
        if (!map[char]) return false;
        map[char]--;
    }

    return true;
}

/**
 * ------------------------------------------------------------
 * WHY THIS WORKS
 * ------------------------------------------------------------
 *
 * s = "anagram"
 * t = "nagaram"
 *
 * After counting s:
 * a:3, n:1, g:1, r:1, m:1
 *
 * Process t:
 * reduce counts
 *
 * Final map:
 * all values become 0
 *
 * => valid anagram
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. If lengths differ, return false
 * 2. Create a map/object
 * 3. Count characters in s
 * 4. Traverse t:
 *    - if char not in map OR count is zero => return false
 *    - else decrement count
 * 5. If loop completes, return true
 */

/**
 * ------------------------------------------------------------
 * DRY RUN
 * ------------------------------------------------------------
 *
 * s = "rat", t = "car"
 *
 * map = { r:1, a:1, t:1 }
 *
 * read 'c' -> not in map => return false
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Time: O(n)
 * Space: O(1) (if limited charset like lowercase English)
 *
 * General: O(k) where k = unique characters
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE
 * ------------------------------------------------------------
 *
 * - Best general solution
 * - Preferred in interviews
 * - Works for any characters
 */

/**
 * ============================================================
 * SOLUTION 4: FIXED ARRAY (BEST FOR LOWERCASE LETTERS)
 * ============================================================
 *
 * Approach:
 * ---------
 * Instead of hashmap, use an array of size 26.
 *
 * Map each character to index:
 * index = charCode - 'a'
 */

function isAnagramArray(s, t) {
    if (s.length !== t.length) return false;

    const count = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 97]++;
        count[t.charCodeAt(i) - 97]--;
    }

    for (let val of count) {
        if (val !== 0) return false;
    }

    return true;
}

/**
 * Why it works:
 * -------------
 * Increment for s, decrement for t.
 * Balanced counts => all zeros
 *
 * Time Complexity:
 * ----------------
 * O(n)
 *
 * Space Complexity:
 * -----------------
 * O(1) (fixed size 26)
 *
 * When to use:
 * ------------
 * - Only when input is lowercase English letters
 * - Most optimized solution
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION
 * ============================================================
 */

function isAnagramRecommended(s, t) {
    if (s.length !== t.length) return false;

    const map = {};

    for (let char of s) {
        map[char] = (map[char] || 0) + 1;
    }

    for (let char of t) {
        if (!map[char]) return false;
        map[char]--;
    }

    return true;
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "I compare character frequencies.
 * First I count characters in s, then subtract using t.
 * If at any point a character is missing or count goes negative,
 * it's not an anagram. Otherwise, it's valid."
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Different lengths => false
 * 2. Empty strings => true
 * 3. Single character => compare directly
 * 4. Case sensitivity (depends on problem)
 * 5. Unicode characters (use hashmap)
 */

/**
 * ============================================================
 * REVISION NOTES
 * ============================================================
 *
 * Pattern:
 * --------
 * Frequency count / Hashing
 *
 * Memory Hook:
 * ------------
 * "Same letters, same counts"
 *
 * Quick Trick:
 * ------------
 * Count up with s, count down with t
 *
 * Best Solution:
 * --------------
 * HashMap (or array if lowercase only)
 *
 * Interview Flow:
 * ---------------
 * Brute Force → Sorting → HashMap → Array Optimization
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        { s: "anagram", t: "nagaram", expected: true },
        { s: "rat", t: "car", expected: false },
        { s: "", t: "", expected: true },
        { s: "a", t: "a", expected: true },
        { s: "a", t: "b", expected: false },
        { s: "aacc", t: "ccac", expected: false }
    ];

    const methods = [
        { name: "Brute Force", fn: isAnagramBruteForce },
        { name: "Sorting", fn: isAnagramSorting },
        { name: "HashMap", fn: isAnagram },
        { name: "Array", fn: isAnagramArray },
        { name: "Recommended", fn: isAnagramRecommended }
    ];

    for (const test of testCases) {
        console.log("=======================================");
        console.log(`s = "${test.s}", t = "${test.t}"`);
        console.log(`Expected: ${test.expected}`);

        for (const method of methods) {
            const result = method.fn(test.s, test.t);
            console.log(`${method.name.padEnd(12)} => ${result} | Pass: ${result === test.expected}`);
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
 * HashMap / Frequency Count
 *
 * Core Idea:
 * ----------
 * Count s → subtract t → all zero => anagram
 *
 * Complexity:
 * -----------
 * Time: O(n)
 * Space: O(1)
 *
 * One-line:
 * ---------
 * "Two strings are anagrams if their character frequencies match."
 */