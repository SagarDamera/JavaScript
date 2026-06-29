/********************************************************************************************
 * NeetCode: Arrays & Hashing - Contains Duplicate
 *
 * Pattern:
 * - Arrays
 * - Hash Set
 *
 * Problem Statement:
 * Given an integer array nums, return true if any value appears at least twice.
 * Return false if every element is unique.
 *
 * Example 1:
 * Input: nums = [1, 2, 3, 1]
 * Output: true
 *
 * Explanation:
 * The number 1 appears more than once.
 *
 * Example 2:
 * Input: nums = [1, 2, 3, 4]
 * Output: false
 *
 * Explanation:
 * Every number appears only once.
 *
 * Example 3:
 * Input: nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
 * Output: true
 *
 * Explanation:
 * Multiple numbers appear more than once.
 ********************************************************************************************/

/********************************************************************************************
 * Approach / Intuition
 *
 * We need to check if any number appears more than once.
 *
 * The best way is to use a Set.
 *
 * A Set stores only unique values.
 *
 * As we loop through nums:
 * - If the number is already in the Set, it means we found a duplicate.
 * - So we return true immediately.
 * - If the number is not in the Set, we add it.
 *
 * If we finish the loop and never find a duplicate, return false.
 ********************************************************************************************/

/********************************************************************************************
 * Why This Optimal Solution Works
 *
 * A Set gives fast lookup.
 *
 * For each number:
 * - We check whether we have seen it before.
 * - If yes, then the array contains a duplicate.
 * - If no, we remember it by adding it to the Set.
 *
 * This works because a duplicate means the same value appears again later in the array.
 *
 * The moment we see a value for the second time, we can return true.
 ********************************************************************************************/

/********************************************************************************************
 * Step-by-Step Explanation
 *
 * 1. Create an empty Set called seen.
 * 2. Loop through each number in nums.
 * 3. Check if seen already contains the current number.
 * 4. If yes, return true because we found a duplicate.
 * 5. If no, add the number to seen.
 * 6. After the loop, return false because all numbers are unique.
 ********************************************************************************************/

/********************************************************************************************
 * Dry Run / Diagrammatic Explanation
 *
 * Input:
 * nums = [1, 2, 3, 1]
 *
 * seen = {}
 *
 * Step 1:
 * num = 1
 * Is 1 in seen? No
 * Add 1
 *
 * seen = {1}
 *
 * Step 2:
 * num = 2
 * Is 2 in seen? No
 * Add 2
 *
 * seen = {1, 2}
 *
 * Step 3:
 * num = 3
 * Is 3 in seen? No
 * Add 3
 *
 * seen = {1, 2, 3}
 *
 * Step 4:
 * num = 1
 * Is 1 in seen? Yes
 *
 * Duplicate found.
 * Return true.
 *
 * Final Output:
 * true
 ********************************************************************************************/

/********************************************************************************************
 * Time and Space Complexity
 *
 * Let n = nums.length
 *
 * Time Complexity: O(n)
 * - We visit each element at most once.
 * - Set lookup and insertion are O(1) on average.
 *
 * Space Complexity: O(n)
 * - In the worst case, all numbers are unique.
 * - Then the Set stores all n numbers.
 ********************************************************************************************/

/********************************************************************************************
 * Edge Cases
 *
 * 1. Array has only one element
 *    Input: [1]
 *    Output: false
 *
 * 2. Duplicate appears at the start
 *    Input: [2, 2, 3, 4]
 *    Output: true
 *
 * 3. Duplicate appears at the end
 *    Input: [1, 2, 3, 1]
 *    Output: true
 *
 * 4. All values are unique
 *    Input: [1, 2, 3, 4]
 *    Output: false
 *
 * 5. Negative numbers
 *    Input: [-1, -2, -1]
 *    Output: true
 ********************************************************************************************/

/********************************************************************************************
 * Revision-Friendly Notes
 *
 * - Pattern: Hash Set.
 * - Use Set when you need to quickly check if a value was seen before.
 * - Return true as soon as a duplicate is found.
 * - Return false only after checking all numbers.
 * - This is better than comparing every pair because Set lookup is fast.
 ********************************************************************************************/

/********************************************************************************************
 * Interview Explanation
 *
 * I would use a Set to keep track of numbers I have already seen.
 * Then I loop through the array.
 *
 * For each number, I check if it already exists in the Set.
 * If it does, that means the number appeared before, so I return true.
 * Otherwise, I add it to the Set.
 *
 * If the loop finishes without finding any repeated number, I return false.
 *
 * This solution is optimal because it checks each number once.
 * The time complexity is O(n), and the space complexity is O(n).
 ********************************************************************************************/

/********************************************************************************************
 * Final Optimal Solution
 ********************************************************************************************/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
function containsDuplicate(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }

    seen.add(num);
  }

  return false;
}

/********************************************************************************************
 * Test Cases
 ********************************************************************************************/

console.log(containsDuplicate([1, 2, 3, 1]));
// Expected Output: true

console.log(containsDuplicate([1, 2, 3, 4]));
// Expected Output: false

console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]));
// Expected Output: true

console.log(containsDuplicate([1]));
// Expected Output: false

console.log(containsDuplicate([-1, -2, -1]));
// Expected Output: true

console.log(containsDuplicate([0, 4, 5, 0, 3, 6]));
// Expected Output: true
