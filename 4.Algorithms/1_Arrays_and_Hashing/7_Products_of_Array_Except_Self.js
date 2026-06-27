/*
============================================================
LeetCode 238. Product of Array Except Self
All Best Approaches + Revision-Friendly Notes
============================================================

Problem:
Given an integer array nums, return an array answer such that:

answer[i] = product of all the elements of nums except nums[i]

You must solve it without using division,
and in O(n) time.

Example:
nums = [1,2,3,4]
Output = [24,12,8,6]

------------------------------------------------------------
PATTERN:
Prefix Product + Suffix Product

------------------------------------------------------------
CORE IDEA:
For each index:
answer[i] = product of all elements on left side
            ×
            product of all elements on right side

============================================================
*/

/*
============================================================
1) BRUTE FORCE APPROACH
============================================================

Idea:
For every index, multiply all other elements except itself.

Why it works:
We directly calculate the required value for each position.

Time Complexity:
O(n^2)

Space Complexity:
O(1) extra space
(not counting output array)

Not recommended for large inputs.
*/

function productExceptSelfBruteForce(nums) {
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        let product = 1;

        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                product *= nums[j];
            }
        }

        result.push(product);
    }

    return result;
}

/*
============================================================
2) PREFIX + SUFFIX ARRAYS APPROACH
============================================================

Idea:
Build two arrays:
1. prefix[i] = product of all elements before i
2. suffix[i] = product of all elements after i

Then:
answer[i] = prefix[i] * suffix[i]

Why it works:
Each index gets left product and right product separately.

Time Complexity:
O(n)

Space Complexity:
O(n)

Good for understanding the logic clearly.
*/

function productExceptSelfPrefixSuffix(nums) {
    const n = nums.length;
    const prefix = new Array(n).fill(1);
    const suffix = new Array(n).fill(1);
    const result = new Array(n).fill(1);

    // Build prefix array
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] * nums[i - 1];
    }

    // Build suffix array
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1] * nums[i + 1];
    }

    // Final result
    for (let i = 0; i < n; i++) {
        result[i] = prefix[i] * suffix[i];
    }

    return result;
}

/*
============================================================
3) OPTIMAL APPROACH (BEST SOLUTION)
============================================================

Idea:
We do not need separate prefix and suffix arrays.
We can store prefix product directly in result,
then multiply by running suffix product.

Steps:
1. First pass left to right:
   store prefix product in result
2. Second pass right to left:
   multiply result[i] by suffix product

Why it works:
At each index:
- result[i] already contains left product
- suffix variable gives right product
So result[i] = left * right

Time Complexity:
O(n)

Space Complexity:
O(1) extra space
(not counting output array)

This is the best interview solution.
*/

function productExceptSelfOptimal(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // Step 1: Store prefix products in result
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    // Step 2: Multiply with suffix products
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
}

/*
============================================================
4) MAIN RECOMMENDED FUNCTION
============================================================

Use optimal approach for best performance.
*/

function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
}

/*
============================================================
DRY RUN (DIAGRAM STYLE)
============================================================

Example:
nums = [1, 2, 3, 4]

------------------------------------------------------------
Step 1: Prefix pass
------------------------------------------------------------

prefix = 1
result = [1, 1, 1, 1]

i = 0
result[0] = 1
prefix = 1 * 1 = 1
result = [1, 1, 1, 1]

i = 1
result[1] = 1
prefix = 1 * 2 = 2
result = [1, 1, 1, 1]

i = 2
result[2] = 2
prefix = 2 * 3 = 6
result = [1, 1, 2, 1]

i = 3
result[3] = 6
prefix = 6 * 4 = 24
result = [1, 1, 2, 6]

Now result contains LEFT products only

------------------------------------------------------------
Step 2: Suffix pass
------------------------------------------------------------

suffix = 1
result = [1, 1, 2, 6]

i = 3
result[3] = 6 * 1 = 6
suffix = 1 * 4 = 4

i = 2
result[2] = 2 * 4 = 8
suffix = 4 * 3 = 12

i = 1
result[1] = 1 * 12 = 12
suffix = 12 * 2 = 24

i = 0
result[0] = 1 * 24 = 24
suffix = 24 * 1 = 24

Final result = [24, 12, 8, 6]

------------------------------------------------------------
VISUAL SUMMARY
------------------------------------------------------------

nums:         [1,  2,  3,  4]

left product: [1,  1,  2,  6]
right prod:   [24, 12, 4,  1]

answer[i] = left[i] * right[i]

answer:       [24, 12, 8,  6]

============================================================
*/

/*
============================================================
FLOW MEMORY TEMPLATE
============================================================

1. Store prefix product in result
2. Traverse from right side with suffix product
3. Multiply suffix into result
4. Return result

Memory Hook:
"Left first, Right later"

OR

"Prefix in result, suffix in variable"

============================================================
*/

/*
============================================================
EDGE CASES
============================================================

1. Contains one zero
nums = [1,2,0,4]
Output = [0,0,8,0]

2. Contains multiple zeros
nums = [0,2,0,4]
Output = [0,0,0,0]

3. Negative numbers
nums = [-1,1,0,-3,3]
Output = [0,0,9,0,0]

This approach handles all these cases naturally.
============================================================
*/

/*
============================================================
COMPLEXITY
============================================================

Brute Force:
Time: O(n^2)
Space: O(1)

Prefix + Suffix Arrays:
Time: O(n)
Space: O(n)

Optimal:
Time: O(n)
Space: O(1) extra

Best answer for interviews:
--> Optimal Prefix + Suffix Product approach

============================================================
*/

/*
============================================================
TEST CASES
============================================================
*/

const testCases = [
    [1, 2, 3, 4],
    [-1, 1, 0, -3, 3],
    [2, 3, 4, 5],
    [0, 2, 3, 4],
    [0, 2, 0, 4]
];

for (const nums of testCases) {
    console.log("Input:", nums);
    console.log("Brute Force:", productExceptSelfBruteForce(nums));
    console.log("Prefix + Suffix:", productExceptSelfPrefixSuffix(nums));
    console.log("Optimal:", productExceptSelfOptimal(nums));
    console.log("Recommended productExceptSelf:", productExceptSelf(nums));
    console.log("--------------------------------------------------");
}

/*
============================================================
QUICK INTERVIEW EXPLANATION
============================================================

I solve this using prefix and suffix products.

In the first pass, I store the product of all elements
to the left of each index in the result array.

In the second pass, I keep a running suffix product
from the right side and multiply it into result[i].

This way, each index gets:
left product × right product

It avoids division, runs in O(n) time,
and uses O(1) extra space apart from the output array.

============================================================
*/