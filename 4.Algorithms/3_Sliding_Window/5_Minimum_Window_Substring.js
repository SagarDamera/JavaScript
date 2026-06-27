/********************************************************************************************
 * NeetCode 150: Sliding Window
 * Minimum Window Substring
 *
 * LeetCode 76. Minimum Window Substring
 *
 * ------------------------------------------------------------------------------------------
 * Problem:
 * ------------------------------------------------------------------------------------------
 * Given two strings s and t, return the minimum window substring of s such that every character
 * in t is included in the window.
 *
 * If there is no such window, return an empty string "".
 *
 * ------------------------------------------------------------------------------------------
 * Example:
 * ------------------------------------------------------------------------------------------
 * Input:
 * s = "ADOBECODEBANC"
 * t = "ABC"
 *
 * Output:
 * "BANC"
 *
 * Explanation:
 * The smallest substring in s that contains A, B, and C is "BANC".
 *
 * ------------------------------------------------------------------------------------------
 * Important:
 * ------------------------------------------------------------------------------------------
 * t can contain duplicate characters.
 *
 * Example:
 * s = "AAABBC"
 * t = "AABC"
 *
 * We need:
 * A = 2 times
 * B = 1 time
 * C = 1 time
 *
 ********************************************************************************************/


/********************************************************************************************
 * SOLUTION 1: BRUTE FORCE - CHECK EVERY SUBSTRING
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Try every possible substring of s.
 * For each substring, check whether it contains all characters of t with required frequency.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Since we check every possible substring, we will definitely find the minimum valid window.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Build frequency map for t.
 * 2. Generate every substring s[start...end].
 * 3. Build frequency map for that substring.
 * 4. Check if substring contains all required characters from t.
 * 5. If valid and smaller than current best, update answer.
 * 6. Return answer.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n^3)
 *
 * Reason:
 * There are O(n^2) substrings.
 * For each substring, building/checking frequency can take O(n).
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
 * Only for understanding.
 * Not good for interviews as final answer.
 *
 ********************************************************************************************/

function minWindowBruteForce(s, t) {
    if (t.length > s.length) return "";

    const need = buildFrequencyMap(t);
    let answer = "";

    for (let start = 0; start < s.length; start++) {
        for (let end = start; end < s.length; end++) {
            const substring = s.slice(start, end + 1);
            const window = buildFrequencyMap(substring);

            if (containsAllRequired(window, need)) {
                if (answer === "" || substring.length < answer.length) {
                    answer = substring;
                }
            }
        }
    }

    return answer;
}

function buildFrequencyMap(str) {
    const map = new Map();

    for (const char of str) {
        map.set(char, (map.get(char) || 0) + 1);
    }

    return map;
}

function containsAllRequired(window, need) {
    for (const [char, requiredCount] of need) {
        if ((window.get(char) || 0) < requiredCount) {
            return false;
        }
    }

    return true;
}


/********************************************************************************************
 * SOLUTION 2: BETTER BRUTE FORCE - EXPAND UNTIL VALID
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * For each start index, expand the end pointer until the substring becomes valid.
 * Once valid, update answer and stop expanding for that start.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * For each fixed start, the first valid end gives the smallest valid substring starting at
 * that start.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Build frequency map for t.
 * 2. For every start index:
 *      a. Create empty window map.
 *      b. Expand end pointer.
 *      c. Once current substring becomes valid, update answer and break.
 * 3. Return answer.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n^2 * m)
 *
 * n = length of s
 * m = number of unique characters in t
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(m)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Good stepping stone before sliding window.
 * Still not optimal.
 *
 ********************************************************************************************/

