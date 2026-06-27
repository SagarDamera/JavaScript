/**
 * LeetCode 49. Group Anagrams
 * =================================
 *
 * Problem:
 * Given an array of strings strs, group the anagrams together.
 * You can return the answer in any order.
 *
 * ------------------------------------------------------------
 * EXAMPLES
 * ------------------------------------------------------------
 * Input:  strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Input:  strs = [""]
 * Output: [[""]]
 *
 * Input:  strs = ["a"]
 * Output: [["a"]]
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is a very important HashMap + grouping problem.
 *
 * It teaches:
 * 1. Frequency-based grouping
 * 2. Sorting as a key technique
 * 3. Hashing complex structures (arrays → strings)
 * 4. Pattern used in many problems
 *
 * It is an extension of:
 * - Valid Anagram (LeetCode 242)
 *
 * ============================================================
 * PROBLEM UNDERSTANDING
 * ============================================================
 *
 * Two words are anagrams if:
 * - same characters
 * - same frequency
 * - order doesn't matter
 *
 * Goal:
 * Group words that are anagrams of each other.
 *
 * Example:
 * "eat", "tea", "ate" → same group
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force (compare each pair)
 * 2. Sorting as key
 * 3. Frequency count as key (Optimal)
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE GROUPING
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * For each word:
 * - compare with every other word
 * - if anagram → group together
 *
 * Why it works:
 * -------------
 * We explicitly check all pairs.
 *
 * Why it is slow:
 * ---------------
 * - Checking anagram takes O(k log k)
 * - Doing it for all pairs → O(n^2 * k log k)
 */

function groupAnagramsBruteForce(strs) {
    const result = [];
    const visited = new Array(strs.length).fill(false);

    const isAnagram = (a, b) => {
        return a.split("").sort().join("") === b.split("").sort().join("");
    };

    for (let i = 0; i < strs.length; i++) {
        if (visited[i]) continue;

        const group = [strs[i]];
        visited[i] = true;

        for (let j = i + 1; j < strs.length; j++) {
            if (!visited[j] && isAnagram(strs[i], strs[j])) {
                group.push(strs[j]);
                visited[j] = true;
            }
        }

        result.push(group);
    }

    return result;
}

/**
 * Time Complexity:
 * ----------------
 * O(n^2 * k log k)
 *
 * Space Complexity:
 * -----------------
 * O(n)
 *
 * When to use:
 * ------------
 * Only for understanding, not for interviews
 */

/**
 * ============================================================
 * SOLUTION 2: SORTING AS KEY (MOST COMMON)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Sort each string.
 * Anagrams will have the same sorted string.
 *
 * Example:
 * "eat" → "aet"
 * "tea" → "aet"
 * "ate" → "aet"
 *
 * Use sorted string as key in hashmap.
 */

function groupAnagramsSorting(strs) {
    const map = new Map();

    for (let str of strs) {
        const key = str.split("").sort().join("");

        if (!map.has(key)) {
            map.set(key, []);
        }

        map.get(key).push(str);
    }

    return Array.from(map.values());
}

/**
 * Step-by-step:
 * -------------
 * strs = ["eat","tea","tan","ate","nat","bat"]
 *
 * key = "aet" → ["eat","tea","ate"]
 * key = "ant" → ["tan","nat"]
 * key = "abt" → ["bat"]
 *
 * return groups
 *
 * Time Complexity:
 * ----------------
 * Sorting each string takes O(k log k)
 * For n strings → O(n * k log k)
 *
 * Space Complexity:
 * -----------------
 * O(nk)
 *
 * When to use:
 * ------------
 * - Most intuitive solution
 * - Works for any characters
 */

/**
 * ============================================================
 * SOLUTION 3: FREQUENCY COUNT AS KEY (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Instead of sorting,
 * use character frequency as key.
 *
 * For lowercase letters:
 * create array of size 26
 *
 * Example:
 * "eat" → [1,0,0,...,1,...]
 *
 * Convert array to string → use as key
 *
 * Why it works:
 * -------------
 * Anagrams have identical frequency counts.
 */

