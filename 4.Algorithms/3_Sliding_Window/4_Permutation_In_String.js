/********************************************************************************************
 * NeetCode 150: Sliding Window
 * Permutation In String
 *
 * LeetCode 567. Permutation in String
 *
 * ------------------------------------------------------------------------------------------
 * Problem:
 * ------------------------------------------------------------------------------------------
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1.
 * Otherwise, return false.
 *
 * In simple words:
 * Check if any substring of s2 is an anagram/permutation of s1.
 *
 * ------------------------------------------------------------------------------------------
 * Example:
 * ------------------------------------------------------------------------------------------
 * Input:
 * s1 = "ab"
 * s2 = "eidbaooo"
 *
 * Output:
 * true
 *
 * Explanation:
 * s2 contains "ba", which is a permutation of "ab".
 *
 * ------------------------------------------------------------------------------------------
 * Important:
 * ------------------------------------------------------------------------------------------
 * A permutation means same characters with same frequency, but order can be different.
 *
 * "ab" permutations:
 * "ab", "ba"
 *
 ********************************************************************************************/


/********************************************************************************************
 * SOLUTION 1: BRUTE FORCE - GENERATE ALL PERMUTATIONS
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Generate every possible permutation of s1.
 * Then check if any permutation exists inside s2.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * If s2 contains any permutation of s1, and we generate all permutations, we will find it.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Generate all permutations of s1 using backtracking.
 * 2. Store permutations in a Set.
 * 3. For every permutation, check if s2 includes it.
 * 4. If yes, return true.
 * 5. Return false.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n! * n + n! * m)
 *
 * n = length of s1
 * m = length of s2
 *
 * This is extremely slow because permutations grow factorially.
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n! * n)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Only for understanding what permutation means.
 * Never use this in interviews as final solution.
 *
 ********************************************************************************************/

function checkInclusionGeneratePermutations(s1, s2) {
    const permutations = new Set();

    function backtrack(path, used) {
        if (path.length === s1.length) {
            permutations.add(path.join(""));
            return;
        }

        for (let i = 0; i < s1.length; i++) {
            if (used[i]) continue;

            used[i] = true;
            path.push(s1[i]);

            backtrack(path, used);

            path.pop();
            used[i] = false;
        }
    }

    backtrack([], new Array(s1.length).fill(false));

    for (const permutation of permutations) {
        if (s2.includes(permutation)) {
            return true;
        }
    }

    return false;
}


/********************************************************************************************
 * SOLUTION 2: BRUTE FORCE - CHECK EVERY SUBSTRING BY SORTING
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * If a substring of s2 is a permutation of s1, then after sorting both strings,
 * they should be equal.
 *
 * Example:
 * s1 = "ab"
 * substring = "ba"
 *
 * sort("ab") = "ab"
 * sort("ba") = "ab"
 *
 * They are equal, so "ba" is a permutation of "ab".
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Anagrams/permutations have the same characters with the same frequency.
 * Sorting puts characters in the same order, so equal sorted strings means same frequency.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Sort s1.
 * 2. For every substring of s2 with length s1.length:
 *      a. Sort the substring.
 *      b. Compare it with sorted s1.
 * 3. If any sorted substring matches, return true.
 * 4. Return false.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O((m - n + 1) * n log n)
 *
 * n = length of s1
 * m = length of s2
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Good beginner solution.
 * Not optimal because sorting every window is costly.
 *
 ********************************************************************************************/

function checkInclusionSorting(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    if (n > m) return false;

    const sortedS1 = s1.split("").sort().join("");

    for (let i = 0; i <= m - n; i++) {
        const substring = s2.slice(i, i + n);
        const sortedSubstring = substring.split("").sort().join("");

        if (sortedSubstring === sortedS1) {
            return true;
        }
    }

    return false;
}


/********************************************************************************************
 * SOLUTION 3: BETTER BRUTE FORCE - FREQUENCY COUNT FOR EVERY WINDOW
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Instead of sorting, compare character frequencies.
 *
 * A substring is a permutation of s1 if:
 *  - every character count is the same
 *
 * Since the problem uses lowercase English letters, we can use arrays of size 26.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Permutation means same characters and same count.
 *
 * Example:
 * s1 = "ab"
 * substring = "ba"
 *
 * s1 frequency:
 * a: 1, b: 1
 *
 * substring frequency:
 * a: 1, b: 1
 *
 * Frequencies match, so it is a permutation.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Build frequency array for s1.
 * 2. For every substring/window of s2 with size s1.length:
 *      a. Build frequency array for this substring.
 *      b. Compare with s1 frequency.
 * 3. If any frequency matches, return true.
 * 4. Return false.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O((m - n + 1) * (n + 26))
 *
 * Simplified:
 * O(m * n)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(26), which is O(1)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Good stepping stone before sliding window.
 * Easier than sorting to optimize.
 *
 ********************************************************************************************/

