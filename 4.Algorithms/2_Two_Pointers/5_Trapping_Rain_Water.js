/**
 * NeetCode / LeetCode Style Problem
 * =================================
 * Problem: Trapping Rain Water
 *
 * Goal:
 * Given n non-negative integers representing an elevation map where the width
 * of each bar is 1, compute how much water it can trap after raining.
 *
 * ------------------------------------------------------------
 * EXAMPLES
 * ------------------------------------------------------------
 * Input:  height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * Output: 6
 *
 * Input:  height = [4,2,0,3,2,5]
 * Output: 9
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is one of the most important array + two pointer interview problems.
 *
 * It teaches:
 * 1. How to think about water trapping using left and right boundaries
 * 2. Prefix max / suffix max idea
 * 3. Space optimization
 * 4. Strong two-pointer reasoning
 *
 * This problem is famous because:
 * - brute force is easy to understand
 * - better solutions use precomputation
 * - the best solution needs deep intuition
 *
 * ============================================================
 * PROBLEM UNDERSTANDING
 * ============================================================
 *
 * Water can only be trapped at an index if:
 * - there is a taller wall on the left
 * - there is a taller wall on the right
 *
 * For each index i:
 *
 * waterAtI =
 *   min(max height on left, max height on right) - height[i]
 *
 * If this value is negative, treat it as 0.
 *
 * Why min(...)?
 * -------------
 * Because water level is limited by the shorter boundary.
 *
 * ============================================================
 * CORE FORMULA
 * ============================================================
 *
 * For every index i:
 *
 * trappedWater[i] = min(leftMax[i], rightMax[i]) - height[i]
 *
 * If negative:
 * trappedWater[i] = 0
 *
 * Total answer:
 * sum of trappedWater[i] for all i
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force
 * 2. Prefix Max + Suffix Max arrays
 * 3. Two Pointers (Optimal)
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * For each index:
 * - scan left side and find highest wall
 * - scan right side and find highest wall
 * - water at current index is:
 *     min(leftMax, rightMax) - currentHeight
 *
 * Why it works:
 * -------------
 * It directly uses the definition of trapped water.
 *
 * Why it is slow:
 * ---------------
 * For every index, we scan left and right again.
 * So lots of repeated work happens.
 */

function trapBruteForce(height) {
    let totalWater = 0;

    for (let i = 0; i < height.length; i++) {
        let leftMax = 0;
        let rightMax = 0;

        // Find highest wall on left including current
        for (let l = 0; l <= i; l++) {
            leftMax = Math.max(leftMax, height[l]);
        }

        // Find highest wall on right including current
        for (let r = i; r < height.length; r++) {
            rightMax = Math.max(rightMax, height[r]);
        }

        const waterAtI = Math.min(leftMax, rightMax) - height[i];
        totalWater += waterAtI;
    }

    return totalWater;
}

/**
 * Step-by-step explanation:
 * -------------------------
 * For each position i:
 * 1. Find tallest bar from 0 to i
 * 2. Find tallest bar from i to n-1
 * 3. Water level at i is limited by the smaller of those two
 * 4. Subtract current height
 * 5. Add result to total
 *
 * Dry mini-example:
 * -----------------
 * height = [0,1,0,2]
 *
 * i = 2, height[i] = 0
 * leftMax  = max(0,1,0) = 1
 * rightMax = max(0,2)   = 2
 *
 * waterAtI = min(1,2) - 0 = 1
 *
 * Time Complexity:
 * ----------------
 * O(n^2)
 *
 * Space Complexity:
 * -----------------
 * O(1)
 *
 * When to use:
 * ------------
 * - Good first thought
 * - Good for understanding formula
 * - Not good as interview final answer
 */

/**
 * ============================================================
 * SOLUTION 2: PREFIX MAX + SUFFIX MAX ARRAYS
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * In brute force, the repeated work is:
 * - finding left max again and again
 * - finding right max again and again
 *
 * So precompute:
 * - leftMax[i]  = tallest bar from left up to i
 * - rightMax[i] = tallest bar from right up to i
 *
 * Then for each index:
 * waterAtI = min(leftMax[i], rightMax[i]) - height[i]
 *
 * Why it works:
 * -------------
 * Same formula as brute force,
 * but we store the needed max values in advance.
 */

