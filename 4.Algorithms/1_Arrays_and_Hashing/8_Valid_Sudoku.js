/**
 * NeetCode / LeetCode Style Problem
 * =================================
 * Problem: Valid Sudoku
 *
 * Goal:
 * Determine if a 9 x 9 Sudoku board is valid.
 *
 * A valid Sudoku board must satisfy:
 * 1. Each row must contain digits 1-9 without repetition.
 * 2. Each column must contain digits 1-9 without repetition.
 * 3. Each of the nine 3 x 3 sub-boxes must contain digits 1-9 without repetition.
 *
 * Important:
 * ----------
 * - The board may be partially filled.
 * - Empty cells are represented by ".".
 * - We only need to validate the current board state.
 * - We do NOT need to solve the Sudoku.
 *
 * ============================================================
 * WHY THIS PROBLEM MATTERS
 * ============================================================
 *
 * This problem tests:
 * 1. HashSet / HashMap thinking
 * 2. Matrix traversal
 * 3. Constraint checking
 * 4. How to convert a real-world rule into code
 *
 * This is a very common interview problem because:
 * - It looks long, but the logic is clean.
 * - It tests whether you can organize validation rules well.
 * - It is a good "sets + indexing" problem.
 *
 * ============================================================
 * MAIN IDEA
 * ============================================================
 *
 * Every filled cell belongs to:
 * - one row
 * - one column
 * - one 3x3 box
 *
 * So for each digit, we must ensure:
 * - it has not appeared before in that row
 * - it has not appeared before in that column
 * - it has not appeared before in that box
 *
 * The easiest way is to track what we have seen using Sets.
 *
 * ============================================================
 * COMMON SOLUTIONS
 * ============================================================
 *
 * 1. Brute Force:
 *    For every filled cell, scan its whole row, column, and box
 *    to check for duplicates.
 *
 * 2. Better:
 *    Validate all rows, then all columns, then all boxes separately.
 *
 * 3. Optimal / Recommended:
 *    Single pass using hash sets for rows, columns, and boxes.
 *
 * ============================================================
 * SOLUTION 1: BRUTE FORCE CHECK EACH FILLED CELL
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * For each filled cell board[r][c]:
 * - Check the rest of that row
 * - Check the rest of that column
 * - Check the rest of that 3x3 box
 *
 * If the same digit appears again anywhere it should not, return false.
 *
 * Why it works:
 * -------------
 * Sudoku validity depends only on row/column/box duplicates.
 * If for every filled cell we ensure there is no duplicate in those places,
 * then the board is valid.
 *
 * Downside:
 * ---------
 * We repeat a lot of work.
 * Same row/column/box gets checked many times.
 *
 * This makes it less elegant and less efficient.
 */