function minWindowBetterBruteForce(s, t) {
    if (t.length > s.length) return "";

    const need = buildFrequencyMap(t);
    let answer = "";

    for (let start = 0; start < s.length; start++) {
        const window = new Map();

        for (let end = start; end < s.length; end++) {
            const char = s[end];
            window.set(char, (window.get(char) || 0) + 1);

            if (containsAllRequired(window, need)) {
                const substring = s.slice(start, end + 1);

                if (answer === "" || substring.length < answer.length) {
                    answer = substring;
                }

                break;
            }
        }
    }

    return answer;
}


/********************************************************************************************
 * SOLUTION 3: SLIDING WINDOW WITH MAPS
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Use a sliding window [left...right].
 *
 * Expand right until the window contains all required characters.
 * Then shrink left to make the window as small as possible.
 *
 * ------------------------------------------------------------------------------------------
 * Key Idea:
 * ------------------------------------------------------------------------------------------
 * We need to know when the window is valid.
 *
 * need map:
 * characters and counts required from t
 *
 * window map:
 * characters and counts currently inside the window
 *
 * have:
 * number of characters whose required count is satisfied
 *
 * needCount:
 * number of unique characters required
 *
 * If have === needCount, current window is valid.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * The right pointer grows the window until it becomes valid.
 * The left pointer shrinks the window while it remains valid.
 *
 * This guarantees we test every useful candidate window without checking every substring.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Build need map from t.
 * 2. Create empty window map.
 * 3. Set have = 0.
 * 4. Set needCount = number of unique characters in t.
 * 5. Move right across s:
 *      a. Add s[right] to window.
 *      b. If s[right] count now satisfies need count, increase have.
 *      c. While have === needCount:
 *            i. update answer if current window is smaller
 *           ii. remove s[left] from window
 *          iii. if removing makes count too small, decrease have
 *           iv. move left
 * 6. Return minimum substring.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n + m)
 *
 * n = length of s
 * m = length of t
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(m)
 *
 * Actually O(unique characters in s and t), but usually described as O(m).
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * This is the best general solution.
 * Works for uppercase, lowercase, symbols, etc.
 *
 ********************************************************************************************/

function minWindowSlidingWindowMap(s, t) {
    if (t.length > s.length) return "";

    const need = buildFrequencyMap(t);
    const window = new Map();

    let have = 0;
    const needCount = need.size;

    let left = 0;
    let minLength = Infinity;
    let resultStart = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        window.set(rightChar, (window.get(rightChar) || 0) + 1);

        if (
            need.has(rightChar) &&
            window.get(rightChar) === need.get(rightChar)
        ) {
            have++;
        }

        while (have === needCount) {
            const windowLength = right - left + 1;

            if (windowLength < minLength) {
                minLength = windowLength;
                resultStart = left;
            }

            const leftChar = s[left];
            window.set(leftChar, window.get(leftChar) - 1);

            if (
                need.has(leftChar) &&
                window.get(leftChar) < need.get(leftChar)
            ) {
                have--;
            }

            left++;
        }
    }

    return minLength === Infinity
        ? ""
        : s.slice(resultStart, resultStart + minLength);
}


/********************************************************************************************
 * SOLUTION 4: SLIDING WINDOW WITH ASCII ARRAY
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Same sliding window idea, but use arrays instead of Map.
 *
 * Since JavaScript strings can include many characters, a Map is more flexible.
 * But if input is ASCII, an array of size 128 works.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Character counts are stored by char code.
 *
 * Example:
 * 'A'.charCodeAt(0) = 65
 *
 * need[65] stores how many A's are required.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Create need array of size 128.
 * 2. Count characters of t.
 * 3. required = number of characters still needed.
 * 4. Expand right:
 *      a. If current char is needed, decrease required.
 *      b. Decrease need count.
 * 5. When required === 0, window is valid.
 * 6. Shrink left:
 *      a. Update answer.
 *      b. Add left char back to need.
 *      c. If that char becomes needed again, increase required.
 * 7. Return answer.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n + m)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(128), which is O(1)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Good optimized solution when character set is ASCII.
 * Map version is easier to explain.
 *
 ********************************************************************************************/

