/**
 * NeetCode / LeetCode Style Problem
 * =================================
 * Problem: Encode and Decode Strings
 *
 * Goal:
 * Design an algorithm to encode a list of strings into a single string,
 * and decode that single string back into the original list of strings.
 *
 * Important:
 * - The strings may contain any characters.
 * - We must be able to recover the exact original list.
 * - Encoding/decoding should be reliable.
 *
 * ------------------------------------------------------------
 * WHY THIS PROBLEM MATTERS
 * ------------------------------------------------------------
 * This problem tests:
 * 1. String building
 * 2. Careful parsing
 * 3. Designing reversible formats
 * 4. Thinking like a systems engineer:
 *    "How do I store data so I can reconstruct it safely?"
 *
 * This is less about built-in functions and more about designing
 * a robust protocol / format.
 *
 * ============================================================
 * COMMON IDEAS / POSSIBLE APPROACHES
 * ============================================================
 *
 * 1. Brute Force Thought: Join using a delimiter
 *    Example: ["neet","code","love","you"] -> "neet#code#love#you"
 *    Problem: What if a string itself contains "#"? Then decoding breaks.
 *
 * 2. Escape + Delimiter approach
 *    Use a delimiter, but escape special characters inside strings.
 *    Works, but more complex and error-prone.
 *
 * 3. Length Prefix approach (RECOMMENDED / OPTIMAL)
 *    Store each string as:
 *       <length>#<string>
 *    Example:
 *       "4#neet4#code4#love3#you"
 *    Then decode by:
 *       - read length until '#'
 *       - take exactly that many characters after '#'
 *
 * This is the most common clean solution.
 *
 * ============================================================
 * SOLUTION 1: NAIVE DELIMITER JOIN (NOT SAFE / EDUCATIONAL ONLY)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * The first natural thought is:
 * - join all strings using a special character like '#'
 * - later split by '#'
 *
 * Example:
 * ["a", "b", "c"] => "a#b#c"
 *
 * Why people think of it:
 * -----------------------
 * It is simple and fast.
 *
 * Why it fails:
 * -------------
 * If the original strings contain '#', decoding becomes ambiguous.
 *
 * Example:
 * ["ab#c", "xyz"]
 * Encoded => "ab#c#xyz"
 * Decoding by split('#') gives:
 * ["ab", "c", "xyz"]
 * which is WRONG.
 *
 * So this is NOT a valid general solution.
 */

class CodecNaiveDelimiter {
    /**
     * @param {string[]} strs
     * @return {string}
     */
    encode(strs) {
        return strs.join("#");
    }

    /**
     * @param {string} s
     * @return {string[]}
     */
    decode(s) {
        // This only works if we are 100% sure no string contains '#'
        return s.split("#");
    }
}

/**
 * Step-by-step:
 * -------------
 * Encode:
 * 1. Take array of strings
 * 2. Join them with '#'
 *
 * Decode:
 * 1. Split the full string by '#'
 *
 * Time Complexity:
 * ----------------
 * Encode: O(totalCharacters)
 * Decode: O(totalCharacters)
 *
 * Space Complexity:
 * -----------------
 * Encode: O(totalCharacters)
 * Decode: O(totalCharacters)
 *
 * When to use:
 * ------------
 * Almost never in interview unless interviewer explicitly says:
 * "Assume delimiter never appears in strings."
 *
 * Otherwise, do NOT use this solution.
 */

/**
 * ============================================================
 * SOLUTION 2: DELIMITER + ESCAPING SPECIAL CHARACTERS
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * We can try to make delimiter-based encoding safer.
 *
 * Example idea:
 * - Use '/' as escape character
 * - Use '#'
 * - Replace every '/' with '//'
 * - Replace every '#' with '/#'
 * - Join all encoded strings with '#'
 *
 * Then while decoding:
 * - read characters
 * - if current character is escape '/', take next character literally
 * - if current character is unescaped '#', that marks boundary
 *
 * Why it works:
 * -------------
 * Because delimiter '#' no longer has meaning when escaped.
 * Also the escape character itself is escaped, so parsing stays reversible.
 *
 * Downside:
 * ---------
 * This is more complicated than necessary.
 * Easier to make bugs.
 * The length-prefix solution is cleaner and usually preferred.
 */