function isValidSudokuBruteForce(board) {
    const n = 9;

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            const value = board[r][c];

            if (value === ".") continue;

            // 1. Check row
            for (let col = 0; col < n; col++) {
                if (col !== c && board[r][col] === value) {
                    return false;
                }
            }

            // 2. Check column
            for (let row = 0; row < n; row++) {
                if (row !== r && board[row][c] === value) {
                    return false;
                }
            }

            // 3. Check 3x3 box
            const boxRowStart = Math.floor(r / 3) * 3;
            const boxColStart = Math.floor(c / 3) * 3;

            for (let row = boxRowStart; row < boxRowStart + 3; row++) {
                for (let col = boxColStart; col < boxColStart + 3; col++) {
                    if ((row !== r || col !== c) && board[row][col] === value) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

/**
 * Step-by-step explanation:
 * -------------------------
 * For every cell:
 * 1. If it is ".", ignore it.
 * 2. Otherwise store digit in value.
 * 3. Scan entire row and see whether same digit exists elsewhere.
 * 4. Scan entire column and see whether same digit exists elsewhere.
 * 5. Find the starting position of the 3x3 box:
 *      row start = Math.floor(r / 3) * 3
 *      col start = Math.floor(c / 3) * 3
 * 6. Scan that box and check for duplicate.
 * 7. If any duplicate exists, return false.
 * 8. If all cells pass, return true.
 *
 * Time Complexity:
 * ----------------
 * There are 81 cells.
 * For each filled cell, we may scan:
 * - 9 row cells
 * - 9 column cells
 * - 9 box cells
 *
 * So roughly O(81 * 27), which is constant for 9x9 Sudoku.
 *
 * In generalized form:
 * O(n^3)
 *
 * Space Complexity:
 * -----------------
 * O(1)
 *
 * When to use:
 * ------------
 * - Good for understanding the rules
 * - Good as a first thought
 * - Not the cleanest interview answer
 */

/**
 * ============================================================
 * SOLUTION 2: CHECK ROWS, COLUMNS, AND BOXES SEPARATELY
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * Instead of checking every cell against everything repeatedly,
 * we can validate:
 * 1. all rows
 * 2. all columns
 * 3. all 3x3 boxes
 *
 * For each group, use a Set to detect duplicates.
 *
 * Why it works:
 * -------------
 * Sudoku is valid if and only if:
 * - every row has no duplicates
 * - every column has no duplicates
 * - every box has no duplicates
 *
 * So we can validate those three rule types one by one.
 */

function isValidSudokuSeparateChecks(board) {
    const n = 9;

    // 1. Check rows
    for (let r = 0; r < n; r++) {
        const seen = new Set();

        for (let c = 0; c < n; c++) {
            const value = board[r][c];
            if (value === ".") continue;

            if (seen.has(value)) return false;
            seen.add(value);
        }
    }

    // 2. Check columns
    for (let c = 0; c < n; c++) {
        const seen = new Set();

        for (let r = 0; r < n; r++) {
            const value = board[r][c];
            if (value === ".") continue;

            if (seen.has(value)) return false;
            seen.add(value);
        }
    }

    // 3. Check 3x3 boxes
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
        for (let boxCol = 0; boxCol < 9; boxCol += 3) {
            const seen = new Set();

            for (let r = boxRow; r < boxRow + 3; r++) {
                for (let c = boxCol; c < boxCol + 3; c++) {
                    const value = board[r][c];
                    if (value === ".") continue;

                    if (seen.has(value)) return false;
                    seen.add(value);
                }
            }
        }
    }

    return true;
}

/**
 * Step-by-step explanation:
 * -------------------------
 * Row validation:
 * - For each row, create a new Set
 * - Add every digit
 * - If already seen, return false
 *
 * Column validation:
 * - For each column, create a new Set
 * - Add every digit
 * - If already seen, return false
 *
 * Box validation:
 * - Visit box starts: (0,0), (0,3), (0,6), (3,0), ...
 * - For each box, use a Set
 * - Scan the 3x3 area
 * - If duplicate appears, return false
 *
 * Time Complexity:
 * ----------------
 * Rows:   81 checks
 * Columns:81 checks
 * Boxes:  81 checks
 *
 * Total: O(81 + 81 + 81) = O(1) for fixed board size
 * Generalized: O(n^2)
 *
 * Space Complexity:
 * -----------------
 * O(9) = O(1) extra for each Set
 *
 * When to use:
 * ------------
 * - Very readable
 * - Great for learning
 * - Good if you want clean separation of row/column/box logic
 */

/**
 * ============================================================
 * SOLUTION 3: SINGLE PASS WITH ROW SETS, COLUMN SETS, BOX SETS
 * ============================================================
 *
 * Approach / Intuition:
 * ---------------------
 * We traverse the board once.
 *
 * For each filled cell:
 * - check row set
 * - check column set
 * - check box set
 *
 * If digit already exists in any of them, board is invalid.
 * Otherwise add it to all three trackers.
 *
 * This is the most common and interview-preferred solution.
 *
 * Why it works:
 * -------------
 * Each cell contributes to exactly one row, one column, and one box.
 * If we never allow duplicates inside those groups,
 * then the board is valid.
 */

/**
 * Helper:
 * -------
 * Box index formula:
 *
 * For any cell (r, c),
 * its 3x3 box index can be found by:
 *
 *   Math.floor(r / 3) * 3 + Math.floor(c / 3)
 *
 * Example:
 * --------
 * Top-left box cells -> index 0
 * Top-middle box     -> index 1
 * Top-right box      -> index 2
 * Middle-left box    -> index 3
 * ...
 * Bottom-right box   -> index 8
 */

function isValidSudoku(board) {
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const value = board[r][c];

            // Ignore empty cells
            if (value === ".") continue;

            const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            // If value already seen in row / column / box => invalid
            if (
                rows[r].has(value) ||
                cols[c].has(value) ||
                boxes[boxIndex].has(value)
            ) {
                return false;
            }

            // Mark value as seen
            rows[r].add(value);
            cols[c].add(value);
            boxes[boxIndex].add(value);
        }
    }

    return true;
}