function trapPrefixSuffix(height) {
    const n = height.length;
    if (n === 0) return 0;

    const leftMax = new Array(n);
    const rightMax = new Array(n);

    leftMax[0] = height[0];
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    rightMax[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    let totalWater = 0;

    for (let i = 0; i < n; i++) {
        totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
    }

    return totalWater;
}

/**
 * ------------------------------------------------------------
 * WHY THIS WORKS
 * ------------------------------------------------------------
 *
 * Example:
 * height = [0,1,0,2,1,0,1,3,2,1,2,1]
 *
 * leftMax tells us:
 * "What is the highest wall seen so far from the left?"
 *
 * rightMax tells us:
 * "What is the highest wall seen so far from the right?"
 *
 * Once we know both for every index,
 * the water above that index is easy to compute.
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Build leftMax array:
 *    leftMax[i] = max(leftMax[i-1], height[i])
 *
 * 2. Build rightMax array:
 *    rightMax[i] = max(rightMax[i+1], height[i])
 *
 * 3. For each index i:
 *    trapped water = min(leftMax[i], rightMax[i]) - height[i]
 *
 * 4. Sum all trapped water
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 * ------------------------------------------------------------
 *
 * height = [4,2,0,3,2,5]
 *
 * Index:      0 1 2 3 2 5
 * Actually:
 * Index:      0 1 2 3 4 5
 * Height:     4 2 0 3 2 5
 *
 * leftMax:
 * i=0 -> 4
 * i=1 -> max(4,2)=4
 * i=2 -> max(4,0)=4
 * i=3 -> max(4,3)=4
 * i=4 -> max(4,2)=4
 * i=5 -> max(4,5)=5
 *
 * leftMax = [4,4,4,4,4,5]
 *
 * rightMax:
 * i=5 -> 5
 * i=4 -> max(5,2)=5
 * i=3 -> max(5,3)=5
 * i=2 -> max(5,0)=5
 * i=1 -> max(5,2)=5
 * i=0 -> max(5,4)=5
 *
 * rightMax = [5,5,5,5,5,5]
 *
 * water at each index:
 * i=0 -> min(4,5)-4 = 0
 * i=1 -> min(4,5)-2 = 2
 * i=2 -> min(4,5)-0 = 4
 * i=3 -> min(4,5)-3 = 1
 * i=4 -> min(4,5)-2 = 2
 * i=5 -> min(5,5)-5 = 0
 *
 * total = 0+2+4+1+2+0 = 9
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
 * O(n)
 *
 * Because we store:
 * - leftMax array
 * - rightMax array
 *
 * When to use:
 * ------------
 * - Great stepping stone before optimal solution
 * - Very easy to explain
 * - Excellent for revision
 */

/**
 * ============================================================
 * SOLUTION 3: TWO POINTERS (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * We do not actually need full leftMax and rightMax arrays.
 *
 * We can keep:
 * - left pointer
 * - right pointer
 * - leftMax
 * - rightMax
 *
 * Key insight:
 * ------------
 * If leftMax < rightMax,
 * then water on the left side is fully determined by leftMax.
 *
 * Why?
 * ----
 * Because the right side definitely has something at least as tall as leftMax,
 * so the smaller boundary is leftMax.
 *
 * Similarly:
 * If rightMax <= leftMax,
 * then water on the right side is determined by rightMax.
 *
 * This lets us process one side at a time.
 */

function trap(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }

    return totalWater;
}

/**
 * ------------------------------------------------------------
 * WHY THE TWO POINTER SOLUTION WORKS
 * ------------------------------------------------------------
 *
 * Let us focus on the smaller side.
 *
 * Suppose:
 * height[left] < height[right]
 *
 * Then the current right side is tall enough to guarantee that
 * the left position's water is limited by leftMax, not by some unknown smaller right boundary.
 *
 * So:
 * - if height[left] is bigger than or equal to leftMax, update leftMax
 * - else water trapped at left is leftMax - height[left]
 *
 * Then move left pointer.
 *
 * Same logic applies symmetrically on the right side.
 */