function checkInclusionFrequencyEveryWindow(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    if (n > m) return false;

    const s1Count = new Array(26).fill(0);

    for (const char of s1) {
        s1Count[char.charCodeAt(0) - 97]++;
    }

    for (let start = 0; start <= m - n; start++) {
        const windowCount = new Array(26).fill(0);

        for (let i = start; i < start + n; i++) {
            windowCount[s2.charCodeAt(i) - 97]++;
        }

        if (arraysEqual(s1Count, windowCount)) {
            return true;
        }
    }

    return false;
}

function arraysEqual(arr1, arr2) {
    for (let i = 0; i < 26; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}


/********************************************************************************************
 * SOLUTION 4: SLIDING WINDOW WITH FREQUENCY ARRAYS
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * We need to check every substring of s2 with length equal to s1.length.
 *
 * Instead of rebuilding frequency for every substring, use sliding window:
 *
 *  - Add the new right character.
 *  - Remove the old left character.
 *  - Compare window frequency with s1 frequency.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Every valid permutation must have the same length as s1.
 *
 * So we maintain a fixed-size window of length s1.length in s2.
 *
 * If the frequency of the current window matches s1 frequency,
 * then that window is a permutation of s1.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. If s1.length > s2.length, return false.
 * 2. Build frequency array for s1.
 * 3. Build frequency array for the first window of s2.
 * 4. Compare both arrays.
 * 5. Slide the window:
 *      a. Add new right character.
 *      b. Remove old left character.
 *      c. Compare frequency arrays.
 * 6. If any window matches, return true.
 * 7. Return false.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(26 * m), which is O(m)
 *
 * m = length of s2
 *
 * Because comparing two arrays of size 26 is constant time.
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(26), which is O(1)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * This is a clean and very interview-friendly solution.
 *
 ********************************************************************************************/

function checkInclusionSlidingWindow(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    if (n > m) return false;

    const s1Count = new Array(26).fill(0);
    const windowCount = new Array(26).fill(0);

    for (let i = 0; i < n; i++) {
        s1Count[s1.charCodeAt(i) - 97]++;
        windowCount[s2.charCodeAt(i) - 97]++;
    }

    if (arraysEqual(s1Count, windowCount)) {
        return true;
    }

    for (let right = n; right < m; right++) {
        const rightIndex = s2.charCodeAt(right) - 97;
        windowCount[rightIndex]++;

        const leftIndex = s2.charCodeAt(right - n) - 97;
        windowCount[leftIndex]--;

        if (arraysEqual(s1Count, windowCount)) {
            return true;
        }
    }

    return false;
}


/********************************************************************************************
 * SOLUTION 5: OPTIMIZED SLIDING WINDOW WITH MATCHES COUNT
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * In Solution 4, we compare all 26 character counts after every window move.
 *
 * We can optimize this by tracking how many character counts currently match.
 *
 * matches = number of indexes where:
 *
 * s1Count[i] === windowCount[i]
 *
 * If matches === 26, then all character frequencies match.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Since there are only 26 lowercase letters, if all 26 frequency counts match,
 * then the current window is a permutation of s1.
 *
 * Instead of checking all 26 positions every time, we update matches only for:
 *  - character added on the right
 *  - character removed on the left
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. If s1.length > s2.length, return false.
 * 2. Create frequency arrays for s1 and first window of s2.
 * 3. Count how many of the 26 positions match.
 * 4. If matches === 26, return true.
 * 5. Slide the window:
 *      a. Add right character.
 *      b. Update matches based on that character count change.
 *      c. Remove left character.
 *      d. Update matches based on that character count change.
 *      e. If matches === 26, return true.
 * 6. Return false.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(m)
 *
 * m = length of s2
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(26), which is O(1)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * This is the most optimized NeetCode-style solution.
 * Good for MAANG interviews.
 *
 ********************************************************************************************/

function checkInclusionOptimizedMatches(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    if (n > m) return false;

    const s1Count = new Array(26).fill(0);
    const windowCount = new Array(26).fill(0);

    for (let i = 0; i < n; i++) {
        s1Count[s1.charCodeAt(i) - 97]++;
        windowCount[s2.charCodeAt(i) - 97]++;
    }

    let matches = 0;

    for (let i = 0; i < 26; i++) {
        if (s1Count[i] === windowCount[i]) {
            matches++;
        }
    }

    if (matches === 26) return true;

    for (let right = n; right < m; right++) {
        const left = right - n;

        const rightIndex = s2.charCodeAt(right) - 97;
        windowCount[rightIndex]++;

        if (windowCount[rightIndex] === s1Count[rightIndex]) {
            matches++;
        } else if (windowCount[rightIndex] === s1Count[rightIndex] + 1) {
            matches--;
        }

        const leftIndex = s2.charCodeAt(left) - 97;
        windowCount[leftIndex]--;

        if (windowCount[leftIndex] === s1Count[leftIndex]) {
            matches++;
        } else if (windowCount[leftIndex] === s1Count[leftIndex] - 1) {
            matches--;
        }

        if (matches === 26) {
            return true;
        }
    }

    return false;
}


/********************************************************************************************
 * MAIN RECOMMENDED SOLUTION
 *
 * ------------------------------------------------------------------------------------------
 * Use this in interviews:
 * ------------------------------------------------------------------------------------------
 * Optimized Sliding Window + Frequency Array + Matches Count
 *
 * Reason:
 *  - O(m) time
 *  - O(1) space
 *  - Avoids checking all 26 characters for every window
 *  - This is the NeetCode-style optimized solution
 *
 ********************************************************************************************/

function checkInclusion(s1, s2) {
    const n = s1.length;
    const m = s2.length;

    if (n > m) return false;

    const s1Count = new Array(26).fill(0);
    const windowCount = new Array(26).fill(0);

    for (let i = 0; i < n; i++) {
        s1Count[s1.charCodeAt(i) - 97]++;
        windowCount[s2.charCodeAt(i) - 97]++;
    }

    let matches = 0;

    for (let i = 0; i < 26; i++) {
        if (s1Count[i] === windowCount[i]) {
            matches++;
        }
    }

    if (matches === 26) {
        return true;
    }

    for (let right = n; right < m; right++) {
        const left = right - n;

        const rightIndex = s2.charCodeAt(right) - 97;
        windowCount[rightIndex]++;

        if (windowCount[rightIndex] === s1Count[rightIndex]) {
            matches++;
        } else if (windowCount[rightIndex] === s1Count[rightIndex] + 1) {
            matches--;
        }

        const leftIndex = s2.charCodeAt(left) - 97;
        windowCount[leftIndex]--;

        if (windowCount[leftIndex] === s1Count[leftIndex]) {
            matches++;
        } else if (windowCount[leftIndex] === s1Count[leftIndex] - 1) {
            matches--;
        }

        if (matches === 26) {
            return true;
        }
    }

    return false;
}


/********************************************************************************************
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 *
 * s1 = "ab"
 * s2 = "eidbaooo"
 *
 * ------------------------------------------------------------------------------------------
 * Goal:
 * Find if any substring of s2 with length 2 is a permutation of "ab".
 *
 * Permutations of "ab":
 * "ab", "ba"
 *
 * ------------------------------------------------------------------------------------------
 * s1Count:
 *
 * a: 1
 * b: 1
 *
 * ------------------------------------------------------------------------------------------
 * Window size = s1.length = 2
 *
 * Check every window of size 2 in s2:
 *
 * s2 = "e i d b a o o o"
 *       0 1 2 3 4 5 6 7
 *
 * ------------------------------------------------------------------------------------------
 * Window 1:
 *
 * [e i] d b a o o o
 *
 * windowCount:
 * e: 1
 * i: 1
 *
 * Not equal to s1Count.
 *
 * ------------------------------------------------------------------------------------------
 * Window 2:
 *
 * e [i d] b a o o o
 *
 * windowCount:
 * i: 1
 * d: 1
 *
 * Not equal to s1Count.
 *
 * ------------------------------------------------------------------------------------------
 * Window 3:
 *
 * e i [d b] a o o o
 *
 * windowCount:
 * d: 1
 * b: 1
 *
 * Not equal to s1Count.
 *
 * ------------------------------------------------------------------------------------------
 * Window 4:
 *
 * e i d [b a] o o o
 *
 * windowCount:
 * b: 1
 * a: 1
 *
 * This matches s1Count.
 *
 * "ba" is a permutation of "ab".
 *
 * Return true.
 *
 ********************************************************************************************/


/********************************************************************************************
 * MATCHES COUNT EXPLANATION
 *
 * ------------------------------------------------------------------------------------------
 * Why matches === 26 means true:
 * ------------------------------------------------------------------------------------------
 * We have 26 lowercase letters: a to z.
 *
 * For each letter, we compare:
 *
 * s1Count[letter] === windowCount[letter]
 *
 * If all 26 counts match, then the current window has exactly the same characters
 * and exactly the same frequency as s1.
 *
 * That means current window is a permutation of s1.
 *
 * ------------------------------------------------------------------------------------------
 * Why update only two characters while sliding?
 * ------------------------------------------------------------------------------------------
 * When the window moves by one step:
 *
 * 1. One character enters from the right.
 * 2. One character leaves from the left.
 *
 * Only these two character counts change.
 * So only these two can affect matches.
 *
 ********************************************************************************************/


/********************************************************************************************
 * IMPORTANT DETAIL: FIXED-SIZE WINDOW
 *
 * ------------------------------------------------------------------------------------------
 * This problem is different from "Longest Substring Without Repeating Characters".
 *
 * Here, the window size must always be equal to s1.length.
 *
 * Why?
 * Because a permutation of s1 must have exactly the same length as s1.
 *
 * Example:
 * s1 = "abc"
 *
 * Valid permutation length must be 3:
 * "abc", "bca", "cab", "bac", etc.
 *
 * A substring of length 2 or 4 cannot be a permutation of s1.
 *
 ********************************************************************************************/


/********************************************************************************************
 * REVISION-FRIENDLY NOTES
 *
 * ------------------------------------------------------------------------------------------
 * Pattern Used:
 * ------------------------------------------------------------------------------------------
 * Fixed-size Sliding Window + Frequency Array
 *
 * ------------------------------------------------------------------------------------------
 * Memory Hook:
 * ------------------------------------------------------------------------------------------
 * "Permutation means same count, same window size."
 *
 * ------------------------------------------------------------------------------------------
 * Interview Explanation:
 * ------------------------------------------------------------------------------------------
 * I use a fixed-size sliding window of length s1.length over s2.
 *
 * Since a permutation must contain exactly the same characters with the same frequencies,
 * I compare the frequency count of s1 with the current window frequency.
 *
 * To optimize, I track how many of the 26 character frequencies currently match.
 * If matches becomes 26, all character counts are equal, so the current window is a
 * permutation of s1.
 *
 * ------------------------------------------------------------------------------------------
 * Edge Cases:
 * ------------------------------------------------------------------------------------------
 * 1. s1 longer than s2:
 *      s1 = "abc"
 *      s2 = "ab"
 *      Answer = false
 *
 * 2. Exact match:
 *      s1 = "abc"
 *      s2 = "abc"
 *      Answer = true
 *
 * 3. Permutation exists in middle:
 *      s1 = "ab"
 *      s2 = "eidbaooo"
 *      Answer = true
 *
 * 4. No permutation:
 *      s1 = "ab"
 *      s2 = "eidboaoo"
 *      Answer = false
 *
 * 5. Repeated characters:
 *      s1 = "aabc"
 *      s2 = "caaebab"
 *      Need exact frequency match.
 *
 ********************************************************************************************/


/********************************************************************************************
 * TEST CASES
 ********************************************************************************************/

function runTests() {
    const testCases = [
        {
            s1: "ab",
            s2: "eidbaooo",
            expected: true
        },
        {
            s1: "ab",
            s2: "eidboaoo",
            expected: false
        },
        {
            s1: "abc",
            s2: "bbbca",
            expected: true
        },
        {
            s1: "abc",
            s2: "ab",
            expected: false
        },
        {
            s1: "abc",
            s2: "abc",
            expected: true
        },
        {
            s1: "aabc",
            s2: "caaebab",
            expected: true
        },
        {
            s1: "hello",
            s2: "ooolleoooleh",
            expected: false
        },
        {
            s1: "adc",
            s2: "dcda",
            expected: true
        }
    ];

    for (const { s1, s2, expected } of testCases) {
        const result = checkInclusion(s1, s2);

        console.log(
            `s1 = "${s1}", s2 = "${s2}" | expected = ${expected} | result = ${result} | ${result === expected ? "PASS" : "FAIL"
            }`
        );
    }
}

runTests();