/**
 * ------------------------------------------------------------
 * WHY THIS SOLUTION WORKS
 * ------------------------------------------------------------
 *
 * For every non-empty cell:
 * - rows[r] tracks digits already seen in row r
 * - cols[c] tracks digits already seen in column c
 * - boxes[boxIndex] tracks digits already seen in that 3x3 box
 *
 * Before inserting the current digit:
 * - if it is already present in any of these sets,
 *   Sudoku rule is violated
 * - otherwise add it and continue
 *
 * If traversal completes without conflict, board is valid.
 */

/**
 * ------------------------------------------------------------
 * STEP-BY-STEP EXPLANATION
 * ------------------------------------------------------------
 *
 * 1. Create 3 arrays of Sets:
 *    - 9 row sets
 *    - 9 column sets
 *    - 9 box sets
 *
 * 2. Traverse all cells in the board.
 *
 * 3. For each cell:
 *    - if it is ".", skip
 *    - else compute which box it belongs to
 *
 * 4. Check:
 *    - has this digit appeared in the same row before?
 *    - has this digit appeared in the same column before?
 *    - has this digit appeared in the same box before?
 *
 * 5. If yes, return false immediately.
 *
 * 6. Otherwise, add digit to row, column, and box sets.
 *
 * 7. If no conflict is found after scanning the whole board, return true.
 */

/**
 * ------------------------------------------------------------
 * DRY RUN / DIAGRAMMATIC EXPLANATION
 * ------------------------------------------------------------
 *
 * Example board snippet:
 *
 * [
 *   ["5","3",".",".","7",".",".",".","."],
 *   ["6",".",".","1","9","5",".",".","."],
 *   [".","9","8",".",".",".",".","6","."],
 *   ...
 * ]
 *
 * Start:
 * rows  = [Set(), Set(), ...]
 * cols  = [Set(), Set(), ...]
 * boxes = [Set(), Set(), ...]
 *
 * ------------------------------------------------
 * Cell (0,0) = "5"
 * row = 0, col = 0
 * boxIndex = Math.floor(0/3)*3 + Math.floor(0/3)
 *          = 0*3 + 0
 *          = 0
 *
 * Check:
 * rows[0] has "5"? no
 * cols[0] has "5"? no
 * boxes[0] has "5"? no
 *
 * Add:
 * rows[0] = {"5"}
 * cols[0] = {"5"}
 * boxes[0] = {"5"}
 * ------------------------------------------------
 *
 * Cell (0,1) = "3"
 * boxIndex = 0
 *
 * Check:
 * rows[0] has "3"? no
 * cols[1] has "3"? no
 * boxes[0] has "3"? no
 *
 * Add it.
 *
 * ------------------------------------------------
 * Suppose later we see another "5" in row 0:
 *
 * rows[0] already has "5"
 * => immediately return false
 * ------------------------------------------------
 *
 * Suppose later we see another "9" in same 3x3 box:
 *
 * boxes[boxIndex] already has "9"
 * => immediately return false
 * ------------------------------------------------
 */

/**
 * ------------------------------------------------------------
 * BOX INDEX MEMORY TRICK
 * ------------------------------------------------------------
 *
 * Think of 9 boxes numbered like this:
 *
 * 0 1 2
 * 3 4 5
 * 6 7 8
 *
 * Formula:
 * boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3)
 *
 * Why?
 * ----
 * - Math.floor(r / 3) tells which box-row we are in (0,1,2)
 * - Math.floor(c / 3) tells which box-column we are in (0,1,2)
 * - boxRow * 3 + boxCol converts 2D box position into 1D index
 */

