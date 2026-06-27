/********************************************************************************************
 * NeetCode 150: Sliding Window
 * Best Time to Buy and Sell Stock
 *
 * LeetCode 121. Best Time to Buy and Sell Stock
 *
 * ------------------------------------------------------------------------------------------
 * Problem:
 * ------------------------------------------------------------------------------------------
 * You are given an array prices where prices[i] is the price of a stock on the i-th day.
 *
 * You want to maximize your profit by choosing:
 *  - one day to buy the stock
 *  - one later day to sell the stock
 *
 * Return the maximum profit you can achieve.
 * If you cannot achieve any profit, return 0.
 *
 * ------------------------------------------------------------------------------------------
 * Example:
 * ------------------------------------------------------------------------------------------
 * Input:  prices = [7, 1, 5, 3, 6, 4]
 * Output: 5
 *
 * Explanation:
 * Buy on day 1 at price 1.
 * Sell on day 4 at price 6.
 * Profit = 6 - 1 = 5.
 *
 * ------------------------------------------------------------------------------------------
 * Important Rule:
 * ------------------------------------------------------------------------------------------
 * You must buy before you sell.
 *
 ********************************************************************************************/


/********************************************************************************************
 * SOLUTION 1: BRUTE FORCE
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Try every possible pair of days:
 *  - choose one day as buy day
 *  - choose another later day as sell day
 *  - calculate profit
 *  - keep the maximum profit
 *
 * This is the most direct solution.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * Since we check every valid buy-sell pair, we are guaranteed to find the maximum profit.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Initialize maxProfit = 0.
 * 2. Loop buy from index 0 to n - 1.
 * 3. Loop sell from buy + 1 to n - 1.
 * 4. Calculate profit = prices[sell] - prices[buy].
 * 5. Update maxProfit if profit is bigger.
 * 6. Return maxProfit.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n^2)
 * Because for every buy day, we check every future sell day.
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(1)
 * We only use a few variables.
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * Use only for learning or very small input.
 * Not good for interviews as final answer because it is too slow.
 *
 ********************************************************************************************/

function maxProfitBruteForce(prices) {
    let maxProfit = 0;

    for (let buy = 0; buy < prices.length; buy++) {
        for (let sell = buy + 1; sell < prices.length; sell++) {
            const profit = prices[sell] - prices[buy];
            maxProfit = Math.max(maxProfit, profit);
        }
    }

    return maxProfit;
}


/********************************************************************************************
 * SOLUTION 2: PREFIX MINIMUM
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * For each day, ask:
 *
 * "What is the cheapest price before today?"
 *
 * If we know the minimum price before current day, then current day can be used as sell day.
 *
 * Profit = current price - minimum price seen so far
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * To maximize profit, we need:
 *  - lowest possible buy price before sell day
 *  - highest possible sell price after buy day
 *
 * As we scan left to right, we keep track of the cheapest price seen so far.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Initialize minPrice = Infinity.
 * 2. Initialize maxProfit = 0.
 * 3. For each price:
 *      a. Update minPrice if current price is smaller.
 *      b. Calculate profit if selling today.
 *      c. Update maxProfit.
 * 4. Return maxProfit.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(1)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * This is one of the best and cleanest solutions.
 * Very good for interviews.
 *
 ********************************************************************************************/

function maxProfitPrefixMin(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        const profit = price - minPrice;
        maxProfit = Math.max(maxProfit, profit);
    }

    return maxProfit;
}


/********************************************************************************************
 * SOLUTION 3: SLIDING WINDOW / TWO POINTERS
 *
 * ------------------------------------------------------------------------------------------
 * Approach / Intuition:
 * ------------------------------------------------------------------------------------------
 * Use two pointers:
 *
 * left  = buy day
 * right = sell day
 *
 * The window represents:
 * prices[left]  -> buy price
 * prices[right] -> sell price
 *
 * If prices[right] is greater than prices[left], we can make profit.
 * If prices[right] is smaller, then it is better to buy at right.
 *
 * ------------------------------------------------------------------------------------------
 * Why it works:
 * ------------------------------------------------------------------------------------------
 * We always want the smallest buy price before the sell day.
 *
 * If current sell price is less than buy price:
 *  - buying earlier is bad
 *  - update buy day to current day
 *
 * This keeps the best possible buy price while scanning.
 *
 * ------------------------------------------------------------------------------------------
 * Step-by-step:
 * ------------------------------------------------------------------------------------------
 * 1. Set left = 0.
 * 2. Set right = 1.
 * 3. Set maxProfit = 0.
 * 4. While right < prices.length:
 *      a. If prices[right] > prices[left]:
 *            calculate profit
 *            update maxProfit
 *      b. Else:
 *            move left to right
 *      c. Always move right forward
 * 5. Return maxProfit.
 *
 * ------------------------------------------------------------------------------------------
 * Time Complexity:
 * ------------------------------------------------------------------------------------------
 * O(n)
 *
 * ------------------------------------------------------------------------------------------
 * Space Complexity:
 * ------------------------------------------------------------------------------------------
 * O(1)
 *
 * ------------------------------------------------------------------------------------------
 * When to use:
 * ------------------------------------------------------------------------------------------
 * This is the NeetCode-style sliding window solution.
 * This is the main recommended solution.
 *
 ********************************************************************************************/

function maxProfitSlidingWindow(prices) {
    let left = 0;
    let right = 1;
    let maxProfit = 0;

    while (right < prices.length) {
        if (prices[right] > prices[left]) {
            const profit = prices[right] - prices[left];
            maxProfit = Math.max(maxProfit, profit);
        } else {
            left = right;
        }

        right++;
    }

    return maxProfit;
}


