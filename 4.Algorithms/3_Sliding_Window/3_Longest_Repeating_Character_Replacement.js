/********************************************************************************************
 * NeetCode 150: Sliding Window
 * Longest Repeating Character Replacement
 *
 * LeetCode 424. Longest Repeating Character Replacement
 *
 * ------------------------------------------------------------------------------------------
 * Problem:
 * ------------------------------------------------------------------------------------------
 * You are given a string s and an integer k.
 *
 * You can choose any character in the string and change it to any other uppercase English
 * character.
 *
 * Return the length of the longest substring containing the same letter after performing
 * at most k replacements.
 *
 * ------------------------------------------------------------------------------------------
 * Example:
 * ------------------------------------------------------------------------------------------
 * Input:
 * s = "ABAB"
 * k = 2
 *
 * Output:
 * 4
 *
 * Explanation:
 * Replace both 'A' characters with 'B', or replace both 'B' characters with 'A'.
 * The whole string can become "BBBB" or "AAAA".
 *
 ********************************************************************************************/


/********************************************************************************************
 * SOLUTION 1: BRUTE FORCE
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Try every possible substring.
 *
 * For each substring, check:
 *  - what character appears the most?
 *  - how many characters need to be replaced?
 *
 * Formula:
 *
 * replacementsNeeded = substringLength - maxFrequencyCharacterCount
 *
 * If replacementsNeeded <= k, then this substring can be made into all same characters.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * To make a substring all one character, the best choice is to keep the most frequent
 * character and replace all other characters.
 *
 * Example:
 * substring = "AABAB"
 *
 * A appears 3 times
 * B appears 2 times
 *
 * Best target = A
 * Replace 2 B's
 *
 * replacementsNeeded = 5 - 3 = 2
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Initialize maxLength = 0.
 * 2. Start every substring from index start.
 * 3. End every substring at index end.
 * 4. Count character frequencies inside that substring.
 * 5. Find highest frequency.
 * 6. If substring length - highest frequency <= k, update maxLength.
 * 7. Return maxLength.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n^3)
 *
 * Reason:
 * There are O(n^2) substrings.
 * For each substring, we count frequencies again in O(n).
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(26), which is O(1)
 *
 * Because the string contains only uppercase English letters.
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Only for understanding the problem.
 * Not good for interview final answer.
 *
 ********************************************************************************************/

function characterReplacementBruteForce(s, k) {
    let maxLength = 0;

    for (let start = 0; start < s.length; start++) {
        for (let end = start; end < s.length; end++) {
            const freq = new Array(26).fill(0);
            let maxFreq = 0;

            for (let i = start; i <= end; i++) {
                const index = s.charCodeAt(i) - 65;
                freq[index]++;
                maxFreq = Math.max(maxFreq, freq[index]);
            }

            const windowLength = end - start + 1;
            const replacementsNeeded = windowLength - maxFreq;

            if (replacementsNeeded <= k) {
                maxLength = Math.max(maxLength, windowLength);
            }
        }
    }

    return maxLength;
}


/********************************************************************************************
 * SOLUTION 2: BETTER BRUTE FORCE
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Instead of recalculating frequency for every substring from scratch, we can keep updating
 * frequency while expanding the end pointer.
 *
 * For every start:
 *  - create frequency array
 *  - move end forward
 *  - update current character frequency
 *  - update max frequency
 *  - check if current substring is valid
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * For a fixed start, we grow the substring one character at a time.
 * So we can reuse frequency counts instead of rebuilding them repeatedly.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Initialize maxLength = 0.
 * 2. Loop start from 0 to n - 1.
 * 3. Create frequency array of size 26.
 * 4. Set maxFreq = 0.
 * 5. Loop end from start to n - 1.
 * 6. Add s[end] to frequency array.
 * 7. Update maxFreq.
 * 8. Calculate windowLength = end - start + 1.
 * 9. If windowLength - maxFreq <= k, update maxLength.
 * 10. Return maxLength.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n^2)
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
 * Still not optimal as final interview answer.
 *
 ********************************************************************************************/