/**
 * ------------------------------------------------------------
 * TIME AND SPACE COMPLEXITY
 * ------------------------------------------------------------
 *
 * There are 81 cells total.
 *
 * Time Complexity:
 * ----------------
 * O(81) => O(1) because board size is fixed
 *
 * Generalized for n x n board:
 * O(n^2)
 *
 * Space Complexity:
 * -----------------
 * We store digits in:
 * - 9 row sets
 * - 9 column sets
 * - 9 box sets
 *
 * Total extra memory is bounded by board size.
 * For fixed Sudoku: O(1)
 * Generalized: O(n^2)
 */

/**
 * ------------------------------------------------------------
 * WHEN TO USE THIS SOLUTION
 * ------------------------------------------------------------
 *
 * Use this solution when:
 * - interviewer asks for best clean solution
 * - you want one-pass validation
 * - you want easy-to-explain logic
 * - you want good readability + efficiency
 *
 * This is the MAIN RECOMMENDED solution.
 */

/**
 * ============================================================
 * MAIN RECOMMENDED SOLUTION (SEPARATE CLEAN VERSION)
 * ============================================================
 *
 * This is the version you should present first in an interview.
 */

function isValidSudokuRecommended(board) {
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const value = board[r][c];

            if (value === ".") continue;

            const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

            if (
                rows[r].has(value) ||
                cols[c].has(value) ||
                boxes[boxIndex].has(value)
            ) {
                return false;
            }

            rows[r].add(value);
            cols[c].add(value);
            boxes[boxIndex].add(value);
        }
    }

    return true;
}

/**
 * ============================================================
 * INTERVIEW EXPLANATION
 * ============================================================
 *
 * "I use three hash-set collections:
 * one for rows, one for columns, and one for 3x3 boxes.
 *
 * As I scan each filled cell, I check whether that digit has already
 * appeared in its row, column, or box.
 *
 * If yes, the board is invalid.
 * Otherwise I record the digit in all three places.
 *
 * This gives a clean one-pass solution."
 */

/**
 * ============================================================
 * ALTERNATIVE OPTIMAL STYLE: ONE GLOBAL SET OF STRINGS
 * ============================================================
 *
 * There is another very popular solution:
 * For each digit, store markers like:
 * - "5 in row 0"
 * - "5 in col 1"
 * - "5 in box 0-0"
 *
 * If any marker repeats, return false.
 *
 * This is also optimal and elegant.
 */

function isValidSudokuGlobalSet(board) {
    const seen = new Set();

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const value = board[r][c];

            if (value === ".") continue;

            const rowKey = `${value} in row ${r}`;
            const colKey = `${value} in col ${c}`;
            const boxKey = `${value} in box ${Math.floor(r / 3)}-${Math.floor(c / 3)}`;

            if (seen.has(rowKey) || seen.has(colKey) || seen.has(boxKey)) {
                return false;
            }

            seen.add(rowKey);
            seen.add(colKey);
            seen.add(boxKey);
        }
    }

    return true;
}

/**
 * Why this works:
 * ---------------
 * If "5 in row 2" appears twice, then row 2 has duplicate 5.
 * Same logic for columns and boxes.
 *
 * Time Complexity:
 * ----------------
 * O(81) => O(1)
 *
 * Space Complexity:
 * -----------------
 * O(81) => O(1)
 *
 * When to use:
 * ------------
 * - Very compact interview solution
 * - Good when you want to reduce multiple data structures into one
 */

/**
 * ============================================================
 * COMMON MISTAKES
 * ============================================================
 *
 * 1. Forgetting to ignore "."
 *    "." is not a digit; it is just empty.
 *
 * 2. Wrong box index calculation
 *    Correct:
 *    Math.floor(r / 3) * 3 + Math.floor(c / 3)
 *
 * 3. Trying to solve the Sudoku
 *    This problem only asks to validate current state.
 *
 * 4. Assuming rows/columns must contain all digits 1-9
 *    Not true.
 *    Since board can be partially filled, we only check duplicates.
 *
 * 5. Mixing up row and column loops
 *    Be careful:
 *    - board[r][c]
 *    - r = row index
 *    - c = column index
 */