class CodecEscapeDelimiter {
    /**
     * @param {string[]} strs
     * @return {string}
     */
    encode(strs) {
        const encodedParts = [];

        for (const str of strs) {
            let escaped = "";

            for (const ch of str) {
                if (ch === "/") {
                    escaped += "//";
                } else if (ch === "#") {
                    escaped += "/#";
                } else {
                    escaped += ch;
                }
            }

            encodedParts.push(escaped);
        }

        return encodedParts.join("#");
    }

    /**
     * @param {string} s
     * @return {string[]}
     */
    decode(s) {
        const result = [];
        let current = "";

        let i = 0;
        while (i < s.length) {
            if (s[i] === "/") {
                // Next character is literal
                i++;
                if (i < s.length) {
                    current += s[i];
                }
            } else if (s[i] === "#") {
                // End of one encoded string
                result.push(current);
                current = "";
            } else {
                current += s[i];
            }
            i++;
        }

        // Need to push last string as well
        result.push(current);

        return result;
    }
}

/**
 * Step-by-step:
 * -------------
 * Encode:
 * 1. For each string:
 *    - escape '/' as '//'
 *    - escape '#' as '/#'
 * 2. Join all processed strings with '#'
 *
 * Decode:
 * 1. Traverse character by character
 * 2. If '/' appears, next character is literal
 * 3. If unescaped '#' appears, current string ends
 * 4. Continue until end
 *
 * Time Complexity:
 * ----------------
 * Encode: O(totalCharacters)
 * Decode: O(totalCharacters)
 *
 * Space Complexity:
 * -----------------
 * O(totalCharacters)
 *
 * When to use:
 * ------------
 * Use only if interviewer asks about escaping / custom protocol design.
 * Otherwise, length-prefix is better and cleaner.
 */

/**
 * ============================================================
 * SOLUTION 3: LENGTH PREFIX ENCODING (MAIN RECOMMENDED SOLUTION)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Instead of relying on a delimiter between strings,
 * we store the length of each string before the string itself.
 *
 * Format:
 * -------
 * <length>#<string>
 *
 * Example:
 * ["neet", "code", "love", "you"]
 *
 * becomes:
 * "4#neet4#code4#love3#you"
 *
 * Now decoding is easy:
 * - Read digits until '#'
 * - Convert them to a number => length
 * - Read exactly 'length' characters after '#'
 * - That chunk is one original string
 * - Repeat
 *
 * Why this works:
 * ---------------
 * Even if the string contains '#', numbers, spaces, symbols,
 * or even empty string "", decoding still works.
 *
 * Why?
 * Because once we know the exact length,
 * we do NOT care what characters are inside the string.
 * We simply take the next 'length' characters as-is.
 *
 * This is the key idea.
 */

class Codec {
    /**
     * ENCODE
     * ------
     * Convert array of strings into one single string.
     *
     * @param {string[]} strs
     * @return {string}
     */
    encode(strs) {
        let encoded = "";

        for (const str of strs) {
            encoded += str.length + "#" + str;
        }

        return encoded;
    }

    /**
     * DECODE
     * ------
     * Convert the encoded string back into the original array.
     *
     * @param {string} s
     * @return {string[]}
     */
    decode(s) {
        const result = [];
        let i = 0;

        while (i < s.length) {
            // 1. Find the position of '#'
            let j = i;
            while (s[j] !== "#") {
                j++;
            }

            // 2. Length is the substring from i to j-1
            const length = Number(s.slice(i, j));

            // 3. Actual string starts right after '#'
            const start = j + 1;
            const end = start + length;

            // 4. Extract exactly 'length' characters
            result.push(s.slice(start, end));

            // 5. Move i to next encoded block
            i = end;
        }

        return result;
    }
}