function minWindowAsciiArray(s, t) {
    if (t.length > s.length) return "";

    const need = new Array(128).fill(0);

    for (const char of t) {
        need[char.charCodeAt(0)]++;
    }

    let required = t.length;
    let left = 0;
    let minLength = Infinity;
    let resultStart = 0;

    for (let right = 0; right < s.length; right++) {
        const rightCode = s.charCodeAt(right);

        if (need[rightCode] > 0) {
            required--;
        }

        need[rightCode]--;

        while (required === 0) {
            const windowLength = right - left + 1;

            if (windowLength < minLength) {
                minLength = windowLength;
                resultStart = left;
            }

            const leftCode = s.charCodeAt(left);
            need[leftCode]++;

            if (need[leftCode] > 0) {
                required++;
            }

            left++;
        }
    }

    return minLength === Infinity
        ? ""
        : s.slice(resultStart, resultStart + minLength);
}


/********************************************************************************************
 * MAIN RECOMMENDED SOLUTION
 *
 * ------------------------------------------------------------------------------------------
 * Use this in interviews:
 * ------------------------------------------------------------------------------------------
 * Sliding Window + Hash Map
 *
 * Reason:
 *  - O(n + m) time
 *  - Easy to explain
 *  - Handles duplicate characters in t
 *  - Works for general characters
 *  - Standard MAANG-style solution
 *
 ********************************************************************************************/

function minWindow(s, t) {
    if (t.length > s.length) return "";

    const need = new Map();
    const window = new Map();

    for (const char of t) {
        need.set(char, (need.get(char) || 0) + 1);
    }

    let have = 0;
    const needCount = need.size;

    let left = 0;
    let minLength = Infinity;
    let resultStart = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        window.set(rightChar, (window.get(rightChar) || 0) + 1);

        if (
            need.has(rightChar) &&
            window.get(rightChar) === need.get(rightChar)
        ) {
            have++;
        }

        while (have === needCount) {
            const windowLength = right - left + 1;

            if (windowLength < minLength) {
                minLength = windowLength;
                resultStart = left;
            }

            const leftChar = s[left];
            window.set(leftChar, window.get(leftChar) - 1);

            if (
                need.has(leftChar) &&
                window.get(leftChar) < need.get(leftChar)
            ) {
                have--;
            }

            left++;
        }
    }

    return minLength === Infinity
        ? ""
        : s.slice(resultStart, resultStart + minLength);
}


/********************************************************************************************
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 *
 * s = "ADOBECODEBANC"
 * t = "ABC"
 *
 * need:
 * A: 1
 * B: 1
 * C: 1
 *
 * needCount = 3
 * have = 0
 *
 * ------------------------------------------------------------------------------------------
 * Expand right until all required characters are included.
 *
 * s = A D O B E C O D E B A N C
 *     ^
 *     right
 *
 * Window = "A"
 * A requirement satisfied.
 *
 * have = 1
 *
 * ------------------------------------------------------------------------------------------
 * Continue expanding:
 *
 * Window = "ADOB"
 *
 * A satisfied
 * B satisfied
 *
 * have = 2
 *
 * ------------------------------------------------------------------------------------------
 * Continue expanding:
 *
 * Window = "ADOBEC"
 *
 * A satisfied
 * B satisfied
 * C satisfied
 *
 * have = 3
 *
 * Now window is valid.
 *
 * Current answer = "ADOBEC"
 *
 * ------------------------------------------------------------------------------------------
 * Now shrink from left:
 *
 * Remove A.
 *
 * Window becomes "DOBEC"
 *
 * A is missing now.
 * have becomes 2.
 *
 * Stop shrinking because window is invalid.
 *
 * ------------------------------------------------------------------------------------------
 * Continue expanding right:
 *
 * Eventually window becomes:
 *
 * "DOBECODEBA"
 *
 * It contains A, B, C.
 *
 * Valid again.
 *
 * Shrink from left as much as possible.
 *
 * ------------------------------------------------------------------------------------------
 * Final useful window:
 *
 * s = A D O B E C O D E B A N C
 *                     [B A N C]
 *
 * "BANC" contains:
 * A: 1
 * B: 1
 * C: 1
 *
 * Length = 4
 *
 * Final Answer = "BANC"
 *
 ********************************************************************************************/