/**
 * ============================================================
 * EDGE CASES
 * ============================================================
 *
 * 1. Empty board cells
 *    Lots of "." values are allowed.
 *
 * 2. Duplicate in a row
 *    Example:
 *    ["5", ".", ".", ".", "5", ".", ".", ".", "."]
 *    -> invalid
 *
 * 3. Duplicate in a column
 *    Same digit repeated vertically -> invalid
 *
 * 4. Duplicate in a 3x3 box
 *    Even if row and column look okay, box repetition makes it invalid
 *
 * 5. Fully filled valid board
 *    Should return true
 *
 * 6. Partially filled valid board
 *    Should also return true
 */

/**
 * ============================================================
 * REVISION-FRIENDLY NOTES
 * ============================================================
 *
 * Pattern Used:
 * -------------
 * - HashSet / Seen tracking
 * - Matrix traversal
 * - Constraint validation
 *
 * Memory Hook:
 * ------------
 * "Every number belongs to 3 groups:
 * row, column, box."
 *
 * So always ask:
 * "Have I seen this digit before in any of these 3 places?"
 *
 * Another memory trick:
 * ---------------------
 * "3 checks per digit:
 * row check, col check, box check."
 *
 * Interview Explanation:
 * ----------------------
 * "I do a single pass through the board.
 * For each filled cell, I track whether that digit has already appeared
 * in the same row, same column, or same 3x3 box using Sets.
 * If yes, return false; otherwise add it and continue."
 *
 * Why this is good:
 * -----------------
 * - Simple
 * - Fast
 * - Easy to explain
 * - Standard interview answer
 *
 * Box Formula Revision:
 * ---------------------
 * boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3)
 *
 * Think:
 * - r/3 => which box row
 * - c/3 => which box col
 *
 * Edge Cases to mention in interview:
 * -----------------------------------
 * - empty cells "."
 * - duplicate in row
 * - duplicate in column
 * - duplicate in box
 * - partially filled board is okay
 */

/**
 * ============================================================
 * TEST CASES
 * ============================================================
 */

function runTests() {
    const validBoard = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ];

    const invalidRowBoard = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "5"], // duplicate 5 in row 0
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ];

    const invalidColBoard = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        ["5", "9", "8", ".", ".", ".", ".", "6", "."], // duplicate 5 in column 0
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ];

    const invalidBoxBoard = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", "5", ".", "1", "9", "5", ".", ".", "."], // duplicate 5 in top-left 3x3 box
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ];

    const testCases = [
        {
            name: "Valid partially filled board",
            board: validBoard,
            expected: true
        },
        {
            name: "Invalid row duplicate",
            board: invalidRowBoard,
            expected: false
        },
        {
            name: "Invalid column duplicate",
            board: invalidColBoard,
            expected: false
        },
        {
            name: "Invalid box duplicate",
            board: invalidBoxBoard,
            expected: false
        }
    ];

    const methods = [
        { name: "Brute Force", fn: isValidSudokuBruteForce },
        { name: "Separate Checks", fn: isValidSudokuSeparateChecks },
        { name: "Optimal Sets", fn: isValidSudoku },
        { name: "Recommended", fn: isValidSudokuRecommended },
        { name: "Global Set", fn: isValidSudokuGlobalSet }
    ];

    for (const test of testCases) {
        console.log("==================================================");
        console.log(`Test Case: ${test.name}`);
        console.log(`Expected : ${test.expected}`);

        for (const method of methods) {
            const actual = method.fn(test.board);
            console.log(`${method.name.padEnd(16)} => ${actual} | Pass: ${actual === test.expected}`);
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
 * Single pass with:
 * - 9 row sets
 * - 9 column sets
 * - 9 box sets
 *
 * Core Logic:
 * -----------
 * For each filled cell:
 * - if digit already exists in row/col/box => false
 * - otherwise add it
 *
 * Box Formula:
 * ------------
 * Math.floor(r / 3) * 3 + Math.floor(c / 3)
 *
 * Complexity:
 * -----------
 * Time: O(81) => O(1)
 * Space: O(81) => O(1)
 *
 * One-line interview summary:
 * ---------------------------
 * "I validate Sudoku in one pass by tracking seen digits for each row,
 * column, and 3x3 box using Sets. Any repeated digit in one of those
 * groups makes the board invalid."
 */