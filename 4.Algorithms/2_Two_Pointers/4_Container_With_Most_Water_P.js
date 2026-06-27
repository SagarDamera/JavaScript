/**
 * NeetCode / LeetCode Style Problem
 * =================================
 * Problem: Container With Most Water
 *
 * Goal:
 * You are given an integer array height where each height[i] represents
 * the height of a vertical line drawn at index i.
 *
 * Find two lines that together with the x-axis form a container,
 * such that the container holds the maximum amount of water.
 *
 * Return the maximum area.
 *
 * ------------------------------------------------------------
 * EXAMPLES
 * ------------------------------------------------------------
 * Input:  height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 *
 * Input:  height = [1,1]
 * Output: 1
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This is one of the most important Two Pointer interview problems.
 *
 * It teaches:
 * 1. How to move from brute force to optimal
 * 2. How to reason about width vs height
 * 3. How to eliminate bad choices intelligently
 * 4. Why sorted thinking is not always needed for two pointers
 *
 * This problem is famous because:
 * - brute force is simple
 * - optimal solution is elegant
 * - the pointer movement logic is the key interview insight
 *
 * ============================================================
 * PROBLEM UNDERSTANDING
 * ============================================================
 *
 * Pick two indices:
 *   left and right
 *
 * The container formed by them has:
 * - width  = right - left
 * - height = min(height[left], height[right])
 *
 * Why min(...)?
 * -------------
 * Because water level is limited by the shorter wall.
 *
 * So area formula is:
 *
 *   area = (right - left) * min(height[left], height[right])
 *
 * We need the maximum such area among all possible pairs.
 *
 * ============================================================
 * CORE IDEA
 * ============================================================
 *
 * Every pair of lines forms a container.
 * We want the pair with maximum:
 *
 *   width * limitingHeight
 *
 * Important:
 * ----------
 * - Bigger width helps
 * - Bigger minimum height helps
 *
 * The challenge is balancing both.
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force (check every pair)
 * 2. Two Pointers (Optimal)
 *
 * Note:
 * -----
 * Sorting is NOT useful here because original positions determine width.
 * If we sort heights, we lose the original distance between lines.
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Try every possible pair of lines.
 *
 * For every i:
 *   for every j > i:
 *     compute area
 *     update maximum
 *
 * Why it works:
 * -------------
 * Because it checks all possible containers.
 * So it cannot miss the best one.
 *
 * Why it is slow:
 * ---------------
 * There are O(n^2) pairs.
 * For large arrays, this becomes too slow.
 */

function maxAreaBruteForce(height) {
    let maxWater = 0;

    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            const width = j - i;
            const containerHeight = Math.min(height[i], height[j]);
            const area = width * containerHeight;

            maxWater = Math.max(maxWater, area);
        }
    }

    return maxWater;
}

/**
 * Step-by-step explanation:
 * -------------------------
 * height = [1,8,6,2,5,4,8,3,7]
 *
 * Check pairs like:
 * (0,1), (0,2), (0,3), ...
 * then (1,2), (1,3), ...
 *
 * For each pair:
 * - width = j - i
 * - effective height = smaller of the two lines
 * - area = width * effective height
 *
 * Keep track of the largest area.
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
 * - Good as the first idea in interview
 * - Good to show understanding of area formula
 * - Not good as final answer
 */

/**
 * ============================================================
 * SOLUTION 2: TWO POINTERS (OPTIMAL)
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Start with the widest possible container:
 * - left = 0
 * - right = n - 1
 *
 * Calculate area.
 *
 * Then move ONE pointer inward.
 *
 * Big question:
 * -------------
 * Which pointer should we move?
 *
 * Key insight:
 * ------------
 * Move the pointer at the SHORTER line.
 *
 * Why?
 * ----
 * Because the shorter line is the bottleneck.
 *
 * Suppose:
 * height[left] < height[right]
 *
 * Then current area is limited by height[left].
 *
 * If we move the right pointer inward:
 * - width decreases
 * - limiting height still cannot exceed height[left] unless left changes
 * - so this move cannot help us beat the current bottleneck in a useful way
 *
 * But if we move the left pointer:
 * - width decreases, yes
 * - but we at least get a chance to find a taller left wall
 * - that might increase the limiting height
 *
 * This is the entire trick.
 */

function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const containerHeight = Math.min(height[left], height[right]);
        const area = width * containerHeight;

        maxWater = Math.max(maxWater, area);

        // Move the shorter wall inward
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