function characterReplacementBetterBruteForce(s, k) {
    let maxLength = 0;

    for (let start = 0; start < s.length; start++) {
        const freq = new Array(26).fill(0);
        let maxFreq = 0;

        for (let end = start; end < s.length; end++) {
            const index = s.charCodeAt(end) - 65;
            freq[index]++;

            maxFreq = Math.max(maxFreq, freq[index]);

            const windowLength = end - start + 1;
            const replacementsNeeded = windowLength - maxFreq;

            if (replacementsNeeded <= k) {
                maxLength = Math.max(maxLength, windowLength);
            }
        }
    }

    return maxLength;
}


/********************************************************************************************
 * SOLUTION 3: SLIDING WINDOW WITH FREQUENCY ARRAY
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Maintain a window [left ... right].
 *
 * Inside this window:
 *
 * windowLength = right - left + 1
 * maxFreq = count of most frequent character in the window
 *
 * Characters to replace:
 *
 * replacementsNeeded = windowLength - maxFreq
 *
 * If replacementsNeeded <= k:
 *  - window is valid
 *
 * If replacementsNeeded > k:
 *  - window is invalid
 *  - shrink from left
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * To make the whole window one repeating character, we keep the most frequent character
 * and replace all other characters.
 *
 * So:
 *
 * windowLength - maxFreq
 *
 * tells us the minimum number of replacements needed.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Create frequency array of size 26.
 * 2. Set left = 0.
 * 3. Set maxFreq = 0.
 * 4. Set maxLength = 0.
 * 5. Move right from 0 to n - 1.
 * 6. Add s[right] to frequency array.
 * 7. Update maxFreq.
 * 8. If current window needs more than k replacements:
 *      a. Remove s[left] from frequency array.
 *      b. Move left forward.
 * 9. Update maxLength.
 * 10. Return maxLength.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(26), which is O(1)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * This is the best interview solution.
 *
 ********************************************************************************************/