/********************************************************************************************
 * MAIN RECOMMENDED SOLUTION
 *
 * ------------------------------------------------------------------------------------------
 * Use this in interviews:
 * ------------------------------------------------------------------------------------------
 * Sliding Window / Two Pointers
 *
 * Reason:
 *  - Easy to explain
 *  - O(n) time
 *  - O(1) space
 *  - Matches the NeetCode Sliding Window pattern
 *
 ********************************************************************************************/

function maxProfit(prices) {
    let buy = 0;
    let sell = 1;
    let maxProfit = 0;

    while (sell < prices.length) {
        if (prices[sell] > prices[buy]) {
            maxProfit = Math.max(maxProfit, prices[sell] - prices[buy]);
        } else {
            buy = sell;
        }

        sell++;
    }

    return maxProfit;
}


/********************************************************************************************
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 *
 * prices = [7, 1, 5, 3, 6, 4]
 *
 * buy = 0, sell = 1
 *
 * ------------------------------------------------------------------------------------------
 * Step 1:
 * prices[buy]  = 7
 * prices[sell] = 1
 *
 * 7 > 1, so buying at 7 is bad.
 * Move buy to sell.
 *
 * buy = 1
 * sell = 2
 *
 * ------------------------------------------------------------------------------------------
 * Step 2:
 * prices[buy]  = 1
 * prices[sell] = 5
 *
 * Profit = 5 - 1 = 4
 * maxProfit = 4
 *
 * buy = 1
 * sell = 3
 *
 * ------------------------------------------------------------------------------------------
 * Step 3:
 * prices[buy]  = 1
 * prices[sell] = 3
 *
 * Profit = 3 - 1 = 2
 * maxProfit stays 4
 *
 * buy = 1
 * sell = 4
 *
 * ------------------------------------------------------------------------------------------
 * Step 4:
 * prices[buy]  = 1
 * prices[sell] = 6
 *
 * Profit = 6 - 1 = 5
 * maxProfit = 5
 *
 * buy = 1
 * sell = 5
 *
 * ------------------------------------------------------------------------------------------
 * Step 5:
 * prices[buy]  = 1
 * prices[sell] = 4
 *
 * Profit = 4 - 1 = 3
 * maxProfit stays 5
 *
 * Final answer = 5
 *
 * ------------------------------------------------------------------------------------------
 * Visual:
 * ------------------------------------------------------------------------------------------
 *
 * prices: [7, 1, 5, 3, 6, 4]
 *             B        S
 *
 * Buy at 1
 * Sell at 6
 *
 * Maximum Profit = 6 - 1 = 5
 *
 ********************************************************************************************/


/********************************************************************************************
 * REVISION-FRIENDLY NOTES
 *
 * ------------------------------------------------------------------------------------------
 * Pattern Used:
 * ------------------------------------------------------------------------------------------
 * Sliding Window / Two Pointers
 *
 * ------------------------------------------------------------------------------------------
 * Memory Hook:
 * ------------------------------------------------------------------------------------------
 * "Keep the cheapest buy price before today."
 *
 * Or:
 *
 * "If today's price is cheaper than my buy price, move the buy pointer."
 *
 * ------------------------------------------------------------------------------------------
 * Interview Explanation:
 * ------------------------------------------------------------------------------------------
 * I use two pointers.
 * The left pointer represents the buy day.
 * The right pointer represents the sell day.
 *
 * If selling today gives profit, I update the maximum profit.
 * If today's price is lower than the current buy price, I move the buy pointer to today
 * because buying at a lower price is better.
 *
 * This guarantees that for every sell day, I am using the best possible buy day before it.
 *
 * ------------------------------------------------------------------------------------------
 * Edge Cases:
 * ------------------------------------------------------------------------------------------
 * 1. Prices always decreasing:
 *      [7, 6, 4, 3, 1]
 *      No profit possible.
 *      Answer = 0
 *
 * 2. Prices increasing:
 *      [1, 2, 3, 4, 5]
 *      Buy at 1, sell at 5.
 *      Answer = 4
 *
 * 3. Only one price:
 *      [5]
 *      Cannot sell after buying.
 *      Answer = 0
 *
 * 4. Same prices:
 *      [3, 3, 3]
 *      No profit.
 *      Answer = 0
 *
 * 5. Best buy is in the middle:
 *      [5, 4, 1, 7]
 *      Buy at 1, sell at 7.
 *      Answer = 6
 *
 ********************************************************************************************/


/********************************************************************************************
 * TEST CASES
 ********************************************************************************************/

function runTests() {
    const testCases = [
        {
            prices: [7, 1, 5, 3, 6, 4],
            expected: 5
        },
        {
            prices: [7, 6, 4, 3, 1],
            expected: 0
        },
        {
            prices: [1, 2, 3, 4, 5],
            expected: 4
        },
        {
            prices: [5],
            expected: 0
        },
        {
            prices: [3, 3, 3],
            expected: 0
        },
        {
            prices: [5, 4, 1, 7],
            expected: 6
        },
        {
            prices: [2, 4, 1],
            expected: 2
        },
        {
            prices: [1, 2],
            expected: 1
        }
    ];

    for (const { prices, expected } of testCases) {
        const result = maxProfit(prices);
        console.log(
            `prices = [${prices}] | expected = ${expected} | result = ${result} | ${result === expected ? "PASS" : "FAIL"
            }`
        );
    }
}

runTests();