/**
 * ------------------------------------------------------------
 * WHY THE TWO POINTER SOLUTION WORKS
 * ------------------------------------------------------------
 *
 * Let us say:
 *
 * left height  = 3
 * right height = 7
 *
 * Current area uses:
 * min(3, 7) = 3
 *
 * So the shorter wall (3) limits the water.
 *
 * Now think:
 *
 * If we keep the left wall at 3 and move right inward,
 * width becomes smaller.
 * The container height is still at most 3 unless left changes.
 *
 * So moving the taller wall is not promising.
 *
 * Instead, we move the shorter wall,
 * hoping to find a taller wall than 3.
 *
 * This is why:
 * - move shorter side
 * - never move taller side first
 *
 * That greedy choice is correct.
 */

/**
 * ------------------------------------------------------------
 * DEEPER INTUITION
 * ------------------------------------------------------------
 *
 * At any moment:
 *
 * area = width * min(leftHeight, rightHeight)
 *
 * Width always shrinks as pointers move inward.
 *
 * So if width is shrinking, the only way to possibly get a better area
 * is to increase the limiting height.
 *
 * The limiting height is the shorter wall.
 *
 * Therefore:
 * - the shorter wall is the only one worth replacing
 *
 * That is the core reasoning.
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Put one pointer at the beginning:
 *      left = 0
 *
 * 2. Put one pointer at the end:
 *      right = n - 1
 *
 * 3. Compute current container area:
 *      width = right - left
 *      height = min(height[left], height[right])
 *      area = width * height
 *
 * 4. Update maximum area
 *
 * 5. Move the shorter wall inward:
 *    - if height[left] < height[right], do left++
 *    - else do right--
 *
 * 6. Repeat until left >= right
 *
 * 7. Return max area
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 * ------------------------------------------------------------
 *
 * Example:
 * height = [1,8,6,2,5,4,8,3,7]
 *
 * Index:    0 1 2 3 4 5 6 7 8
 * Height:   1 8 6 2 5 4 8 3 7
 *
 * Start:
 * left = 0, right = 8
 *
 * heights = 1 and 7
 * width = 8
 * area = 8 * min(1,7) = 8
 * max = 8
 *
 * Move shorter wall:
 * left height is smaller => left++
 *
 * ------------------------------------------------
 * left = 1, right = 8
 * heights = 8 and 7
 * width = 7
 * area = 7 * min(8,7) = 49
 * max = 49
 *
 * Move shorter wall:
 * right height is smaller => right--
 *
 * ------------------------------------------------
 * left = 1, right = 7
 * heights = 8 and 3
 * width = 6
 * area = 6 * 3 = 18
 * max = 49
 *
 * Move shorter wall:
 * right is smaller => right--
 *
 * ------------------------------------------------
 * left = 1, right = 6
 * heights = 8 and 8
 * width = 5
 * area = 5 * 8 = 40
 * max = 49
 *
 * heights equal
 * we can move either one
 * code moves right--
 *
 * ------------------------------------------------
 * left = 1, right = 5
 * heights = 8 and 4
 * width = 4
 * area = 16
 *
 * continue...
 *
 * final answer = 49
 */

/**
 * ------------------------------------------------------------
 * VISUAL UNDERSTANDING
 * ------------------------------------------------------------
 *
 * Suppose we have:
 *
 * left                right
 *  |                    |
 *  v                    v
 * [1,8,6,2,5,4,8,3,7]
 *
 * First container:
 * width = 8
 * height = min(1, 7) = 1
 * area = 8
 *
 * Since 1 is the bottleneck,
 * keeping it makes little sense.
 * Move left.
 *
 * Now:
 *
 *    left             right
 *      |                |
 *      v                v
 * [1,8,6,2,5,4,8,3,7]
 *
 * width = 7
 * height = min(8,7) = 7
 * area = 49
 *
 * Much better.
 */

/**
 * ------------------------------------------------------------
 * IMPORTANT PROOF IDEA
 * ------------------------------------------------------------
 *
 * Why is it safe to discard the shorter wall?
 *
 * Suppose left wall is shorter.
 *
 * Any future container using the same left wall but a smaller right index
 * will have:
 * - smaller width
 * - limiting height <= current shorter wall or maybe something else,
 *   but width already decreased
 *
 * So keeping the same short wall cannot produce a better answer than the
 * current area with that wall.
 *
 * Therefore we can safely move past it.
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * Let n = height.length
 *
 * Brute Force:
 * ------------
 * Time  = O(n^2)
 * Space = O(1)
 *
 * Two Pointers:
 * -------------
 * Time  = O(n)
 * Space = O(1)
 *
 * Why O(n)?
 * ---------
 * Each pointer moves inward at most n times total.
 * So the loop runs linearly.
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use Two Pointers when:
 * - you need maximum/minimum over pair boundaries
 * - area/width relation matters
 * - moving one side can be logically justified
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION (SEPARATE CLEAN VERSION)
 * ============================================================
 *
 * This is the version you should present in interview.
 */

