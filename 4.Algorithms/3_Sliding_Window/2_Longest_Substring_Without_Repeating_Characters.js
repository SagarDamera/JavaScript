/********************************************************************************************
 * NeetCode 150: Sliding Window
 * Longest Substring Without Repeating Characters
 *
 * LeetCode 3. Longest Substring Without Repeating Characters
 *
 * ------------------------------------------------------------------------------------------
 * Problem:
 * ------------------------------------------------------------------------------------------
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * ------------------------------------------------------------------------------------------
 * Important:
 * ------------------------------------------------------------------------------------------
 * Substring means continuous characters.
 *
 * Example:
 * s = "abcabcbb"
 *
 * Valid substrings:
 * "abc"
 * "bca"
 * "cab"
 *
 * Answer = 3
 *
 ********************************************************************************************/


/********************************************************************************************
 * SOLUTION 1: BRUTE FORCE
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Try every possible substring.
 * For each substring, check if it has duplicate characters.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Since we check all possible substrings, we will definitely find the longest valid one.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Start from every index i.
 * 2. End at every index j.
 * 3. Extract substring s.slice(i, j + 1).
 * 4. Check if this substring has all unique characters.
 * 5. If yes, update maxLength.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n^3)
 *
 * Reason:
 * There are O(n^2) substrings.
 * For each substring, checking uniqueness can take O(n).
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Only for understanding.
 * Not good for interviews as final answer.
 *
 ********************************************************************************************/

function lengthOfLongestSubstringBruteForce(s) {
    let maxLength = 0;

    for (let start = 0; start < s.length; start++) {
        for (let end = start; end < s.length; end++) {
            const substring = s.slice(start, end + 1);

            if (hasUniqueCharacters(substring)) {
                maxLength = Math.max(maxLength, substring.length);
            }
        }
    }

    return maxLength;
}

function hasUniqueCharacters(str) {
    const seen = new Set();

    for (const char of str) {
        if (seen.has(char)) {
            return false;
        }

        seen.add(char);
    }

    return true;
}


/********************************************************************************************
 * SOLUTION 2: BETTER BRUTE FORCE USING SET
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Instead of generating every substring and checking later, build substring while moving end.
 *
 * For each start index:
 *  - create a Set
 *  - move end forward
 *  - if character is already in Set, stop
 *  - otherwise add it and update maxLength
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * For each starting point, we find the longest substring that starts there and has no repeats.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Loop start from 0 to n - 1.
 * 2. Create an empty Set.
 * 3. Loop end from start to n - 1.
 * 4. If s[end] already exists in Set, break.
 * 5. Otherwise add s[end].
 * 6. Update maxLength.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n^2)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Good stepping stone before sliding window.
 * Still not optimal enough for final interview answer.
 *
 ********************************************************************************************/

function lengthOfLongestSubstringBetterBruteForce(s) {
    let maxLength = 0;

    for (let start = 0; start < s.length; start++) {
        const seen = new Set();

        for (let end = start; end < s.length; end++) {
            const char = s[end];

            if (seen.has(char)) {
                break;
            }

            seen.add(char);
            maxLength = Math.max(maxLength, end - start + 1);
        }
    }

    return maxLength;
}


/********************************************************************************************
 * SOLUTION 3: SLIDING WINDOW USING SET
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Maintain a window that always contains unique characters.
 *
 * left  = start of current substring
 * right = end of current substring
 *
 * If s[right] is not in the window:
 *  - add it
 *  - update maxLength
 *
 * If s[right] is already in the window:
 *  - shrink from left until duplicate is removed
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * The Set represents characters currently inside the window.
 *
 * We only expand the window when it is valid.
 * If duplicate appears, we move left until the window becomes valid again.
 *
 * Every character is added and removed at most once.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Create an empty Set.
 * 2. Set left = 0.
 * 3. Set maxLength = 0.
 * 4. Move right from 0 to n - 1.
 * 5. While s[right] already exists in Set:
 *      a. Remove s[left] from Set.
 *      b. Move left forward.
 * 6. Add s[right] into Set.
 * 7. Update maxLength = max(maxLength, right - left + 1).
 * 8. Return maxLength.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * This is a clean and beginner-friendly optimal solution.
 * Very good for interviews.
 *
 ********************************************************************************************/