/**
 * ------------------------------------------------------------
 * WHY THE LENGTH-PREFIX SOLUTION WORKS
 * ------------------------------------------------------------
 *
 * Suppose encoded chunk is:
 * 5#hello
 *
 * Decoder reads:
 * - digits until '#': "5"
 * - length = 5
 * - next 5 characters = "hello"
 *
 * There is no ambiguity.
 *
 * Even if the string is:
 * "#a#b#"
 *
 * encoded form would be:
 * 5##a#b#
 *
 * Decoder reads:
 * - length = 5
 * - next 5 chars => "#a#b#"
 *
 * Still correct.
 *
 * So special characters inside the original strings do not matter.
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * Encode Example:
 * ---------------
 * Input:
 * ["leet", "code", ""]
 *
 * For "leet":
 *   length = 4
 *   encoded piece = "4#leet"
 *
 * For "code":
 *   length = 4
 *   encoded piece = "4#code"
 *
 * For "":
 *   length = 0
 *   encoded piece = "0#"
 *
 * Final encoded string:
 * "4#leet4#code0#"
 *
 *
 * Decode Example:
 * ---------------
 * Encoded:
 * "4#leet4#code0#"
 *
 * Start i = 0
 *
 * 1st block:
 * - read until '#': "4"
 * - length = 4
 * - take next 4 chars => "leet"
 * - move i forward
 *
 * 2nd block:
 * - read until '#': "4"
 * - length = 4
 * - take next 4 chars => "code"
 * - move i forward
 *
 * 3rd block:
 * - read until '#': "0"
 * - length = 0
 * - take next 0 chars => ""
 * - done
 *
 * Output:
 * ["leet", "code", ""]
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 * ------------------------------------------------------------
 *
 * Example:
 * strs = ["hi", "abc", ""]
 *
 * Encoding:
 * ---------
 * "hi"  => 2#hi
 * "abc" => 3#abc
 * ""    => 0#
 *
 * Final:
 * 2#hi3#abc0#
 *
 * Index view:
 * -----------
 *   0 1 2 3 4 5 6 7 8 9
 *   2 # h i 3 # a b c 0 #
 *
 * Actually as continuous string:
 * "2#hi3#abc0#"
 *
 * Decode:
 * -------
 * i = 0
 * s[i...]
 * "2#hi3#abc0#"
 *  ^
 *
 * Read until '#':
 * length = 2
 * next 2 chars => "hi"
 * move i after "hi"
 *
 * i now points to:
 * "3#abc0#"
 *  ^
 *
 * Read until '#':
 * length = 3
 * next 3 chars => "abc"
 * move i after "abc"
 *
 * i now points to:
 * "0#"
 *  ^
 *
 * Read until '#':
 * length = 0
 * next 0 chars => ""
 *
 * Result:
 * ["hi", "abc", ""]
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Let:
 * n = number of strings
 * m = total number of characters across all strings
 *
 * Encode:
 * -------
 * We visit each character once while building output.
 * Time: O(m)
 *
 * We also store output string.
 * Space: O(m)
 *
 * Decode:
 * -------
 * We scan through the encoded string once.
 * Time: O(m)
 *
 * Output array and extracted strings take O(m).
 * Space: O(m)
 *
 * Overall:
 * --------
 * Time: O(m)
 * Space: O(m)
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use length-prefix encoding when:
 * - You need reliable serialization of strings
 * - Input strings may contain any characters
 * - You want a clean and interview-friendly answer
 * - You want to avoid delimiter ambiguity
 *
 * This is the best general-purpose interview solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION (SEPARATE CLEAN VERSION)
 * ============================================================
 *
 * This is the one you should present first in interviews.
 * Clean, short, and robust.
 */

class CodecRecommended {
    /**
     * @param {string[]} strs
     * @return {string}
     */
    encode(strs) {
        let result = "";

        for (const str of strs) {
            result += `${str.length}#${str}`;
        }

        return result;
    }

