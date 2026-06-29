/********************************************************************************************
 * NeetCode: Arrays & Hashing - Concatenation of Array
 *
 * Pattern:
 * - Arrays
 * - Simple iteration
 *
 * Problem Statement:
 * Given an integer array nums of length n, create an array ans of length 2n
 * where:
 *
 * ans[i] = nums[i]
 * ans[i + n] = nums[i]
 *
 * In simple words:
 * Return the array nums repeated two times.
 *
 * Example 1:
 * Input: nums = [1, 2, 1]
 * Output: [1, 2, 1, 1, 2, 1]
 *
 * Explanation:
 * nums repeated twice becomes:
 * [1, 2, 1] + [1, 2, 1] = [1, 2, 1, 1, 2, 1]
 *
 * Example 2:
 * Input: nums = [1, 3, 2, 1]
 * Output: [1, 3, 2, 1, 1, 3, 2, 1]
 ********************************************************************************************/

/********************************************************************************************
 * Approach / Intuition
 *
 * We need to create a new array that contains the same nums array two times.
 *
 * The easiest optimal way:
 * - Create an empty result array.
 * - Loop through nums once.
 * - For each index i:
 *      result[i] = nums[i]
 *      result[i + nums.length] = nums[i]
 *
 * This directly places each number in both required positions.
 ********************************************************************************************/

/********************************************************************************************
 * Why This Optimal Solution Works
 *
 * The final answer must have exactly double the size of nums.
 *
 * For every element nums[i]:
 * - It should appear once at index i.
 * - It should appear again at index i + n.
 *
 * Since we visit every element once and place it in both correct positions,
 * the result array is built correctly.
 *
 * This is optimal because:
 * - We must process every element at least once.
 * - We must create an output array of size 2n.
 ********************************************************************************************/

/********************************************************************************************
 * Step-by-Step Explanation
 *
 * 1. Let n be the length of nums.
 * 2. Create a new array ans of size 2 * n.
 * 3. Loop from i = 0 to n - 1.
 * 4. Put nums[i] at ans[i].
 * 5. Put nums[i] again at ans[i + n].
 * 6. Return ans.
 ********************************************************************************************/

/********************************************************************************************
 * Dry Run / Diagrammatic Explanation
 *
 * Input:
 * nums = [1, 2, 1]
 *
 * n = 3
 * ans size = 2 * 3 = 6
 *
 * Initial:
 * ans = [_, _, _, _, _, _]
 *
 * i = 0:
 * nums[0] = 1
 * ans[0] = 1
 * ans[0 + 3] = ans[3] = 1
 *
 * ans = [1, _, _, 1, _, _]
 *
 * i = 1:
 * nums[1] = 2
 * ans[1] = 2
 * ans[1 + 3] = ans[4] = 2
 *
 * ans = [1, 2, _, 1, 2, _]
 *
 * i = 2:
 * nums[2] = 1
 * ans[2] = 1
 * ans[2 + 3] = ans[5] = 1
 *
 * ans = [1, 2, 1, 1, 2, 1]
 *
 * Final Output:
 * [1, 2, 1, 1, 2, 1]
 ********************************************************************************************/

/********************************************************************************************
 * Time and Space Complexity
 *
 * Let n = nums.length
 *
 * Time Complexity: O(n)
 * - We loop through nums one time.
 *
 * Space Complexity: O(n)
 * - The output array has size 2n.
 * - We do not use extra space apart from the required output array.
 ********************************************************************************************/

/********************************************************************************************
 * Edge Cases
 *
 * 1. nums has only one element
 *    Input: [5]
 *    Output: [5, 5]
 *
 * 2. nums contains duplicate values
 *    Input: [1, 1, 1]
 *    Output: [1, 1, 1, 1, 1, 1]
 *
 * 3. nums contains different numbers
 *    Input: [4, 7, 9]
 *    Output: [4, 7, 9, 4, 7, 9]
 ********************************************************************************************/

/********************************************************************************************
 * Revision-Friendly Notes
 *
 * - This is a simple array construction problem.
 * - Main idea: place every nums[i] in two positions.
 * - First position: i
 * - Second position: i + n
 * - Pattern is useful when output depends on fixed index mapping.
 * - Best interview-ready solution uses one loop.
 ********************************************************************************************/

/********************************************************************************************
 * Interview Explanation
 *
 * I would create a new array of size 2n.
 * Then I loop through the input array once.
 * For each element at index i, I place it at index i in the answer array,
 * and also at index i + n.
 *
 * This works because the second half of the answer is exactly the same
 * as the first half.
 *
 * The time complexity is O(n), because we visit each element once.
 * The space complexity is O(n), because we need to return a new array
 * of size 2n.
 ********************************************************************************************/

/********************************************************************************************
 * Final Optimal Solution
 ********************************************************************************************/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function getConcatenation(nums) {
  const n = nums.length;
  const ans = new Array(2 * n);

  for (let i = 0; i < n; i++) {
    ans[i] = nums[i];
    ans[i + n] = nums[i];
  }

  return ans;
}

// Concat two different arrays
function concatenateTwoArrays(nums1, nums2) {
  const n = nums1.length;
  const m = nums2.length;

  const ans = new Array(n + m);
  const maxLen = Math.max(n, m);

  for (let i = 0; i < maxLen; i++) {
    if (i < n) {
      ans[i] = nums1[i];
    }
    if (i < m) {
      ans[n + i] = nums2[i];
    }
  }

  return ans;
}

/********************************************************************************************
 * Test Cases
 ********************************************************************************************/

console.log(getConcatenation([1, 2, 1]));
// Expected Output: [1, 2, 1, 1, 2, 1]

console.log(getConcatenation([1, 3, 2, 1]));
// Expected Output: [1, 3, 2, 1, 1, 3, 2, 1]

console.log(getConcatenation([5]));
// Expected Output: [5, 5]

console.log(getConcatenation([4, 7, 9]));
// Expected Output: [4, 7, 9, 4, 7, 9]

console.log(getConcatenation([0, 0]));
// Expected Output: [0, 0, 0, 0]