function lengthOfLongestSubstringSlidingWindowSet(s) {
    const window = new Set();

    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        while (window.has(s[right])) {
            window.delete(s[left]);
            left++;
        }

        window.add(s[right]);

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}


/********************************************************************************************
 * SOLUTION 4: OPTIMIZED SLIDING WINDOW USING HASH MAP
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Instead of removing characters one by one, store the last seen index of each character.
 *
 * When we see a duplicate character:
 *  - move left directly after the previous index of that character
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * If character s[right] was seen before inside the current window, then the current window is invalid.
 *
 * To fix it, left must move to:
 *
 * lastSeenIndex + 1
 *
 * But we should never move left backward.
 * So we use:
 *
 * left = Math.max(left, lastSeen.get(char) + 1)
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Create Map called lastSeen.
 * 2. Set left = 0.
 * 3. Set maxLength = 0.
 * 4. Move right from 0 to n - 1.
 * 5. Let char = s[right].
 * 6. If char is in Map:
 *      left = Math.max(left, lastSeen.get(char) + 1)
 * 7. Update char's latest index in Map.
 * 8. Update maxLength.
 * 9. Return maxLength.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Best optimized interview solution.
 * Avoids repeated deletion from Set.
 *
 ********************************************************************************************/

function lengthOfLongestSubstringHashMap(s) {
    const lastSeen = new Map();

    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        if (lastSeen.has(char)) {
            left = Math.max(left, lastSeen.get(char) + 1);
        }

        lastSeen.set(char, right);

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}


/********************************************************************************************
 * MAIN RECOMMENDED SOLUTION
 *
 * ------------------------------------------------------------------------------------------
 * Use this in interviews:
 * ------------------------------------------------------------------------------------------
 * Sliding Window using Hash Map
 *
 * Reason:
 *  - O(n) time
 *  - O(n) space
 *  - Moves left pointer directly
 *  - Easy to explain after understanding Set approach
 *
 ********************************************************************************************/

function lengthOfLongestSubstring(s) {
    const lastSeen = new Map();

    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        if (lastSeen.has(char)) {
            left = Math.max(left, lastSeen.get(char) + 1);
        }

        lastSeen.set(char, right);

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}


/********************************************************************************************
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 *
 * s = "abcabcbb"
 *
 * ------------------------------------------------------------------------------------------
 * Goal:
 * Find longest substring without repeating characters.
 *
 * ------------------------------------------------------------------------------------------
 * Using Hash Map:
 *
 * lastSeen = {}
 * left = 0
 * maxLength = 0
 *
 * ------------------------------------------------------------------------------------------
 * right = 0, char = 'a'
 *
 * Window: "a"
 * lastSeen = { a: 0 }
 * maxLength = 1
 *
 * ------------------------------------------------------------------------------------------
 * right = 1, char = 'b'
 *
 * Window: "ab"
 * lastSeen = { a: 0, b: 1 }
 * maxLength = 2
 *
 * ------------------------------------------------------------------------------------------
 * right = 2, char = 'c'
 *
 * Window: "abc"
 * lastSeen = { a: 0, b: 1, c: 2 }
 * maxLength = 3
 *
 * ------------------------------------------------------------------------------------------
 * right = 3, char = 'a'
 *
 * 'a' was seen at index 0.
 * Move left to 0 + 1 = 1.
 *
 * Window: "bca"
 * lastSeen = { a: 3, b: 1, c: 2 }
 * maxLength = 3
 *
 * ------------------------------------------------------------------------------------------
 * right = 4, char = 'b'
 *
 * 'b' was seen at index 1.
 * Move left to 1 + 1 = 2.
 *
 * Window: "cab"
 * lastSeen = { a: 3, b: 4, c: 2 }
 * maxLength = 3
 *
 * ------------------------------------------------------------------------------------------
 * right = 5, char = 'c'
 *
 * 'c' was seen at index 2.
 * Move left to 2 + 1 = 3.
 *
 * Window: "abc"
 * lastSeen = { a: 3, b: 4, c: 5 }
 * maxLength = 3
 *
 * ------------------------------------------------------------------------------------------
 * right = 6, char = 'b'
 *
 * 'b' was seen at index 4.
 * Move left to 4 + 1 = 5.
 *
 * Window: "cb"
 * lastSeen = { a: 3, b: 6, c: 5 }
 * maxLength = 3
 *
 * ------------------------------------------------------------------------------------------
 * right = 7, char = 'b'
 *
 * 'b' was seen at index 6.
 * Move left to 6 + 1 = 7.
 *
 * Window: "b"
 * lastSeen = { a: 3, b: 7, c: 5 }
 * maxLength = 3
 *
 * Final Answer = 3
 *
 * ------------------------------------------------------------------------------------------
 * Visual:
 * ------------------------------------------------------------------------------------------
 *
 * s = "abcabcbb"
 *
 * Best window:
 *
 * [a b c] a b c b b
 *  0 1 2
 *
 * Length = 3
 *
 ********************************************************************************************/