    /**
     * @param {string} s
     * @return {string[]}
     */
    decode(s) {
        const result = [];
        let i = 0;

        while (i < s.length) {
            let j = i;

            while (s[j] !== "#") {
                j++;
            }

            const len = Number(s.slice(i, j));
            const word = s.slice(j + 1, j + 1 + len);

            result.push(word);
            i = j + 1 + len;
        }

        return result;
    }
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION (HOW TO SAY IT)
 * ============================================================
 *
 * "A simple delimiter-based join is unsafe because strings may contain
 * the delimiter itself. So instead, I encode each string as:
 *
 *    length + '#' + actualString
 *
 * During decoding, I first read the number until '#', which tells me
 * exactly how many characters belong to the next string. Then I extract
 * that many characters and repeat.
 *
 * This makes the encoding reversible for any input characters, including
 * '#', spaces, digits, and even empty strings."
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Empty list
 *    Input: []
 *    Encoded: ""
 *    Decoded: []
 *
 * 2. Empty strings
 *    Input: ["", ""]
 *    Encoded: "0#0#"
 *    Decoded: ["", ""]
 *
 * 3. Strings containing '#'
 *    Input: ["ab#c", "d#"]
 *    Works because length tells us exact boundaries.
 *
 * 4. Strings containing digits
 *    Input: ["123", "45"]
 *    Still works, because digits inside string are not confused with length.
 *
 * 5. Strings containing spaces or special characters
 *    Input: ["hello world", "!@#$", "a/b/c"]
 *    Still works.
 *
 * 6. One very large string
 *    Still works as long as memory allows.
 */

/**
 * ============================================================
 * REVISION-FRIENDLY NOTES
 * ============================================================
 *
 * Pattern Used:
 * -------------
 * - String encoding / decoding
 * - Design reversible representation
 * - Parsing with pointers
 *
 * Memory Hook:
 * ------------
 * "Store size before data."
 *
 * Think:
 * If separator is risky, prefix the length.
 *
 * Another memory trick:
 * "Read count, then read chunk."
 *
 * Interview Explanation:
 * ----------------------
 * - Delimiter alone is unsafe
 * - Length prefix removes ambiguity
 * - Decode using two pointers:
 *   one to read length, one to read the string chunk
 *
 * Why this is optimal:
 * --------------------
 * - Linear time
 * - Robust for all characters
 * - Clean implementation
 *
 * Common mistake:
 * ---------------
 * Using split('#') directly.
 * That fails when '#' appears inside strings.
 *
 * Another common mistake:
 * -----------------------
 * Forgetting to handle empty strings.
 * But length-prefix handles them naturally:
 * empty string => "0#"
 *
 * Best way to remember:
 * ---------------------
 * Encode each word like a packet:
 * [length][separator][payload]
 *
 * Real-world analogy:
 * -------------------
 * Like networking / message protocols:
 * header tells how many bytes to read next.
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const codec = new CodecRecommended();

    const testCases = [
        {
            input: ["neet", "code", "love", "you"],
            description: "Basic normal strings"
        },
        {
            input: ["hello", "world"],
            description: "Two strings"
        },
        {
            input: [""],
            description: "Single empty string"
        },
        {
            input: ["", ""],
            description: "Multiple empty strings"
        },
        {
            input: [],
            description: "Empty array"
        },
        {
            input: ["ab#c", "de#f", "#"],
            description: "Strings containing delimiter character"
        },
        {
            input: ["123", "45", "6"],
            description: "Strings containing digits"
        },
        {
            input: ["hello world", "a/b/c", "!@#$%^&*()"],
            description: "Spaces and special characters"
        },
        {
            input: ["longstring".repeat(5), "x", ""],
            description: "Mixed sizes"
        }
    ];

    for (const { input, description } of testCases) {
        const encoded = codec.encode(input);
        const decoded = codec.decode(encoded);

        console.log("--------------------------------------------------");
        console.log("Test:", description);
        console.log("Input   :", JSON.stringify(input));
        console.log("Encoded :", encoded);
        console.log("Decoded :", JSON.stringify(decoded));
        console.log("Pass    :", JSON.stringify(input) === JSON.stringify(decoded));
    }
}

runTests();

/**
 * ============================================================
 * FINAL QUICK REVISION SUMMARY
 * ============================================================
 *
 * Best Solution:
 * - Length Prefix Encoding
 *
 * Core Formula:
 * - Encode each string as:
 *   str.length + "#" + str
 *
 * Decode Logic:
 * - Read number until '#'
 * - Convert to length
 * - Take next 'length' characters
 *
 * Complexity:
 * - Encode: O(totalChars)
 * - Decode: O(totalChars)
 * - Space: O(totalChars)
 *
 * One-line interview summary:
 * ---------------------------
 * "I avoid delimiter ambiguity by prefixing each string with its length,
 * then decode by reading the length and extracting that exact number of characters."
 */