/********************************************************************************************
 * IMPORTANT DETAIL: WHY have AND needCount WORK
 *
 * ------------------------------------------------------------------------------------------
 * needCount:
 * Number of unique characters we need to satisfy.
 *
 * Example:
 * t = "AABC"
 *
 * need:
 * A: 2
 * B: 1
 * C: 1
 *
 * needCount = 3
 *
 * ------------------------------------------------------------------------------------------
 * have:
 * Number of unique characters currently satisfied in the window.
 *
 * A is satisfied only when window has at least 2 A's.
 * B is satisfied only when window has at least 1 B.
 * C is satisfied only when window has at least 1 C.
 *
 * When:
 *
 * have === needCount
 *
 * It means all required character counts are satisfied.
 *
 ********************************************************************************************/


/********************************************************************************************
 * REVISION-FRIENDLY NOTES
 *
 * ------------------------------------------------------------------------------------------
 * Pattern Used:
 * ------------------------------------------------------------------------------------------
 * Variable-size Sliding Window + Hash Map
 *
 * ------------------------------------------------------------------------------------------
 * Memory Hook:
 * ------------------------------------------------------------------------------------------
 * "Expand until valid, shrink until invalid."
 *
 * ------------------------------------------------------------------------------------------
 * Interview Explanation:
 * ------------------------------------------------------------------------------------------
 * I first count the required characters from t.
 *
 * Then I use a sliding window over s.
 * I expand the right pointer to include characters until the window satisfies all required
 * character counts.
 *
 * Once the window is valid, I try shrinking from the left to make it as small as possible.
 * Every time the window is valid, I update the minimum answer.
 *
 * The window is valid when the number of satisfied unique characters equals the number of
 * required unique characters.
 *
 * ------------------------------------------------------------------------------------------
 * Edge Cases:
 * ------------------------------------------------------------------------------------------
 * 1. t is longer than s:
 *      s = "a"
 *      t = "aa"
 *      Answer = ""
 *
 * 2. No valid window:
 *      s = "abc"
 *      t = "z"
 *      Answer = ""
 *
 * 3. Exact match:
 *      s = "abc"
 *      t = "abc"
 *      Answer = "abc"
 *
 * 4. Duplicate characters in t:
 *      s = "AAABBC"
 *      t = "AABC"
 *      Answer must include two A's.
 *
 * 5. Single character:
 *      s = "a"
 *      t = "a"
 *      Answer = "a"
 *
 ********************************************************************************************/


/********************************************************************************************
 * TEST CASES
 ********************************************************************************************/

function runTests() {
    const testCases = [
        {
            s: "ADOBECODEBANC",
            t: "ABC",
            expected: "BANC"
        },
        {
            s: "a",
            t: "a",
            expected: "a"
        },
        {
            s: "a",
            t: "aa",
            expected: ""
        },
        {
            s: "abc",
            t: "z",
            expected: ""
        },
        {
            s: "abc",
            t: "abc",
            expected: "abc"
        },
        {
            s: "AAABBC",
            t: "AABC",
            expected: "AABBC"
        },
        {
            s: "ab",
            t: "b",
            expected: "b"
        },
        {
            s: "bba",
            t: "ab",
            expected: "ba"
        }
    ];

    for (const { s, t, expected } of testCases) {
        const result = minWindow(s, t);

        console.log(
            `s = "${s}", t = "${t}" | expected = "${expected}" | result = "${result}" | ${result === expected ? "PASS" : "FAIL"
            }`
        );
    }
}

runTests();