/**
 * ------------------------------------------------------------
 * DEEPER INTUITION
 * ------------------------------------------------------------
 *
 * In prefix/suffix solution:
 * water at i = min(leftMax[i], rightMax[i]) - height[i]
 *
 * In two pointer solution:
 * we avoid storing full arrays by deciding which side is safe to process now.
 *
 * Safe to process means:
 * - one boundary is already known to be the smaller one
 * - so water can be computed immediately
 *
 * If left side is smaller:
 * - left side water depends on leftMax
 *
 * If right side is smaller:
 * - right side water depends on rightMax
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Set:
 *    left = 0
 *    right = n - 1
 *    leftMax = 0
 *    rightMax = 0
 *
 * 2. While left < right:
 *    - compare height[left] and height[right]
 *
 * 3. If left bar is smaller:
 *    - if it is >= leftMax, update leftMax
 *    - else trap water = leftMax - height[left]
 *    - move left++
 *
 * 4. Else process right side:
 *    - if it is >= rightMax, update rightMax
 *    - else trap water = rightMax - height[right]
 *    - move right--
 *
 * 5. Continue until pointers meet
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 * ------------------------------------------------------------
 *
 * Example:
 * height = [0,1,0,2,1,0,1,3,2,1,2,1]
 *
 * Start:
 * left = 0, right = 11
 * leftMax = 0, rightMax = 0, total = 0
 *
 * height[left]=0, height[right]=1
 * left is smaller, process left
 *
 * leftMax = max(0,0)=0
 * left++
 *
 * ------------------------------------------------
 * left = 1, right = 11
 * height[left]=1, height[right]=1
 * right side processed (because not less)
 *
 * rightMax = max(0,1)=1
 * right--
 *
 * ------------------------------------------------
 * left = 1, right = 10
 * height[left]=1, height[right]=2
 * left smaller
 *
 * leftMax = max(0,1)=1
 * left++
 *
 * ------------------------------------------------
 * left = 2, right = 10
 * height[left]=0, height[right]=2
 * left smaller
 *
 * leftMax = 1
 * water += 1 - 0 = 1
 * left++
 *
 * ------------------------------------------------
 * left = 3, right = 10
 * height[left]=2, height[right]=2
 * process right
 *
 * rightMax = max(1,2)=2
 * right--
 *
 * Continue...
 * Total eventually becomes 6
 */

/**
 * ------------------------------------------------------------
 * VISUAL EXPLANATION
 * ------------------------------------------------------------
 *
 * Example:
 * height = [4,2,0,3,2,5]
 *
 * Bars:
 *
 * index:   0 1 2 3 4 5
 * height:  4 2 0 3 2 5
 *
 * Water trapped:
 *
 * at index 1 -> 2
 * at index 2 -> 4
 * at index 3 -> 1
 * at index 4 -> 2
 *
 * total = 9
 *
 * You can imagine:
 * - tallest left boundary
 * - tallest right boundary
 * - current bar sits below water level
 */

/**
 * ------------------------------------------------------------
 * IMPORTANT POINTER LOGIC MEMORY TRICK
 * ------------------------------------------------------------
 *
 * Memory hook:
 * ------------
 * "Process the smaller side."
 *
 * Why?
 * ----
 * Because the smaller side determines the current water limit.
 *
 * This is very similar in spirit to:
 * - Container With Most Water
 * but here the goal and logic are different
 *
 * Container problem:
 * - move smaller wall because it limits area height
 *
 * Trapping Rain Water:
 * - process smaller side because its water level is now determinable
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Brute Force:
 * ------------
 * Time  = O(n^2)
 * Space = O(1)
 *
 * Prefix/Suffix:
 * --------------
 * Time  = O(n)
 * Space = O(n)
 *
 * Two Pointers:
 * -------------
 * Time  = O(n)
 * Space = O(1)
 *
 * Why O(n)?
 * ---------
 * Each pointer moves inward at most n times total.
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use this solution when:
 * - interviewer asks for optimal approach
 * - prefix/suffix idea can be optimized
 * - problem involves left/right boundaries
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION (SEPARATE CLEAN VERSION)
 * ============================================================
 */

function trapRecommended(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }

    return water;
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "For each index, trapped water depends on the tallest bar on the left
 * and tallest bar on the right. A straightforward O(n) solution uses
 * prefix and suffix max arrays.
 *
 * To optimize space, I use two pointers with leftMax and rightMax.
 * I always process the smaller side, because that side's water level
 * is already determined by its max boundary."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Using only immediate neighbors
 *    ------------------------------
 *    Water depends on tallest boundaries, not adjacent bars only.
 *
 * 2. Forgetting the formula
 *    ----------------------
 *    water = min(leftMax, rightMax) - height[i]
 *
 * 3. Adding negative water
 *    ---------------------
 *    Never do that. If current bar is higher, just update max.
 *
 * 4. Mixing up with Container With Most Water
 *    ----------------------------------------
 *    Both use two pointers, but reasoning is different.
 *
 * 5. Incorrect pointer condition
 *    ---------------------------
 *    Usually use while (left < right)
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Empty array
 *    height = []
 *    answer = 0
 *
 * 2. One bar or two bars
 *    Cannot trap water
 *
 * 3. Strictly increasing
 *    height = [1,2,3,4]
 *    answer = 0
 *
 * 4. Strictly decreasing
 *    height = [4,3,2,1]
 *    answer = 0
 *
 * 5. Flat bars
 *    height = [3,3,3]
 *    answer = 0
 *
 * 6. Deep valley
 *    height = [5,0,5]
 *    answer = 5
 */