function groupAnagrams(strs) {
    const map = new Map();

    for (let str of strs) {
        const count = new Array(26).fill(0);

        for (let char of str) {
            count[char.charCodeAt(0) - 97]++;
        }

        const key = count.join("#");

        if (!map.has(key)) {
            map.set(key, []);
        }

        map.get(key).push(str);
    }

    return Array.from(map.values());
}

/**
 * ------------------------------------------------------------
 * WHY THIS WORKS
 * ------------------------------------------------------------
 *
 * Example:
 * "eat" → [1,0,0,...,1,...]
 * "tea" → same frequency array
 *
 * Same key → same group
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Create hashmap
 * 2. For each string:
 *    - build frequency array
 *    - convert to string key
 *    - group strings under that key
 * 3. Return all values
 */

/**
 * ------------------------------------------------------------
 * DRY RUN
 * ------------------------------------------------------------
 *
 * strs = ["eat","tea","tan","ate","nat","bat"]
 *
 * "eat" → key = "1#0#...#1"
 * map = { key: ["eat"] }
 *
 * "tea" → same key → ["eat","tea"]
 *
 * "tan" → new key → ["tan"]
 *
 * ...
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Time Complexity:
 * ----------------
 * O(n * k)
 *
 * k = max string length
 *
 * Space Complexity:
 * -----------------
 * O(nk)
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE
 * ------------------------------------------------------------
 *
 * Use this when:
 * - need optimal solution
 * - lowercase letters only
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION
 * ============================================================
 */

function groupAnagramsRecommended(strs) {
    const map = new Map();

    for (let str of strs) {
        const count = new Array(26).fill(0);

        for (let char of str) {
            count[char.charCodeAt(0) - 97]++;
        }

        const key = count.join("#");

        if (!map.has(key)) {
            map.set(key, []);
        }

        map.get(key).push(str);
    }

    return Array.from(map.values());
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "I group strings by their character frequency.
 * For each string, I create a 26-length frequency array and use it
 * as a key in a hashmap. All anagrams share the same frequency,
 * so they end up in the same group."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Using array as key directly (won't work)
 * 2. Forgetting to convert to string
 * 3. Sorting without understanding complexity
 * 4. Not handling empty string
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Empty string
 * 2. Single character
 * 3. All strings same
 * 4. No anagrams
 */

/**
 * ============================================================
 * REVISION NOTES
 * ============================================================
 *
 * Pattern:
 * --------
 * HashMap + Grouping
 *
 * Memory Hook:
 * ------------
 * "Same frequency → same group"
 *
 * Key Trick:
 * ----------
 * Use frequency array OR sorted string as key
 *
 * Interview Flow:
 * ---------------
 * Brute → Sorting → Frequency array
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        {
            input: ["eat", "tea", "tan", "ate", "nat", "bat"]
        },
        {
            input: [""]
        },
        {
            input: ["a"]
        },
        {
            input: ["abc", "bca", "cab", "xyz", "zyx"]
        }
    ];

    const methods = [
        { name: "Brute", fn: groupAnagramsBruteForce },
        { name: "Sorting", fn: groupAnagramsSorting },
        { name: "Optimal", fn: groupAnagrams },
        { name: "Recommended", fn: groupAnagramsRecommended }
    ];

    for (const test of testCases) {
        console.log("=======================================");
        console.log("Input:", test.input);

        for (const method of methods) {
            console.log(method.name, "=>", method.fn(test.input));
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
 * Frequency Array Key
 *
 * Core Idea:
 * ----------
 * Same frequency → same group
 *
 * Complexity:
 * -----------
 * Sorting: O(n * k log k)
 * Optimal: O(n * k)
 *
 * One-line:
 * ---------
 * "Group strings by their character frequency."
 */