/********************************************************************************************
 * IMPORTANT DETAIL: WHY Math.max IS NEEDED
 *
 * ------------------------------------------------------------------------------------------
 * Example:
 * s = "abba"
 *
 * Without Math.max, left can move backward incorrectly.
 *
 * Dry Run:
 *
 * right = 0, char = 'a'
 * left = 0
 *
 * right = 1, char = 'b'
 * left = 0
 *
 * right = 2, char = 'b'
 * previous b = 1
 * left = 2
 *
 * right = 3, char = 'a'
 * previous a = 0
 *
 * If we do:
 * left = lastSeen.get('a') + 1
 * left = 1
 *
 * This is wrong because left moved backward from 2 to 1.
 *
 * Correct:
 * left = Math.max(left, lastSeen.get('a') + 1)
 * left = Math.max(2, 1)
 * left = 2
 *
 ********************************************************************************************/


/********************************************************************************************
 * REVISION-FRIENDLY NOTES
 *
 * ------------------------------------------------------------------------------------------
 * Pattern Used:
 * ------------------------------------------------------------------------------------------
 * Sliding Window + Hash Map
 *
 * ------------------------------------------------------------------------------------------
 * Memory Hook:
 * ------------------------------------------------------------------------------------------
 * "When duplicate appears, jump left after its previous index."
 *
 * ------------------------------------------------------------------------------------------
 * Interview Explanation:
 * ------------------------------------------------------------------------------------------
 * I maintain a sliding window where all characters are unique.
 * I use a hash map to store the last seen index of every character.
 *
 * As I move the right pointer, if I find a character already seen inside the current window,
 * I move the left pointer to one position after the previous occurrence.
 *
 * I always update the character's latest index and calculate the current window length.
 *
 * ------------------------------------------------------------------------------------------
 * Edge Cases:
 * ------------------------------------------------------------------------------------------
 * 1. Empty string:
 *      s = ""
 *      Answer = 0
 *
 * 2. All same characters:
 *      s = "bbbbb"
 *      Answer = 1
 *
 * 3. No repeating characters:
 *      s = "abcdef"
 *      Answer = 6
 *
 * 4. Duplicate outside current window:
 *      s = "abba"
 *      Answer = 2
 *
 * 5. Spaces and symbols:
 *      s = "a b!a"
 *      Characters are still treated normally.
 *
 ********************************************************************************************/


/********************************************************************************************
 * TEST CASES
 ********************************************************************************************/

function runTests() {
    const testCases = [
        {
            s: "abcabcbb",
            expected: 3
        },
        {
            s: "bbbbb",
            expected: 1
        },
        {
            s: "pwwkew",
            expected: 3
        },
        {
            s: "",
            expected: 0
        },
        {
            s: "abcdef",
            expected: 6
        },
        {
            s: "abba",
            expected: 2
        },
        {
            s: "dvdf",
            expected: 3
        },
        {
            s: "aab",
            expected: 2
        },
        {
            s: "tmmzuxt",
            expected: 5
        }
    ];

    for (const { s, expected } of testCases) {
        const result = lengthOfLongestSubstring(s);

        console.log(
            `s = "${s}" | expected = ${expected} | result = ${result} | ${result === expected ? "PASS" : "FAIL"
            }`
        );
    }
}

runTests();