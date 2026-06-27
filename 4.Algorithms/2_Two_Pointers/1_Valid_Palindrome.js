/**
 * NeetCode / LeetCode Style Problem
 * =================================
 * Problem: Valid Palindrome
 *
 * Goal:
 * Given a string s, determine if it is a palindrome,
 * considering ONLY alphanumeric characters and ignoring cases.
 *
 * ------------------------------------------------------------
 * EXAMPLES
 * ------------------------------------------------------------
 * Input:  s = "A man, a plan, a canal: Panama"
 * Output: true
 *
 * Input:  s = "race a car"
 * Output: false
 *
 * Input:  s = " "
 * Output: true
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is a classic string + two pointers problem.
 *
 * It teaches:
 * 1. String cleaning / preprocessing
 * 2. Two pointer technique
 * 3. Character validation
 * 4. Case normalization
 *
 * This pattern appears in:
 * - Valid Palindrome II
 * - Longest Palindrome
 * - String matching problems
 *
 * ============================================================
 * PROBLEM UNDERSTANDING
 * ============================================================
 *
 * We need to:
 * 1. Ignore non-alphanumeric characters
 * 2. Ignore case differences
 * 3. Check if string reads same forward and backward
 *
 * Example:
 * "A man, a plan, a canal: Panama"
 *
 * Cleaned:
 * "amanaplanacanalpanama"
 *
 * Check:
 * Forward == Reverse → palindrome
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force (clean + reverse)
 * 2. Two pointers with cleaned string
 * 3. Two pointers without extra space (optimal)
 *
 * ============================================================
 * SOLUTION 1: CLEAN STRING + REVERSE
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * 1. Remove non-alphanumeric characters
 * 2. Convert to lowercase
 * 3. Reverse string
 * 4. Compare original cleaned string with reversed
 *
 * Why it works:
 * -------------
 * Palindrome means same forward and backward.
 */

function isPalindromeBruteForce(s) {
    // Remove non-alphanumeric and lowercase
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");

    const reversed = cleaned.split("").reverse().join("");

    return cleaned === reversed;
}

/**
 * Step-by-step:
 * -------------
 * s = "A man, a plan, a canal: Panama"
 *
 * cleaned = "amanaplanacanalpanama"
 * reversed = "amanaplanacanalpanama"
 *
 * return true
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
 * - Simple and readable
 * - Not optimal in space
 */

/**
 * ============================================================
 * SOLUTION 2: TWO POINTERS WITH CLEANED STRING
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * 1. Clean string first
 * 2. Use two pointers:
 *    left → start
 *    right → end
 *
 * Compare:
 * - if mismatch → return false
 * - else move inward
 */

function isPalindromeTwoPointersClean(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");

    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

/**
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
 * - Cleaner logic than reverse
 * - Still uses extra space
 */

/**
 * ============================================================
 * SOLUTION 3: TWO POINTERS WITHOUT EXTRA SPACE (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Use two pointers directly on original string.
 *
 * Steps:
 * 1. left = 0, right = n-1
 * 2. Skip non-alphanumeric characters
 * 3. Compare lowercase characters
 * 4. Move inward
 *
 * Why it works:
 * -------------
 * We simulate the cleaned string without actually building it.
 */

function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    const isAlphaNum = (char) => {
        return /[a-z0-9]/i.test(char);
    };

    while (left < right) {
        // Skip non-alphanumeric (left)
        while (left < right && !isAlphaNum(s[left])) {
            left++;
        }

        // Skip non-alphanumeric (right)
        while (left < right && !isAlphaNum(s[right])) {
            right--;
        }

        // Compare
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

/**
 * ------------------------------------------------------------
 * WHY THIS WORKS
 * ------------------------------------------------------------
 *
 * We only compare valid characters.
 *
 * Instead of building a new string,
 * we skip invalid characters dynamically.
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Initialize two pointers:
 *    left = 0
 *    right = n-1
 *
 * 2. Move left forward until alphanumeric
 * 3. Move right backward until alphanumeric
 *
 * 4. Compare:
 *    - if mismatch → return false
 *    - else continue
 *
 * 5. If loop finishes → return true
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAM
 * ------------------------------------------------------------
 *
 * s = "A man, a plan, a canal: Panama"
 *
 * left -> 'A'
 * right -> 'a'
 * match (case-insensitive)
 *
 * move inward:
 *
 * skip spaces and punctuation
 *
 * eventually compare:
 * 'm' with 'm'
 * 'a' with 'a'
 * ...
 *
 * all match → true
 */

/**
 * ------------------------------------------------------------
 * VISUAL FLOW
 * ------------------------------------------------------------
 *
 * A man, a plan, a canal: Panama
 * ^                           ^
 *
 * skip non-alphanumeric
 * compare letters
 *
 * keep moving inward
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
 * No extra storage used.
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use this when:
 * - interviewer asks for optimal solution
 * - memory optimization matters
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION
 * ============================================================
 */

function isPalindromeRecommended(s) {
    let left = 0;
    let right = s.length - 1;

    const isAlphaNum = (char) => /[a-z0-9]/i.test(char);

    while (left < right) {
        while (left < right && !isAlphaNum(s[left])) left++;
        while (left < right && !isAlphaNum(s[right])) right--;

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "I use two pointers starting from both ends.
 * I skip non-alphanumeric characters and compare characters
 * case-insensitively. If any mismatch occurs, I return false.
 * Otherwise I continue inward. If the loop finishes, it is a palindrome."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Not ignoring special characters
 * 2. Forgetting lowercase conversion
 * 3. Comparing before skipping invalid characters
 * 4. Using extra space unnecessarily
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Empty string → true
 * 2. Only special characters → true
 * 3. Single character → true
 * 4. Mixed case → ignore case
 */

/**
 * ============================================================
 * REVISION NOTES
 * ============================================================
 *
 * Pattern:
 * --------
 * Two Pointers
 *
 * Memory Hook:
 * ------------
 * "Skip invalid, compare valid"
 *
 * Key Idea:
 * ---------
 * Clean logically, not physically
 *
 * Interview Flow:
 * ---------------
 * Clean string → Two pointers → Optimize space
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        { input: "A man, a plan, a canal: Panama", expected: true },
        { input: "race a car", expected: false },
        { input: " ", expected: true },
        { input: "a.", expected: true },
        { input: "0P", expected: false }
    ];

    const methods = [
        { name: "Brute Force", fn: isPalindromeBruteForce },
        { name: "Clean Two Ptr", fn: isPalindromeTwoPointersClean },
        { name: "Optimal", fn: isPalindrome },
        { name: "Recommended", fn: isPalindromeRecommended }
    ];

    for (const test of testCases) {
        console.log("=======================================");
        console.log(`Input: "${test.input}"`);
        console.log(`Expected: ${test.expected}`);

        for (const method of methods) {
            const result = method.fn(test.input);
            console.log(`${method.name.padEnd(14)} => ${result} | Pass: ${result === test.expected}`);
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
 * Two pointers without extra space
 *
 * Core Idea:
 * ----------
 * Skip non-alphanumeric, compare lowercase chars
 *
 * Complexity:
 * -----------
 * Time: O(n)
 * Space: O(1)
 *
 * One-line:
 * ---------
 * "Use two pointers, skip invalid characters, and compare case-insensitively."
 */