function maxAreaRecommended(height) {
    let left = 0;
    let right = height.length - 1;
    let best = 0;

    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const area = width * currentHeight;

        best = Math.max(best, area);

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return best;
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "I start with the widest container using the two ends of the array.
 * At each step, the area is determined by width times the smaller height.
 * Since the smaller height is the bottleneck, I move the pointer at the
 * shorter line inward, hoping to find a taller line that can improve the area.
 * This gives an O(n) time and O(1) space solution."
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Moving the taller pointer
 *    -------------------------
 *    That usually does not help because the shorter wall is the bottleneck.
 *
 * 2. Using max(height[left], height[right])
 *    --------------------------------------
 *    Wrong.
 *    The correct height is min(...), because water spills over the shorter wall.
 *
 * 3. Thinking sorting will help
 *    --------------------------
 *    Sorting destroys original indices, and width depends on original positions.
 *
 * 4. Forgetting width formula
 *    ------------------------
 *    width = right - left
 *
 * 5. Returning the pair instead of area
 *    ----------------------------------
 *    This problem asks only for the maximum area.
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Only two lines
 *    height = [1,1]
 *    area = 1
 *
 * 2. All same height
 *    height = [5,5,5,5]
 *    best is usually farthest pair
 *
 * 3. Strictly increasing heights
 *    height = [1,2,3,4,5]
 *    best may not be at the last two,
 *    because width matters too
 *
 * 4. Strictly decreasing heights
 *    height = [5,4,3,2,1]
 *    same logic: width and limiting height both matter
 *
 * 5. Very tall lines near center
 *    Sometimes a smaller width with much larger minimum height wins
 */

/**
 * ============================================================
 * REVISION-FRIENDLY NOTES
 * ============================================================
 *
 * Pattern Used:
 * -------------
 * Two Pointers
 *
 * Memory Hook:
 * ------------
 * "Area = width * shorter wall"
 *
 * Most important memory hook:
 * ---------------------------
 * "Move the shorter wall."
 *
 * Why?
 * ----
 * Because the shorter wall limits the water.
 *
 * Interview Explanation:
 * ----------------------
 * "I use two pointers at both ends. For each pair, I compute the area.
 * Then I move the pointer at the shorter height, because that is the
 * limiting wall, and replacing it is the only chance to improve area
 * as width shrinks."
 *
 * Quick mental model:
 * -------------------
 * - Width is shrinking anyway
 * - So I need a chance for bigger limiting height
 * - Only moving the shorter wall can give that chance
 *
 * Brute Force vs Optimal:
 * -----------------------
 * Brute Force: O(n^2)
 * Two Pointers: O(n)
 *
 * Best Solution:
 * --------------
 * Two Pointers
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const testCases = [
        {
            input: [1, 8, 6, 2, 5, 4, 8, 3, 7],
            expected: 49,
            description: "Classic example"
        },
        {
            input: [1, 1],
            expected: 1,
            description: "Two elements"
        },
        {
            input: [4, 3, 2, 1, 4],
            expected: 16,
            description: "Best container from far ends"
        },
        {
            input: [1, 2, 1],
            expected: 2,
            description: "Small symmetric example"
        },
        {
            input: [2, 3, 4, 5, 18, 17, 6],
            expected: 17,
            description: "Tall middle lines"
        },
        {
            input: [5, 5, 5, 5],
            expected: 15,
            description: "All same heights"
        }
    ];

    const methods = [
        { name: "Brute Force", fn: maxAreaBruteForce },
        { name: "Optimal", fn: maxArea },
        { name: "Recommended", fn: maxAreaRecommended }
    ];

    for (const test of testCases) {
        console.log("==================================================");
        console.log(`Test: ${test.description}`);
        console.log(`Input: ${JSON.stringify(test.input)}`);
        console.log(`Expected: ${test.expected}`);

        for (const method of methods) {
            const actual = method.fn([...test.input]);
            console.log(
                `${method.name.padEnd(12)} => ${actual} | Pass: ${actual === test.expected}`
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
 * Two Pointers
 *
 * Core Formula:
 * -------------
 * area = (right - left) * min(height[left], height[right])
 *
 * Core Trick:
 * -----------
 * Move the pointer at the shorter wall
 *
 * Why?
 * ----
 * Because the shorter wall is the bottleneck
 *
 * Complexity:
 * -----------
 * Brute Force: O(n^2), O(1)
 * Optimal:     O(n),   O(1)
 *
 * One-line interview summary:
 * ---------------------------
 * "Start with the widest container and move the pointer at the shorter
 * line inward, because the shorter line limits the water and is the only
 * one worth replacing as width decreases."
 */