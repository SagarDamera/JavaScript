/********************************************************************************************
 * NeetCode: Arrays & Hashing - Valid Anagram
 *
 * Pattern:
 * - Hash Map
 * - Frequency Counting
 *
 * Problem Statement:
 * Given two strings s and t, return true if t is an anagram of s.
 * Return false otherwise.
 *
 * An anagram means:
 * - Both strings use the same characters.
 * - Each character appears the same number of times.
 * - The order can be different.
 *
 * Example 1:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 *
 * Explanation:
 * Both strings contain the same characters with the same frequency:
 * a -> 3
 * n -> 1
 * g -> 1
 * r -> 1
 * m -> 1
 *
 * Example 2:
 * Input: s = "rat", t = "car"
 * Output: false
 *
 * Explanation:
 * s and t do not contain the same characters.
 ********************************************************************************************/

/********************************************************************************************
 * Approach / Intuition
 *
 * We need to check if both strings have the same characters with the same counts.
 *
 * The best interview-ready approach is frequency counting.
 *
 * Since the problem usually uses lowercase English letters, we can use an array of size 26.
 *
 * Idea:
 * - Count characters from string s.
 * - Remove counts using characters from string t.
 * - At the end, all counts should become 0.
 *
 * If any count is not 0, the strings are not anagrams.
 ********************************************************************************************/

/********************************************************************************************
 * Why This Optimal Solution Works
 *
 * An anagram must have the exact same character frequency.
 *
 * Example:
 * s = "anagram"
 * t = "nagaram"
 *
 * Both have:
 * a = 3
 * n = 1
 * g = 1
 * r = 1
 * m = 1
 *
 * By adding counts for s and subtracting counts for t,
 * matching characters cancel out.
 *
 * If the strings are valid anagrams, every count becomes 0.
 * If any character is extra or missing, some count will not be 0.
 ********************************************************************************************/

/********************************************************************************************
 * Step-by-Step Explanation
 *
 * 1. First check if s and t have different lengths.
 * 2. If lengths are different, return false immediately.
 * 3. Create a frequency array of size 26.
 * 4. Loop through both strings.
 * 5. For each character in s, increase its count.
 * 6. For each character in t, decrease its count.
 * 7. After the loop, check all counts.
 * 8. If every count is 0, return true.
 * 9. Otherwise, return false.
 ********************************************************************************************/

/********************************************************************************************
 * Dry Run / Diagrammatic Explanation
 *
 * Input:
 * s = "anagram"
 * t = "nagaram"
 *
 * freq = array of 26 zeros
 *
 * We increase count for s characters
 * and decrease count for t characters.
 *
 * Character comparison by frequency:
 *
 * s characters:
 * a n a g r a m
 *
 * t characters:
 * n a g a r a m
 *
 * Frequency changes:
 *
 * For s:
 * a +3
 * n +1
 * g +1
 * r +1
 * m +1
 *
 * For t:
 * n -1
 * a -3
 * g -1
 * r -1
 * m -1
 *
 * Final counts:
 * a: 3 - 3 = 0
 * n: 1 - 1 = 0
 * g: 1 - 1 = 0
 * r: 1 - 1 = 0
 * m: 1 - 1 = 0
 *
 * All counts are 0.
 *
 * Final Output:
 * true
 *
 * --------------------------------------------------
 *
 * Input:
 * s = "rat"
 * t = "car"
 *
 * For s:
 * r +1
 * a +1
 * t +1
 *
 * For t:
 * c -1
 * a -1
 * r -1
 *
 * Final counts:
 * r: 1 - 1 = 0
 * a: 1 - 1 = 0
 * t: 1
 * c: -1
 *
 * Not all counts are 0.
 *
 * Final Output:
 * false
 ********************************************************************************************/

/********************************************************************************************
 * Time and Space Complexity
 *
 * Let n = s.length
 *
 * Time Complexity: O(n)
 * - We loop through the strings once.
 * - We also check 26 characters, which is constant time.
 *
 * Space Complexity: O(1)
 * - The frequency array size is always 26.
 * - It does not grow with input size.
 ********************************************************************************************/

/********************************************************************************************
 * Edge Cases
 *
 * 1. Different lengths
 *    Input: s = "abc", t = "ab"
 *    Output: false
 *
 * 2. Same characters, different order
 *    Input: s = "listen", t = "silent"
 *    Output: true
 *
 * 3. Same length but different characters
 *    Input: s = "rat", t = "car"
 *    Output: false
 *
 * 4. Single character strings
 *    Input: s = "a", t = "a"
 *    Output: true
 *
 * 5. Repeated characters
 *    Input: s = "aacc", t = "ccac"
 *    Output: false
 ********************************************************************************************/

/********************************************************************************************
 * Revision-Friendly Notes
 *
 * - Pattern: Frequency Counting.
 * - Anagram means same character count.
 * - Always check length first.
 * - Use a 26-size array for lowercase English letters.
 * - Add counts from s and subtract counts from t.
 * - If all counts are 0, it is a valid anagram.
 * - This avoids sorting and gives O(n) time.
 ********************************************************************************************/

/********************************************************************************************
 * Interview Explanation
 *
 * I would first check if the two strings have the same length.
 * If not, they cannot be anagrams.
 *
 * Then I use a frequency array of size 26 because the input contains lowercase English letters.
 * I loop through both strings at the same time.
 *
 * For every character in s, I increment its count.
 * For every character in t, I decrement its count.
 *
 * At the end, if both strings contain the same characters with the same frequency,
 * all values in the frequency array should be 0.
 *
 * If any value is not 0, then one string has an extra or missing character,
 * so I return false.
 *
 * Time complexity is O(n), and space complexity is O(1).
 ********************************************************************************************/

/********************************************************************************************
 * Final Optimal Solution
 ********************************************************************************************/

// If input is only lowercase a-z, I will use array of size 26.
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagramSolutionOne(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const freq = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    const sIndex = s.charCodeAt(i) - 97;
    const tIndex = t.charCodeAt(i) - 97;

    freq[sIndex]++;
    freq[tIndex]--;
  }

  for (const count of freq) {
    if (count !== 0) {
      return false;
    }
  }

  return true;
}

// If input can contain uppercase or other characters, I will use Map.
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagramSolutionTwo(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const freq = new Map();

  for (let i = 0; i < s.length; i++) {
    freq.set(s[i], (freq.get(s[i]) || 0) + 1);
    freq.set(t[i], (freq.get(t[i]) || 0) - 1);
  }

  for (const count of freq.values()) {
    if (count !== 0) {
      return false;
    }
  }

  return true;
}
/********************************************************************************************
 * Test Cases
 ********************************************************************************************/

console.log(isAnagram("anagram", "nagaram"));
// Expected Output: true

console.log(isAnagram("rat", "car"));
// Expected Output: false

console.log(isAnagram("listen", "silent"));
// Expected Output: true

console.log(isAnagram("abc", "ab"));
// Expected Output: false

console.log(isAnagram("a", "a"));
// Expected Output: true

console.log(isAnagram("aacc", "ccac"));
// Expected Output: false

console.log(isAnagram("", ""));
// Expected Output: true