function characterReplacementSlidingWindow(s, k) {
    const freq = new Array(26).fill(0);

    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const rightIndex = s.charCodeAt(right) - 65;
        freq[rightIndex]++;

        maxFreq = Math.max(maxFreq, freq[rightIndex]);

        const windowLength = right - left + 1;
        const replacementsNeeded = windowLength - maxFreq;

        if (replacementsNeeded > k) {
            const leftIndex = s.charCodeAt(left) - 65;
            freq[leftIndex]--;
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}


/********************************************************************************************
 * SOLUTION 4: SLIDING WINDOW WITH HASH MAP
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Same as frequency array, but uses Map instead of fixed 26-size array.
 *
 * This is useful if:
 *  - input is not limited to uppercase A-Z
 *  - string can contain lowercase, digits, symbols, etc.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * The same formula applies:
 *
 * replacementsNeeded = windowLength - maxFreq
 *
 * If replacementsNeeded <= k, the window can be converted into repeating characters.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Create Map for frequency count.
 * 2. Move right pointer across string.
 * 3. Add s[right] into Map.
 * 4. Update maxFreq.
 * 5. If window is invalid, remove s[left] and move left.
 * 6. Update maxLength.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(m)
 *
 * m = number of unique characters.
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Use when input character set is unknown.
 * For LeetCode 424, frequency array is slightly cleaner.
 *
 ********************************************************************************************/

function characterReplacementHashMap(s, k) {
    const freq = new Map();

    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        freq.set(rightChar, (freq.get(rightChar) || 0) + 1);
        maxFreq = Math.max(maxFreq, freq.get(rightChar));

        if (right - left + 1 - maxFreq > k) {
            const leftChar = s[left];
            freq.set(leftChar, freq.get(leftChar) - 1);
            left++;
        }

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
 * Sliding Window + Frequency Array
 *
 * Reason:
 *  - O(n) time
 *  - O(1) space because only 26 uppercase letters
 *  - Cleanest for LeetCode 424
 *  - Common MAANG-style solution
 *
 ********************************************************************************************/

function characterReplacement(s, k) {
    const freq = new Array(26).fill(0);

    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const rightIndex = s.charCodeAt(right) - 65;
        freq[rightIndex]++;

        maxFreq = Math.max(maxFreq, freq[rightIndex]);

        if (right - left + 1 - maxFreq > k) {
            const leftIndex = s.charCodeAt(left) - 65;
            freq[leftIndex]--;
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}


/********************************************************************************************
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 *
 * s = "AABABBA"
 * k = 1
 *
 * ------------------------------------------------------------------------------------------
 * Goal:
 * Find longest substring that can become all same letters using at most 1 replacement.
 *
 * ------------------------------------------------------------------------------------------
 * Formula:
 *
 * replacementsNeeded = windowLength - maxFreq
 *
 * ------------------------------------------------------------------------------------------
 * right = 0
 *
 * Window: "A"
 * freq: A = 1
 * maxFreq = 1
 * windowLength = 1
 * replacementsNeeded = 1 - 1 = 0
 * maxLength = 1
 *
 * ------------------------------------------------------------------------------------------
 * right = 1
 *
 * Window: "AA"
 * freq: A = 2
 * maxFreq = 2
 * windowLength = 2
 * replacementsNeeded = 2 - 2 = 0
 * maxLength = 2
 *
 * ------------------------------------------------------------------------------------------
 * right = 2
 *
 * Window: "AAB"
 * freq: A = 2, B = 1
 * maxFreq = 2
 * windowLength = 3
 * replacementsNeeded = 3 - 2 = 1
 * maxLength = 3
 *
 * This is valid because we can replace B with A.
 *
 * ------------------------------------------------------------------------------------------
 * right = 3
 *
 * Window: "AABA"
 * freq: A = 3, B = 1
 * maxFreq = 3
 * windowLength = 4
 * replacementsNeeded = 4 - 3 = 1
 * maxLength = 4
 *
 * This is valid because we can replace B with A.
 *
 * ------------------------------------------------------------------------------------------
 * right = 4
 *
 * Window: "AABAB"
 * freq: A = 3, B = 2
 * maxFreq = 3
 * windowLength = 5
 * replacementsNeeded = 5 - 3 = 2
 *
 * Invalid because k = 1.
 *
 * Shrink from left:
 * remove s[left] = A
 * left moves forward
 *
 * New Window: "ABAB"
 *
 * maxLength stays 4
 *
 * ------------------------------------------------------------------------------------------
 * right = 5
 *
 * Window: "ABABB"
 * maxFreq is still 3
 * windowLength = 5
 * replacementsNeeded = 5 - 3 = 2
 *
 * Invalid.
 *
 * Shrink from left:
 * remove s[left] = A
 * left moves forward
 *
 * New Window: "BABB"
 *
 * maxLength stays 4
 *
 * ------------------------------------------------------------------------------------------
 * right = 6
 *
 * Window: "BABBA"
 * maxFreq is still 3
 * windowLength = 5
 * replacementsNeeded = 5 - 3 = 2
 *
 * Invalid.
 *
 * Shrink from left:
 * remove s[left] = B
 * left moves forward
 *
 * New Window: "ABBA"
 *
 * maxLength stays 4
 *
 * Final Answer = 4
 *
 * ------------------------------------------------------------------------------------------
 * Visual:
 * ------------------------------------------------------------------------------------------
 *
 * s = "A A B A B B A"
 *
 * Best window:
 *
 * [A A B A] B B A
 *
 * Replace B with A:
 *
 * [A A A A]
 *
 * Length = 4
 *
 ********************************************************************************************/


/********************************************************************************************
 * IMPORTANT DETAIL: WHY WE DO NOT DECREASE maxFreq
 *
 * ------------------------------------------------------------------------------------------
 * In the optimized solution, when left moves forward, we decrease the frequency of s[left],
 * but we do not recompute or decrease maxFreq.
 *
 * This may look strange at first.
 *
 * ------------------------------------------------------------------------------------------
 * Why is it okay?
 * ------------------------------------------------------------------------------------------
 * maxFreq represents the highest frequency we have seen in any window so far.
 *
 * Even if maxFreq becomes slightly outdated, the algorithm still works because:
 *
 * 1. We only care about finding the maximum valid window length.
 * 2. An outdated maxFreq may delay shrinking, but it will not create a wrong larger answer.
 * 3. maxLength only grows when a window length is achievable based on some earlier valid
 *    maxFreq condition.
 *
 * In interviews, you can say:
 *
 * "We keep maxFreq as the historical maximum frequency to avoid recalculating it every time.
 * This keeps the solution O(n)."
 *
 * ------------------------------------------------------------------------------------------
 * Simpler beginner explanation:
 * ------------------------------------------------------------------------------------------
 * maxFreq helps decide if our current window is too expensive to fix.
 * We do not need the exact maxFreq after shrinking because we are only tracking the largest
 * possible window size.
 *
 ********************************************************************************************/


/********************************************************************************************
 * REVISION-FRIENDLY NOTES
 *
 * ------------------------------------------------------------------------------------------
 * Pattern Used:
 * ------------------------------------------------------------------------------------------
 * Sliding Window + Frequency Count
 *
 * ------------------------------------------------------------------------------------------
 * Memory Hook:
 * ------------------------------------------------------------------------------------------
 * "Window length minus most frequent character tells replacements needed."
 *
 * Formula:
 *
 * replacementsNeeded = windowLength - maxFreq
 *
 * ------------------------------------------------------------------------------------------
 * Interview Explanation:
 * ------------------------------------------------------------------------------------------
 * I maintain a sliding window and count character frequencies inside the window.
 *
 * For any window, the best way to make all characters the same is to keep the most frequent
 * character and replace all other characters.
 *
 * So the number of replacements needed is:
 *
 * window length - max frequency
 *
 * If this value is greater than k, the window is invalid, so I shrink from the left.
 * Otherwise, I update the maximum length.
 *
 * ------------------------------------------------------------------------------------------
 * Edge Cases:
 * ------------------------------------------------------------------------------------------
 * 1. k = 0:
 *      We cannot replace anything.
 *      Find the longest already-repeating substring.
 *
 * 2. All same characters:
 *      s = "AAAA"
 *      k = 2
 *      Answer = 4
 *
 * 3. k is large:
 *      s = "ABCDE"
 *      k = 10
 *      Answer = 5
 *
 * 4. Empty string:
 *      s = ""
 *      k = 2
 *      Answer = 0
 *
 * 5. Alternating characters:
 *      s = "ABAB"
 *      k = 2
 *      Answer = 4
 *
 ********************************************************************************************/


/********************************************************************************************
 * TEST CASES
 ********************************************************************************************/

function runTests() {
    const testCases = [
        {
            s: "ABAB",
            k: 2,
            expected: 4
        },
        {
            s: "AABABBA",
            k: 1,
            expected: 4
        },
        {
            s: "AAAA",
            k: 2,
            expected: 4
        },
        {
            s: "ABCDE",
            k: 10,
            expected: 5
        },
        {
            s: "",
            k: 2,
            expected: 0
        },
        {
            s: "AAAB",
            k: 0,
            expected: 3
        },
        {
            s: "BAAAB",
            k: 2,
            expected: 5
        },
        {
            s: "ABBB",
            k: 2,
            expected: 4
        }
    ];

    for (const { s, k, expected } of testCases) {
        const result = characterReplacement(s, k);

        console.log(
            `s = "${s}", k = ${k} | expected = ${expected} | result = ${result} | ${result === expected ? "PASS" : "FAIL"
            }`
        );
    }
}

runTests();