/**
 * ============================================================
 * REVISION-FRIENDLY NOTES
 * ============================================================
 *
 * Pattern Used:
 * -------------
 * Prefix/Suffix boundaries
 * Two Pointers
 *
 * Memory Hook:
 * ------------
 * "Water at i = min(left wall, right wall) - current height"
 *
 * Best memory hook:
 * -----------------
 * "Process the smaller side."
 *
 * Why?
 * ----
 * Because the smaller side is the limiting boundary that is already known.
 *
 * Interview Explanation:
 * ----------------------
 * "I first think in terms of leftMax and rightMax for every index.
 * Then I optimize space using two pointers and running max values.
 * At each step I process the smaller side, because its water amount
 * is already determined."
 *
 * Good interview flow:
 * --------------------
 * 1. Mention brute force formula
 * 2. Improve with leftMax/rightMax arrays
 * 3. Optimize to two pointers
 *
 * Brute Force vs Better vs Optimal:
 * ---------------------------------
 * Brute Force:   O(n^2), O(1)
 * Prefix/Suffix: O(n),   O(n)
 * Two Pointers:  O(n),   O(1)
 *
 * Common comparison:
 * ------------------
 * This problem is often paired with:
 * - Container With Most Water
 * Both use two pointers
 * But here we track boundaries and trapped volume
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        {
            input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
            expected: 6,
            description: "Classic example"
        },
        {
            input: [4, 2, 0, 3, 2, 5],
            expected: 9,
            description: "Another standard example"
        },
        {
            input: [],
            expected: 0,
            description: "Empty array"
        },
        {
            input: [1],
            expected: 0,
            description: "Single bar"
        },
        {
            input: [1, 2],
            expected: 0,
            description: "Two bars cannot trap"
        },
        {
            input: [5, 0, 5],
            expected: 5,
            description: "Simple valley"
        },
        {
            input: [1, 2, 3, 4],
            expected: 0,
            description: "Strictly increasing"
        },
        {
            input: [4, 3, 2, 1],
            expected: 0,
            description: "Strictly decreasing"
        },
        {
            input: [3, 3, 3],
            expected: 0,
            description: "Flat bars"
        }
    ];

    const methods = [
        { name: "Brute Force", fn: trapBruteForce },
        { name: "Prefix/Suffix", fn: trapPrefixSuffix },
        { name: "Optimal", fn: trap },
        { name: "Recommended", fn: trapRecommended }
    ];

    for (const test of testCases) {
        console.log("==================================================");
        console.log(`Test: ${test.description}`);
        console.log(`Input: ${JSON.stringify(test.input)}`);
        console.log(`Expected: ${test.expected}`);

        for (const method of methods) {
            const actual = method.fn([...test.input]);
            console.log(
                `${method.name.padEnd(14)} => ${actual} | Pass: ${actual === test.expected}`
            );
        }
    }
}

runTests();

/**
 * ============================================================
 * FINAL QUICK REVISION SUMMARY
 * ============================================================
 *
 * Best Solution:
 * --------------
 * Two Pointers with leftMax and rightMax
 *
 * Core Formula:
 * -------------
 * waterAtI = min(leftMax, rightMax) - height[i]
 *
 * Core Trick:
 * -----------
 * Process the smaller side
 *
 * Why?
 * ----
 * Because that side's water level is already determined
 *
 * Complexity:
 * -----------
 * Brute Force:   O(n^2), O(1)
 * Prefix/Suffix: O(n),   O(n)
 * Optimal:       O(n),   O(1)
 *
 * One-line interview summary:
 * ---------------------------
 * "I think of water at each index as limited by the smaller of the tallest
 * walls on both sides. Then I optimize space by using two pointers with
 * leftMax and rightMax, always processing the smaller side."
 */