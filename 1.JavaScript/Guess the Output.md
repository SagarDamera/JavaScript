# JavaScript Guess the Output Questions — Topic Wise

This file contains the deduplicated questions grouped by topic. Original question numbers are preserved inside each section for easy cross-reference.

## Topic Index

- [Type Conversion & Coercion](#type-conversion--coercion) — 28 questions
- [Equality & Comparison](#equality--comparison) — 24 questions
- [Hoisting, TDZ & Scope](#hoisting-tdz--scope) — 26 questions
- [this, Arrow Functions, call/bind](#this-arrow-functions-callbind) — 10 questions
- [Objects, References & Mutation](#objects-references--mutation) — 11 questions
- [Arrays & Array Methods](#arrays--array-methods) — 20 questions
- [Functions, Arguments, Closures & Currying](#functions-arguments-closures--currying) — 28 questions
- [Async JS, Event Loop, Promises](#async-js-event-loop-promises) — 21 questions
- [Classes, Constructors & Prototypes](#classes-constructors--prototypes) — 17 questions
- [Destructuring, Spread/Rest & Defaults](#destructuring-spreadrest--defaults) — 34 questions
- [Modules, Imports & Exports](#modules-imports--exports) — 4 questions
- [Iterators, Generators & Symbols](#iterators-generators--symbols) — 8 questions
- [DOM Events & Browser Storage](#dom-events--browser-storage) — 4 questions
- [JSON, Intl & Built-in APIs](#json-intl--built-in-apis) — 9 questions
- [Syntax Errors & Invalid Code](#syntax-errors--invalid-code) — 6 questions
- [Coding Problems / Utility Functions](#coding-problems--utility-functions) — 14 questions

---

## Type Conversion & Coercion

String/number/boolean conversion, arithmetic coercion, truthy/falsy, typeof, NaN, null/undefined behavior.

### 1. Guess the Output?

```js
let f = "8";
let a = 1;
console.log(+f + a + 1);

// Output: 10
// Explanation: Unary + converts the string "8" into number 8. Then 8 + 1 + 1 equals 10.
```

### 2. Guess the Output?

```js
console.log([11, 2, 31] + [4, 5, 6]);

// Output: "11,2,314,5,6"
// Explanation: Arrays are converted to strings, then concatenated. "11,2,31" + "4,5,6" becomes "11,2,314,5,6".
```

### 3. Guess the Output?

```js
console.log(10 + "5");
console.log("5" + 10);
console.log(10 - "5");
console.log("5" - 10);
console.log(10 * "5");
console.log("5" * 10);

// Output:
// 105
// 510
// 5
// -5
// 50
// 50

// Explanation: The - operator converts string operands to numbers before subtracting.
```

### 4. Guess the Output?

```js
const arr = [10, -1, 2];
arr.sort((a, b) => a - b);
console.log(arr);

// Output: [-1, 2, 10]
// Explanation: The compare function a - b sorts numbers in ascending order.
```

### 5. Guess the Output?

```js
const arr = [11, 0, "", false, 2, 1];
const filtered = arr.filter(Boolean);
console.log(filtered);

// Output: [11, 2, 1]
// Explanation: filter(Boolean) removes falsy values like 0, '', false, null, undefined, and NaN.
```

### 6. Guess the Output?

```js
var x = 0;
var y = 10;

if (x) {
  console.log(x);
}
if (y) {
  console.log(y);
}

// Output: 10
// Explanation: 0 is falsy, so the first if block does not run. 10 is truthy, so y is printed.
```

### 7. Guess the Output?

```js
let x = true + false;
let y = x + 1;
console.log(x, y);

// Output: 1 2
// Explanation: true is converted to 1 and false is converted to 0. So x is 1, and y is 2.
```

### 8. Guess the Output?

```js
function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi());

// Output: "number"

// Explanation:
// The `sayHi` function returns the returned value of the immediately invoked function expression (IIFE). This
// function returned `0`, which is type `"number"`.
```

### 9. Guess the Output?

```js
console.log(typeof typeof 1);

// Output: "string"

// Explanation:
// `typeof 1` returns `"number"`.
// `typeof "number"` returns `"string"`
```

### 10. Guess the Output?

```js
console.log(!!null, !!"", !!1);

// Output: false, false, true

// Explanation:
// `null` is falsy. `!null` returns `true`. `!true` returns `false`.
//
// `""` is falsy. `!""` returns `true`. `!true` returns `false`.
//
// `1` is truthy. `!1` returns `false`. `!false` returns `true`.
```

### 11. Guess the Output?

```js
console.log(+true, -true);
console.log(+false, -false);
console.log(!"Sagar", !"");

// Output:
// 1 -1
// 0 -0
// false true

// Explanation:
// +true converts the boolean value true to a number, which results in 1.
// !"Sagar" evaluates to false because the string "Sagar" is truthy, and the negation operator (!) converts it to false.
```

### 12. Guess the Output?

```js
let person = { name: "Sagar" };
const members = [person];
person = null;

console.log(members);

// Output: [{ name: "Sagar" }]

// Explanation:
// First, we declare a variable `person` with the value of an object that has a `name` property.
//
// Then, we declare a variable called `members`. We set the first element of that array equal to the value of the
// `person` variable. Objects interact by _reference_ when setting them equal to each other. When you assign a
// reference from one variable to another, you make a _copy_ of that reference. (note that they don't have the
// _same_ reference!)
//
// Then, we set the variable `person` equal to `null`.
//
// We are only modifying the value of the `person` variable, and not the first element in the array, since that
// element has a different (copied) reference to the object. The first element in `members` still holds its
// reference to the original object. When we log the `members` array, the first element still holds the value of
// the object, which gets logged.
```

### 13. Guess the Output?

```js
console.log(3 + 4 + "5");

// Output: "75"

// Explanation:
// Operator associativity is the order in which the compiler evaluates the expressions, either left-to-right or
// right-to-left. This only happens if all operators have the _same_ precedence. We only have one type of
// operator: `+`. For addition, the associativity is left-to-right.
//
// `3 + 4` gets evaluated first. This results in the number `7`.
//
// `7 + '5'` results in `"75"` because of coercion. JavaScript converts the number `7` into a string, see question
// 15. We can concatenate two strings using the `+`operator. `"7" + "5"` results in `"75"`.
```

### 14. Guess the Output?

```js
const num = parseInt("7*6", 10);

// Output: 7

// Explanation:
// Only the first number in the string is returned. Based on the _radix_ (the second argument in order to specify
// what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), the `parseInt` checks
// whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the
// radix, it stops parsing and ignores the following characters.
//
// `*` is not a valid number. It only parses `"7"` into the decimal `7`. `num` now holds the value of `7`.
```

### 15. Guess the Output?

```js
console.log(String.raw`Hello\nworld`);

// Output: Hello\nworld

// Explanation:
// `String.raw` returns a string where the escapes (`\n`, `\v`, `\t` etc.) are ignored! Backslashes can be an
// issue since you could end up with something like:
//
// `` const path = `C:\Documents\Projects\table.html` ``
//
// Which would result in:
//
// `"C:DocumentsProjects able.html"`
//
// With `String.raw`, it would simply ignore the escape and print:
//
// `C:\Documents\Projects\table.html`
//
// In this case, the string is `Hello\nworld`, which gets logged.
```

### 16. Guess the Output?

```js
function addToList(item, list) {
  return list.push(item);
}

const result = addToList("apple", ["banana"]);
console.log(result);

// Output: 2

// Explanation:
// The `.push()` method returns the _length_ of the new array! Previously, the array contained one element (the
// string `"banana"`) and had a length of `1`. After adding the string `"apple"` to the array, the array contains
// two elements, and has a length of `2`. This gets returned from the `addToList` function.
//
// The `push` method modifies the original array. If you wanted to return the _array_ from the function rather
// than the _length of the array_, you should have returned `list` after pushing `item` to it.
```

### 17. Guess the Output?

```js
function nums(a, b) {
  if (a > b) console.log("a is bigger");
  else console.log("b is bigger");
  return;
  a + b;
}

console.log(nums(4, 2));
console.log(nums(1, 2));

// Output: a is bigger, undefined and b is bigger, undefined

// Explanation:
// This means that `a + b` is never reached, since a function stops running after the `return` keyword.
```

### 18. Guess the Output?

```js
const output = `${[] && "Im"}possible! You should${"" && `n't`} see a therapist after so much JavaScript lol`;

// Output: Impossible! You should see a therapist after so much JavaScript lol

// Explanation:
// `[]` is a truthy value. With the `&&` operator, the right-hand value "Im" will be returned
// `""` is a falsy value. If the left-hand value is falsy, nothing gets returned. `n't` doesn't get returned.
```

### 19. Guess the Output?

```js
const one = false || {} || null;
const two = null || false || "";
const three = [] || 0 || true;

console.log(one, two, three);

// Output: {} "" []

// Explanation:
// With the `||` operator, we can return the first truthy operand. If all values are falsy, the last operand gets
// returned.
//
// `(false || {} || null)`: the empty object `{}` is a truthy value. This is the first (and only) truthy value,
// which gets returned. `one` is equal to `{}`.
//
// `(null || false || "")`: all operands are falsy values. This means that the last operand, `""` gets returned.
// `two` is equal to `""`.
//
// `([] || 0 || "")`: the empty array`[]` is a truthy value. This is the first truthy value, which gets returned.
// `three` is equal to `[]`.
```

### 20. Guess the Output?

```js
const set = new Set();

set.add(1);
set.add("Sagar");
set.add({ name: "Sagar" });

for (let item of set) {
  console.log(item + 2);
}

// Output: 3, Sagar2, [object Object]2
```

### 21. Guess the Output?

```js
const groceries = ["banana", "apple", "peanuts"];

if (groceries.indexOf("banana")) {
  console.log("We have to buy bananas!");
} else {
  console.log(`We don't have to buy bananas!`);
}

// Output: We don't have to buy bananas

// Explanation:
// We passed the condition `groceries.indexOf("banana")` to the if-statement. `groceries.indexOf("banana")`
// returns `0`, which is a falsy value. Since the condition in the if-statement is falsy, the code in the `else`
// block runs, and `We don't have to buy bananas!` gets logged.
```

### 22. Guess the Output?

```js
const name = "Sagar Damera";
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));

console.log(isNaN(name));
console.log(isNaN(age));

// Output: false false true false

// Explanation:
// With the `Number.isNaN` method, you can check if the value you pass is a _numeric value_ and equal to `NaN`.
// `name` is not a numeric value, so `Number.isNaN(name)` returns `false`. `age` is a numeric value, but is not
// equal to `NaN`, so `Number.isNaN(age)` returns `false`.
//
// With the `isNaN` method, you can check if the value you pass is not a number. `name` is not a number, so
// `isNaN(name)` returns true. `age` is a number, so `isNaN(age)` returns `false`.
```

### 23. Guess the Output?

```js
let count = 0;
const nums = [0, 1, 2, 3];

nums.forEach((num) => {
  if (num) count += 1;
});

console.log(count);

// Output: 3
// Explanation:
// The `if` condition within the `forEach` loop checks whether the value of `num` is truthy or falsy. Since the
// first number in the `nums` array is `0`, a falsy value, the `if` statement's code block won't be executed.
// `count` only gets incremented for the other 3 numbers in the `nums` array, `1`, `2` and `3`. Since `count` gets
// incremented by `1` 3 times, the value of `count` is `3`.
```

### 24. Guess the Output?

```js
const fruit = ["🍌", "🍊", "🍎"];

fruit.slice(0, 1);
fruit.splice(0, 1);
fruit.unshift("🍇");

console.log(fruit);

// Output: ['🍇', '🍊', '🍎']
```

### 25. Guess the Output?

```js
const strings = ["apple", "banana", "cherry", "date", "elderberry"];

function sortStrings(arr) {
  return arr.sort();
}

console.log(sortStrings(strings));

// Output: ['apple', 'banana', 'cherry', 'date', 'elderberry']
```

### 26. Guess the Output?

```js
let a = undefined;
let b = 10;
let c = a + b;
console.log(c);

// Output: NaN
// Explanation:
// Here as none of the operand is string so the + will do addition here and for this addition to take place it will make both the operands of same type i.e number type.Here,undefined will be converted into NaN and any computation with NaN yields in NaN.
```

### 27. Guess the Output?

```js
let a = 2;
let b = "2";
let c = a + b - a;
console.log(c);

// Output: 20
// Explanation:
// a + b becomes 2 + "2", resulting in "22" (string concatenation).
// Then, "22" - a becomes "22" - 2, which coerces the string back to a number, yielding 20.
```

### 28. Guess the Output?

```js
console.log(typeof (5 + "5"));
console.log(typeof (5 - "5"));

// Output: string,number
// Explanation:
// 5 + "5" results in the string "55", so typeof is string.
// 5 - "5" coerces the string to a number, resulting in 0, so typeof is number.
```

---

## Equality & Comparison

Loose equality, strict equality, object/array reference comparison, relational comparison.

### 1. Guess the Output?

```js
console.log(5 < 6 < 7);

// Output: true
// Explanation: 5 < 6 becomes true. Then true is converted to 1, so 1 < 7 is true.
```

### 2. Guess the Output?

```js
console.log(7 > 6 > 5);

// Output: false
// Explanation: 7 > 6 becomes true. Then true is converted to 1, so 1 > 5 is false.
```

### 3. Guess the Output?

```js
console.log(0 == false);
console.log(1 == true);

// Output:
// true
// true
// Explanation: With ==, JavaScript performs type coercion. false becomes 0 and true becomes 1.
```

### 4. Guess the Output?

```js
console.log({} == {});
console.log({} === {});

// Output:
// false
// false
// Explanation: Objects are compared by reference. These are two different objects in memory.
```

### 5. Guess the Output?

```js
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const str = "1,2,3";
console.log(arr1 == str);
console.log(arr1 == arr2);

// Output:
// true
// false
// Explanation: arr1 == str converts the array to "1,2,3". arr1 == arr2 is false because arrays are objects and are compared by reference.
```

### 6. Guess the Output?

```js
const a = { x: 1 };
const b = { x: 1 };
console.log(a === b);
console.log(a.x === b.x);

// Output:
// false
// true
// Explanation: a and b are different object references, so a === b is false. Their x values are both 1, so a.x === b.x is true.
```

### 7. Guess the Output?

```js
let x = ["a", "b", "c"];
let y = ["a", "b", "c"];
let z = y;
console.log(x == y);
console.log(z == y);
console.log(z == x);

// Output:
// false
// true
// false
// Explanation: Arrays are compared by reference. x and y are different arrays, but z and y point to the same array.
```

### 8. Guess the Output?

```js
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log("You are an adult!");
  } else if (data == { age: 18 }) {
    console.log("You are still an adult.");
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });

// Output: Hmm.. You don't have an age I guess
```

### 9. Guess the Output?

```js
for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}

// Output: 1 2 4
// Answer: C
// Explanation:
// The `continue` statement skips an iteration if a certain condition returns `true`.
```

### 10. Guess the Output?

```js
[1, 2, 3].map((num) => {
  if (typeof num === "number") return;
  return num * 2;
});

// Output: [undefined, undefined, undefined]
// Answer: C
// Explanation:
// When mapping over the array, the value of `num` is equal to the element it’s currently looping over. In this
// case, the elements are numbers, so the condition of the if statement `typeof num === "number"` returns `true`.
// The map function creates a new array and inserts the values returned from the function.
//
// However, we don’t return a value. When we don’t return a value from the function, the function returns
// `undefined`. For every element in the array, the function block gets called, so for each element we return
// `undefined`.
```

### 11. Guess the Output?

```js
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = (number) => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);

// Output: 10, 10
// Answer: A
// Explanation:
// The unary operator `++` _first returns_ the value of the operand, _then increments_ the value of the operand.
// The value of `num1` is `10`, since the `increaseNumber` function first returns the value of `num`, which is
// `10`, and only increments the value of `num` afterward.
//
// `num2` is `10`, since we passed `num1` to the `increasePassedNumber`. `number` is equal to `10`(the value of
// `num1`). Again, the unary operator `++` _first returns_ the value of the operand, _then increments_ the value
// of the operand. The value of `number` is `10`, so `num2` is equal to `10`.
```

### 12. Guess the Output?

```js
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));

// Output: 1 2 and undefined 3 and undefined 4
// Answer: D
// Explanation:
// The first argument that the `reduce` method receives is the _accumulator_, `x` in this case. The second
// argument is the _current value_, `y`. With the reduce method, we execute a callback function on every element
// in the array, which could ultimately result in one single value.
//
// In this example, we are not returning any values, we are simply logging the values of the accumulator and the
// current value.
//
// The value of the accumulator is equal to the previously returned value of the callback function. If you don't
// pass the optional `initialValue` argument to the `reduce` method, the accumulator is equal to the first element
// on the first call.
//
// On the first call, the accumulator (`x`) is `1`, and the current value (`y`) is `2`. We don't return from the
// callback function, we log the accumulator, and the current values: `1` and `2` get logged.
//
// If you don't return a value from a function, it returns `undefined`. On the next call, the accumulator is
// `undefined`, and the current value is `3`. `undefined` and `3` get logged.
//
// On the fourth call, we again don't return from the callback function. The accumulator is again `undefined`, and
// the current value is `4`. `undefined` and `4` get logged.
```

### 13. Guess the Output?

```js
console.log("❤️" === "❤️");

// Output: true

// Explanation:
// Under the hood, emojis are unicodes. The unicodes for the heart emoji is `"U+2764 U+FE0F"`. These are always
// the same for the same emojis, so we're comparing two equal strings to each other, which returns true.
```

### 14. Guess the Output?

```js
console.log(`${((x) => x)("I love")} to program`);

// Output: I love to program

// Explanation:
// Expressions within template literals are evaluated first. This means that the string will contain the returned
// value of the expression, the immediately invoked function `(x => x)('I love')` in this case. We pass the value
// `'I love'` as an argument to the `x => x` arrow function. `x` is equal to `'I love'`, which gets returned. This
// results in `I love to program`.
```

### Original Q165. Guess the Output?

```js
const myMap = new Map();
const myFunc = () => "greeting";

myMap.set(myFunc, "Hello world!");

//1
myMap.get("greeting");
//2
myMap.get(myFunc);
//3
myMap.get(() => "greeting");

// Output: 2
// Answer: B
// Explanation:
// When adding a key/value pair using the `set` method, the key will be the value of the first argument passed to
// the `set` function, and the value will be the second argument passed to the `set` function. The key is the
// _function_ `() => 'greeting'` in this case, and the value `'Hello world'`. `myMap` is now `{ () => 'greeting'
// => 'Hello world!' }`.
//
// 1 is wrong, since the key is not `'greeting'` but `() => 'greeting'`.
// 3 is wrong, since we're creating a new function by passing it as a parameter to the `get` method. Object
// interacts by _reference_. Functions are objects, which is why two functions are never strictly equal, even if
// they are identical: they have a reference to a different spot in memory.
```

### Original Q172. Guess the Output?

```js
const name = "Sagar Damera";

console.log(!typeof name === "object");
console.log(!typeof name === "string");

// Output: false false
// Answer: C
// Explanation:
// `typeof name` returns `"string"`. The string `"string"` is a truthy value, so `!typeof name` returns the
// boolean value `false`. `false === "object"` and `false === "string"` both return`false`.
//
// (If we wanted to check whether the type was (un)equal to a certain type, we should've written `!==` instead of
// `!typeof`)
```

### Original Q198. Guess the Output?

```js
const user = {
  email: "e@mail.com",
  password: "12345",
};

const updateUser = ({ email, password }) => {
  if (email) {
    Object.assign(user, { email });
  }

  if (password) {
    user.password = password;
  }

  return user;
};

const updatedUser = updateUser({ email: "new@email.com" });

console.log(updatedUser === user);

// Output: true
// Answer: B
// Explanation:
// The `updateUser` function updates the values of the `email` and `password` properties on user, if their values
// are passed to the function, after which the function returns the `user` object. The returned value of the
// `updateUser` function is the `user` object, which means that the value of updatedUser is a reference to the
// same `user` object that `user` points to. `updatedUser === user` equals `true`.
```

### Original Q205. Guess the Output?

```js
let randomValue = { name: "Sagar" };
randomValue = 23;

if (!typeof randomValue === "string") {
  console.log("It's not a string!");
} else {
  console.log("Yay it's a string!");
}

// Output: Yay it's a string!
// Answer: B
// Explanation:
// The condition within the `if` statement checks whether the value of `!typeof randomValue` is equal to
// `"string"`. The `!` operator converts the value to a boolean value. If the value is truthy, the returned value
// will be `false`, if the value is falsy, the returned value will be `true`. In this case, the returned value of
// `typeof randomValue` is the truthy value `"number"`, meaning that the value of `!typeof randomValue` is the
// boolean value `false`.
//
// `!typeof randomValue === "string"` always returns false, since we're actually checking `false === "string"`.
// Since the condition returned `false`, the code block of the `else` statement gets run, and `Yay it's a string!`
// gets logged.
```

### Original Q212. Guess the Output?

```js
let x = [1, 2, 3];
let y = [1, 2, 3];
let z = y;

console.log(x == y);
console.log(x === y);
console.log(z == y);
console.log(z == x);

// Output: false
// false
// true
// false
// Explanation:
// Answer -
//
// false
// false
// true
// false
//
// When comparing two objects with the == operator, it compares their references, not their values. In this case,
// x and y are different objects with the same values. z is assigned the value of y, so they refer to the same
// object. As a result, the first comparison returns false, the second comparison also returns false and the
// third comparison returns true. and the last comparison also returns false.
```

### Original Q220. Guess the Output?

```js
console.log(typeof null);
console.log(typeof undefined);
console.log(null === undefined);
console.log(null == undefined);

// Output: object
// undefined
// false
// true
// Explanation:
// object
// undefined
// false
// true
//
// `typeof null` returns object which is an error in JavaScript. This is a historical bug in the language that
// cannot be fixed without breaking existing code. So, to check for `null`, you should use `===` null instead of
// `typeof` operator.
//
// typeof undefined returns undefined.
//
// null === undefined is false because `null` and `undefined` are two distinct types in JavaScript.
//
// null == undefined is true because `==` is the loose equality operator in JavaScript, which performs type
// coercion before comparison. In this case, both null and undefined are coerced to undefined before comparison,
// and since they both have the same value, the comparison returns true. However, it is generally recommended to
// use `===` instead of `==` to avoid unexpected behavior due to type coercion.
```

### Original Q224. Guess the Output?

```js
function isPalindrome(str) {
  const reversedStr = str.split("").reverse().join("");
  return str === reversedStr;
}

// Example usage:
console.log(isPalindrome("racecar")); // Output: true
console.log(isPalindrome("hello")); // Output: false

// Output: function isPalindrome(str) {
// const reversedStr = str.split("").reverse().join("");
// return str === reversedStr;
// }
// Explanation:
// function isPalindrome(str) {
// const reversedStr = str.split("").reverse().join("");
// return str === reversedStr;
// }
//
// // Example usage:
// console.log(isPalindrome("racecar")); // Output: true
// console.log(isPalindrome("hello")); // Output: false
//
// The `isPalindrome` function takes a string as its parameter and first reverses the string using the `split()`,
// `reverse()`, and `join()` methods. It then checks if the reversed string is equal to the original string and
// returns true if they are equal and false otherwise.
//
// In the example usage, we pass the strings `racecar` and `hello` to the isPalindrome function. The function
// returns true for the first string because it is a palindrome (i.e., the reversed string is equal to the
// original string), and false for the second string.
```

### Original Q236. Guess the Output?

```js
const companies = [
  { id: "1", name: "Facebook" },
  { id: "2", name: "Apple" },
  { id: "3", name: "Google" },
];

companies.sort((a, b) => (a.name > b.name ? -1 : 1));
console.log(companies);

// Output: Answer:
// Explanation:
// The output of the code will be:
//
//
// [
// {id: "3", name:"Google"},
// {id: "1", name:"Facebook"},
// {id: "2", name:"Apple"}
// ]
//
// The comparison function takes two parameters, "a" and "b", which represent two elements being compared in the
// array.
//
// If the "name" property of "a" comes before the "name" property of "b" in alphabetical order, then the function
// returns -1, which means "a" should come before "b" in the sorted array.
//
// Otherwise, if the "name" property of "a" comes after the "name" property of "b" in alphabetical order, then
// the function returns 1, which means "b" should come before "a" in the sorted array.
```

### Original Q238. Guess the Output?

```js
const getType = (val) => (val === null ? null : val?.constructor.name);

console.log(getType(42));
console.log(getType("Hello"));
console.log(getType(true));
console.log(getType([1, 2, 3]));
console.log(getType({ name: "John", age: 25 }));
console.log(getType(null));
console.log(getType(undefined));
console.log(getType(function () {}));

//The function should print "array" for "[]" and "null" for "null" types.

// Output: number
// string
// boolean
// Array
// Object
// null
// undefined
// Function
// Explanation:
// const getType = (val) => (val === null ? null : val?.constructor.name);
//
// The output of the code will be:
//
// number
// string
// boolean
// Array
// Object
// null
// undefined
// Function
//
// The function getType takes a value as an argument and returns its type. If the value is null, it returns null.
// Otherwise, it uses the constructor.name property to determine the type of the value.
//
// - getType(42) returns "number" because 42 is a numeric value.
// - getType("Hello") returns "string" because "Hello" is a string.
// - getType(true) returns "boolean" because true is a boolean value.
// - getType([1, 2, 3]) returns "Array" because arrays are considered objects in JavaScript, and the constructor
// name for an array is "Array".
// - getType({ name: "John", age: 25 }) returns "Object" because objects are considered objects in JavaScript,
// and the constructor name for an object is "Object".
// - getType(null) returns null because null is a special value in JavaScript.
// - getType(undefined) returns "undefined" because it is a special value in JavaScript representing an
// uninitialized variable.
// - getType(function() {}) returns "Function" because it is a function object, and the constructor name for a
// function is "Function".
// - The getType function can be used to dynamically determine the type of values in JavaScript.
```

### Original Q264. Guess the Output?

```js
function changeAgeAndReference(person) {
  person.age = 25;
  person = {
    name: "John",
    age: 50,
  };

  return person;
}

const personObj1 = {
  name: "Alex",
  age: 30,
};

const personObj2 = changeAgeAndReference(personObj1);

console.log(personObj1); // -> ?
console.log(personObj2); // -> ?

// Output:
// { name: 'Alex', age: 25 }
// { name: 'John', age: 50 }
// Explanation:
// The function first changes the property age on the original object it was passed in. It then reassigns the variable to a brand new object and returns that object. Here’s what the two objects are logged out.
```

---

## Hoisting, TDZ & Scope

var hoisting, let/const temporal dead zone, function scope, block scope, shadowing.

### Original Q2. Guess the Output?

```js
x = 10;
console.log(x);
var x;

// Output: 10
// Explanation: The var declaration is hoisted to the top, so x exists before the assignment. The value 10 is printed.
```

### Original Q8. Guess the Output?

```js
let a = 10;
if (true) {
  let a = 20;
  console.log(a, "inside");
}
console.log(a, "outside");

// Output:
// 20 inside
// 10 outside
// Explanation: The inner let a is block-scoped inside the if block. It does not change the outer a.
```

### Original Q9. Guess the Output?

```js
var a = "xyz";
var a = "pqr";
console.log(a);

// Output: pqr
// Explanation: var allows redeclaration in the same scope. The second assignment changes a to "pqr".
```

### Original Q22. Guess the Output?

```js
function checkValue(value) {
  var result = Array.isArray(value);
  console.log(result);
}
checkValue([1, 2, 3]);

// Output: true
// Explanation: Array.isArray() returns true because [1, 2, 3] is an array.
```

### Original Q26. Guess the Output?

```js
console.log(printName());
function printName() {
  return "Hi my name is Bob";
}

// Output: Hi my name is Bob
// Explanation: Function declarations are hoisted, so printName can be called before its declaration.
```

### Original Q27. Guess the Output?

```js
console.log(printName());
const printName = () => {
  return "Hi my name is Bob";
};

// Output: ReferenceError: Cannot access 'printName' before initialization
// Explanation: const variables are hoisted but stay in the temporal dead zone until initialized. So the arrow function cannot be called before initialization.
```

### Original Q29. Guess the Output?

```js
function hello() {
  console.log(name);
  console.log(age);
  var name = "Alice";
  let age = 21;
}
hello();

// Output:
// undefined
// ReferenceError: Cannot access 'age' before initialization
// Explanation: var name is hoisted and initialized with undefined. let age is hoisted but remains in the temporal dead zone until its declaration line.
```

### Original Q51. Guess the Output?

```js
function printName(firstName, lastName) {
  firstName = "Aman";
  lastName = "Bhoria";
  return arguments[0] + " " + arguments[1];
}
let name = printName("John", "Doe");
console.log(name);

// Output: Aman Bhoria
// Explanation: In non-strict mode, function parameters and the arguments object are linked. Updating parameters also updates arguments[0] and arguments[1].
```

### Original Q71. Guess the Output?

```js
function getAge() {
  "use strict";
  age = 21;
  console.log(age);
}

getAge();

// Output: ReferenceError
// Answer: C
// Explanation:
// With `"use strict"`, you can make sure that you don't accidentally declare global variables. We never declared
// the variable `age`, and since we use `"use strict"`, it will throw a reference error. If we didn't use `"use
// strict"`, it would have worked, since the property `age` would have gotten added to the global object.
```

### Original Q74. Guess the Output?

```js
var num = 8;
var num = 10;

console.log(num);

// Output: 10
// Answer: B
// Explanation:
// With the `var` keyword, you can declare multiple variables with the same name. The variable will then hold the
// latest value.
//
// You cannot do this with `let` or `const` since they're block-scoped and therefore can't be redeclared.
```

### Original Q88. Guess the Output?

```js
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    ((x = 1), (y = 2));
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();

// Output: 1 undefined 2
// Answer: A
// Explanation:
// The `catch` block receives the argument `x`. This is not the same `x` as the variable when we pass arguments.
// This variable `x` is block-scoped.
//
// Later, we set this block-scoped variable equal to `1`, and set the value of the variable `y`. Now, we log the
// block-scoped variable `x`, which is equal to `1`.
//
// Outside of the `catch` block, `x` is still `undefined`, and `y` is `2`. When we want to `console.log(x)`
// outside of the `catch` block, it returns `undefined`, and `y` returns `2`.
```

### Original Q104. Guess the Output?

```js
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);

// Output: "undefined", "number"
// Answer: A
// Explanation:
// `let x = (y = 10);` is actually shorthand for:
//
// y = 10;
// let x = y;
//
// When we set `y` equal to `10`, we actually add a property `y` to the global object (`window` in the browser,
// `global` in Node). In a browser, `window.y` is now equal to `10`.
//
// Then, we declare a variable `x` with the value of `y`, which is `10`. Variables declared with the `let` keyword
// are _block scoped_, they are only defined within the block they're declared in; the immediately invoked
// function expression (IIFE) in this case. When we use the `typeof` operator, the operand `x` is not defined: we
// are trying to access `x` outside of the block it's declared in. This means that `x` is not defined. Values who
// haven't been assigned a value or declared are of type `"undefined"`. `console.log(typeof x)` returns
// `"undefined"`.
//
// However, we created a global variable `y` when setting `y` equal to `10`. This value is accessible anywhere in
// our code. `y` is defined, and holds a value of type `"number"`. `console.log(typeof y)` returns `"number"`.
```

### Original Q134. Guess the Output?

```js
function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you're too young.";
  } else {
    const message = "Yay! You're old enough!";
  }

  return message;
}

console.log(checkAge(21));

// Output: ReferenceError
// Answer: C
// Explanation:
// Variables with the `const` and `let` keywords are _block-scoped_. A block is anything between curly brackets
// (`{ }`). In this case, the curly brackets of the if/else statements. You cannot reference a variable outside of
// the block it's declared in, a ReferenceError gets thrown.
```

### Original Q161. Guess the Output?

```js
let name = "Sagar";

function getName() {
  console.log(name);
  let name = "Sarah";
}

getName();

// Output: ReferenceError
// Answer: D
// Explanation:
// Each function has its own _execution context_ (or _scope_). The `getName` function first looks within its own
// context (scope) to see if it contains the variable `name` we're trying to access. In this case, the `getName`
// function contains its own `name` variable: we declare the variable `name` with the `let` keyword, and with the
// value of `'Sarah'`.
//
// Variables with the `let` keyword (and `const`) are hoisted, but unlike `var`, don't get initialized. They are
// not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we
// try to access the variables before they are declared, JavaScript throws a `ReferenceError`.
//
// If we wouldn't have declared the `name` variable within the `getName` function, the javascript engine would've
// looked down the _scope chain_. The outer scope has a variable called `name` with the value of `Sagar`. In that
// case, it would've logged `Sagar`.
//
// let name = 'Sagar';
//
// function getName() {
// console.log(name);
// }
//
// getName(); // Sagar
```

### Original Q173. Guess the Output?

```js
const add = (x) => (y) => (z) => {
  console.log(x, y, z);
  return x + y + z;
};

add(4)(5)(6);

// Output: 4 5 6
// Answer: A
// Explanation:
// The `add` function returns an arrow function, which returns an arrow function, which returns an arrow function
// (still with me?). The first function receives an argument `x` with the value of `4`. We invoke the second
// function, which receives an argument `y` with the value `5`. Then we invoke the third function, which receives
// an argument `z` with the value `6`. When we're trying to access the value `x`, `y` and `z` within the last
// arrow function, the JS engine goes up the scope chain in order to find the values for `x` and `y` accordingly.
// This returns `4` `5` `6`.
```

### Original Q179. Guess the Output?

```js
const randomValue = 21;

function getInfo() {
  console.log(typeof randomValue);
  const randomValue = "Sagar Damera";
}

getInfo();

// Output: ReferenceError
// Answer: D
// Explanation:
// Variables declared with the `const` keyword are not referenceable before their initialization: this is called
// the _temporal dead zone_. In the `getInfo` function, the variable `randomValue` is scoped in the functional
// scope of `getInfo`. On the line where we want to log the value of `typeof randomValue`, the variable
// `randomValue` isn't initialized yet: a `ReferenceError` gets thrown! The engine didn't go down the scope chain
// since we declared the variable `randomValue` in the `getInfo` function.
```

### Original Q211. Guess the Output?

```js
let x = 1;

if (function f() {}) {
  x += typeof f;
}

console.log(x);

// Output: 1undefined
// Explanation:
// Answer - 1undefined
//
// The if statement is evaluating the function f as a boolean value. In JavaScript, functions are truthy values,
// so the condition will evaluate to true and the code block inside the if statement will be executed. The value
// of x is then incremented by the string "undefined", which is the result of calling typeof f.
```

### Original Q215. Guess the Output?

```js
let num = 0;

function test() {
  var num = 1;
  return num;
}

console.log(test());
console.log(num);

// Output: 1
// 0
// Explanation:
// 1
// 0
//
// The code defines a global variable num with the value of 0 and then a function test which declares a local
// variable num with the value of 1 and returns it.
//
// When test() is called, it first declares a local variable num with the value of 1.
//
// Then the function return statement logs 1 on the console.
//
// After that, it logs the value of global variable num which is 0.
//
// Because the global and local variables have different scope and different memory allocation.
```

### Original Q237. Guess the Output?

```js
console.log(typeof 42);
console.log(typeof "Hello");
console.log(typeof true);
console.log(typeof [1, 2, 3]);
console.log(typeof { name: "John", age: 25 });
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof function () {});

// Output: number
// string
// boolean
// object
// object
// object
// undefined
// function
// Explanation:
// number
// string
// boolean
// object
// object
// object
// undefined
// function
//
// The typeof operator in JavaScript is used to determine the type of a value or expression. Here's the breakdown
// of the output:
//
// - typeof 42 returns "number" because 42 is a numeric value.
// - typeof "Hello" returns "string" because "Hello" is a string.
// - typeof true returns "boolean" because true is a boolean value.
// - typeof [1, 2, 3] returns "object" because arrays are considered objects in JavaScript.
// - typeof { name: "John", age: 25 } returns "object" because objects are considered objects in JavaScript.
// - typeof null returns "object", which is a known quirk in JavaScript. null is considered an object type.
// - typeof undefined returns "undefined" because it is a special value in JavaScript representing an
// uninitialized variable.
// - typeof function() {} returns "function" because it is a function object.
```

### Original Q239. Guess the Output?

```js
function calculateSum() {
  console.log(result);
  var num1 = 5;
  let num2 = 10;
  const num3 = 15;
  var result = num1 + num2 + num3;
}

calculateSum();

// Output: B: undefined
// Explanation:
// Answer -
// B: undefined
//
// In the code, the variable result is declared using the var keyword, but it is assigned a value after the
// console.log statement.
//
// When JavaScript executes the function calculateSum(), it hoists the variable declaration of result to the top
// of the function scope. However, since the assignment of the value num1 + num2 + num3 comes after the
// console.log statement, the variable is undefined at the point of the console.log.
//
// So, the code is effectively interpreted like this:
//
// function calculateSum() {
// var result; // Variable declaration is hoisted to the top
//
// console.log(result); // undefined
//
// var num1 = 5;
// let num2 = 10;
// const num3 = 15;
// result = num1 + num2 + num3; // Assignment is performed here
// }
//
// calculateSum();
//
// Since the variable result is hoisted, it exists in the function scope but does not have any assigned value
// until after the console.log statement. Therefore, when console.log(result) is executed, the variable result
// exists but is undefined.
```

### Original Q240. Guess the Output?

```js
let x = 10;

function updateX() {
  if (true) {
    let x = 20;
    console.log(x);
  }
  console.log(x);
}

updateX();

// Output: B: 20, 10
// Explanation:
// Answer -
// B: 20, 10
//
// In this code, the variable `x` is declared and assigned a value of `10` outside the `updateX` function.
//
// Inside the function, a new block is created using an `if` statement. Within that block, a new variable `x` is
// declared and assigned a value of `20` using `let`. This creates a separate scope for the inner `x`, which is
// only accessible within the `if` block.
//
// When the `console.log` statements are executed, the first one inside the `if` block will output `20`, as it
// refers to the inner `x` variable. The second `console.log` statement outside the `if` block will output `10`,
// as it refers to the outer `x` variable.
//
// Therefore, the output will be `20, 10`.
```

### Original Q243. Guess the Output?

```js
let x = 10;

function outer() {
  console.log(x);

  if (false) {
    var x = 20;
  }
}

outer();

// Output: C: undefined
// Explanation:
// C: undefined
//
// In this code snippet, there's a variable hoisting issue with the var declaration inside the outer function.
// The variable x is declared using var within the outer function scope.
//
// When the function outer() is called, the console.log(x) statement is executed. At this point, the variable x
// is hoisted to the top of the function scope and is initialized with undefined. This means that the local
// variable x inside the function is different from the global x.
//
// The if (false) block will not be executed, so the assignment var x = 20; will not take place.
//
// Thus, the console.log(x) statement inside the outer function will log the value of the locally hoisted
// variable x, which is undefined.
//
// Hence, the correct answer is C: undefined.
```

### Original Q260. Guess the Output?

```js
const user = {
  firstName: "John",
};
console.log(user.firstName);
console.log(user["firstName"]);
console.log(user[firstName]);

// Output: John,John,Reference Error
// Explanation:
// user[firstName] expression will look into the global scope for variable firstName and will not able to find any variable with name firstName and thus gives us error.
```

### Original Q261. Guess the Output?

```js
let firstName = "myName";
const user = {
  myName: "John",
};
console.log(user.myName);
console.log(user["myName"]);
console.log(user[firstName]);

// Output: John,John,John
// Explanation:
// user[firstName] expression will look into the global scope for variable firstName and will be succedd in finding variable with name firstName and thus replace the firstName variable with "myName" and then look into the user object for the key myName and then gives us its value.
```

### Original Q265. Guess the Output?

```js
function func1() {
  console.log("global func1");
}
const obj = {
  func1() {
    console.log("local func1");
  },
  func2() {
    console.log("local func3");
  },
  func3() {
    obj.func1();
    func1();
    func2();
  },
};

obj.func3();

// Output: local func1,global func1,ReferenceError: func2 is not defined
// Explanation:
// We need to keep one thing in our mind that the properites of object can be access either using dot notation or bracket notation.
// So,in this code the 1st console statement result is understandable.Now after that we try to call func1() method the js will look for this func1 method inside the func3 scope and here it will not able to find it ,so it will check func1 in global scope directly and will call the global func1 function.
// Now for the func2() call, the js will neither able to find fuc2 in func3 scope nor in global scope so it will give error that func2 is not defined.
```

### Original Q269. Guess the Output?

```js
var a = 5;
var a = 10;
var a;
console.log(a);

// Output: 10
// Explanation:
// var a; → Redundant declaration only → ignored.
// var a = 10; → Redundant declaration + assignment → declaration ignored, but assignment is executed.
```

---

## this, Arrow Functions, call/bind

this binding, arrow function this, method extraction, call/apply/bind.

### Original Q54. Guess the Output?

```js
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

console.log(shape.diameter());
console.log(shape.perimeter());

// Output: 20 and NaN
// Answer: B
// Explanation:
// Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function.
//
// With arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions!
// This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope
// (window for example).
//
// Since there is no value `radius` in the scope of the arrow function, `this.radius` returns `undefined` which,
// when multiplied by `2 * Math.PI`, results in `NaN`.
```

### Original Q77. Guess the Output?

```js
// Source Question: The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.
// Options:
// A: true
// B: false
// C: it depends

// Output: true
// Answer: A
// Explanation:
// The base execution context is the global execution context: it's what's accessible everywhere in your code.
```

### Original Q83. Guess the Output?

```js
const person = { name: "Sagar" };

function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));

// Output: Sagar is 21 function
// Answer: D
// Explanation:
// With both, we can pass the object to which we want the `this` keyword to refer to. However, `.call` is also
// _executed immediately_!
//
// `.bind.` returns a _copy_ of the function, but with a bound context! It is not executed immediately.
```

### Original Q169. Guess the Output?

```js
const person = {
  firstName: "Sagar",
  lastName: "Damera",
  pet: {
    name: "Mara",
    breed: "Dutch Tulip Hound",
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());

// Output: Mara undefined Sagar Damera ReferenceError
// Answer: B
// Explanation:
// With the optional chaining operator `?.`, we no longer have to explicitly check whether the deeper nested
// values are valid or not. If we're trying to access a property on an `undefined` or `null` value (_nullish_),
// the expression short-circuits and returns `undefined`.
//
// `person.pet?.name`: `person` has a property named `pet`: `person.pet` is not nullish. It has a property called
// `name`, and returns `Mara`.
// `person.pet?.family?.name`: `person` has a property named `pet`: `person.pet` is not nullish. `pet` does _not_
// have a property called `family`, `person.pet.family` is nullish. The expression returns `undefined`.
// `person.getFullName?.()`: `person` has a property named `getFullName`: `person.getFullName()` is not nullish
// and can get invoked, which returns `Sagar Damera`.
// `member.getLastName?.()`: variable `member` is non-existent therefore a `ReferenceError` gets thrown!
```

### Original Q171. Guess the Output?

```js
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang);
  },
};

console.log(config.language);

// Output: undefined
// Answer: D
// Explanation:
// The `language` method is a `setter`. Setters don't hold an actual value, their purpose is to _modify_
// properties. When calling a `setter` method, `undefined` gets returned.
```

### Original Q201. Guess the Output?

```js
const user = {
  email: "my@email.com",
  updateEmail: (email) => {
    this.email = email;
  },
};

user.updateEmail("new@email.com");
console.log(user.email);

// Output: my@email.com
// Answer: A
// Explanation:
// The `updateEmail` function is an arrow function, and is not bound to the `user` object. This means that the
// `this` keyword is not referring to the `user` object, but refers to  the global scope in this case. The value
// of `email` within the `user` object does not get updated. When logging the value of `user.email`, the original
// value of `my@email.com` gets returned.
```

### Original Q207. Guess the Output?

```js
const obj = {
  a: "foo",
  b: function () {
    console.log(this.a);
  },
};

const c = obj.b;

obj.b();
c();

// Output: foo, undefined
// Explanation:
// Answer - foo, undefined
//
// When the method obj.b is called directly on obj, the output will be "foo". This is because this refers to the
// object that the method is called on, and obj.a is equal to "foo".
//
// When the variable c is assigned the value of obj.b, it is a reference to the function itself and not the
// object obj. When c is called, it is not called on an object, so this will not refer to obj and the value of
// this.a is undefined. As a result, the output when calling c() will be undefined.
```

### Original Q266. Guess the Output?

```js
function func1() {
  console.log("global func1", this);
}
const obj = {
  func1() {
    console.log("local func1", this);
  },
  func2() {
    console.log("local func3", this);
  },
  func3() {
    obj.func1();
    func1();
    func2();
  },
};

obj.func3();

// Output:
// local func1 {func1: ƒ, func2: ƒ, func3: ƒ},
// global func1 Window {window: Window, self: Window, document: document, name: '', location: Location, …},
// ReferenceError: func2 is not defined
// Explanation:
// Similar to above question.
```

### Original Q267. Guess the Output?

```js
const obj = {
  firstName: this,
  pata: {
    pinCode: this,
    moreDetails: function () {
      console.log(this);
    },
  },
};

console.log(obj.firstName);
console.log(obj.pata.pinCode);
console.log(obj.pata.moreDetails());

// Output:
// Window {window: Window, self: Window, document: document, name: '', location: Location, …},
// Window {window: Window, self: Window, document: document, name: '', location: Location, …},
// {pinCode: Window, moreDetails: ƒ}
// Explanation:
// Reason to be published.
```

### Original Q268. Guess the Output?

```js
function demo() {
  const obj = {
    firstName: this,
    address: {
      pata: this,
    },
    findBlood() {
      console.log(this);
      return "";
    },
  };
  console.log(obj.firstName);
  console.log(obj.address.pata);
  console.log(obj.findBlood());
}
demo();

// Output:
// Window {window: Window, self: Window, document: document, name: '', location: Location, …},
// Window {window: Window, self: Window, document: document, name: '', location: Location, …},
// {firstName: Window, address: {…}, findBlood: ƒ}
// Explanation:
// Reason to be published.
```

---

## Objects, References & Mutation

Object references, shallow copy, Object.assign, freeze/seal, object keys, mutation behavior.

### Original Q49. Guess the Output?

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const finalObj = Object.assign({}, obj1, obj2);
console.log(finalObj);

// Output: { a: 1, b: 3, c: 4 }
// Explanation: Object.assign merges objects from left to right. If keys conflict, the later object's value overwrites the earlier one.
```

### Original Q75. Guess the Output?

```js
const obj = { 1: "a", 2: "b", 3: "c" };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty("1");
obj.hasOwnProperty(1);
set.has("1");
set.has(1);

// Output: true true false true
// Answer: C
// Explanation:
// All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string.
// This is why `obj.hasOwnProperty('1')` also returns true.
//
// It doesn't work that way for a set. There is no `'1'` in our set: `set.has('1')` returns `false`. It has the
// numeric type `1`, `set.has(1)` returns `true`.
```

### Original Q76. Guess the Output?

```js
const obj = { a: "one", b: "two", a: "three" };
console.log(obj);

// Output: { a: "three", b: "two" }
// Answer: C
// Explanation:
// If you have two keys with the same name, the key will be replaced. It will still be in its first position, but
// with the last specified value.
```

### Original Q97. Guess the Output?

```js
const person = {
  name: "Sagar",
  age: 21,
};

for (const item in person) {
  console.log(item);
}

// Output: "name", "age"
// Answer: B
// Explanation:
// With a `for-in` loop, we can iterate through object keys, in this case `name` and `age`. Under the hood, object
// keys are strings (if they're not a Symbol). On every loop, we set the value of `item` equal to the current key
// it’s iterating over. First, `item` is equal to `name`, and gets logged. Then, `item` is equal to `age`, which
// gets logged.
```

### Original Q125. Guess the Output?

```js
const box = { x: 10, y: 20 };

Object.freeze(box);

const shape = box;
shape.x = 100;

console.log(shape);

// Output: { x: 10, y: 20 }
// Answer: B
// Explanation:
// `Object.freeze` makes it impossible to add, remove, or modify properties of an object (unless the property's
// value is another object).
//
// When we create the variable `shape` and set it equal to the frozen object `box`, `shape` also refers to a
// frozen object. You can check whether an object is frozen by using `Object.isFrozen`. In this case,
// `Object.isFrozen(shape)` would return true, since the variable `shape` has a reference to a frozen object.
//
// Since `shape` is frozen, and since the value of `x` is not an object, we cannot modify the property `x`. `x` is
// still equal to `10`, and `{ x: 10, y: 20 }` gets logged.
```

### Original Q133. Guess the Output?

```js
const person = {
  name: "Sagar",
  age: 21,
};

let city = person.city;
city = "Amsterdam";

console.log(person);

// Output: { name: "Sagar", age: 21 }
// Answer: A
// Explanation:
// We set the variable `city` equal to the value of the property called `city` on the `person` object. There is no
// property on this object called `city`, so the variable `city` has the value of `undefined`.
//
// Note that we are _not_ referencing the `person` object itself! We simply set the variable `city` equal to the
// current value of the `city` property on the `person` object.
//
// Then, we set `city` equal to the string `"Amsterdam"`. This doesn't change the person object: there is no
// reference to that object.
//
// When logging the `person` object, the unmodified object gets returned.
```

### Original Q186. Guess the Output?

```js
const person = { name: "Sagar Damera" };

Object.seal(person);

// Output: person.name = "Evan Bacon"
// Answer: A
// Explanation:
// With `Object.seal` we can prevent new properties from being _added_, or existing properties to be _removed_.
//
// However, you can still modify the value of existing properties.
```

### Original Q187. Guess the Output?

```js
const person = {
  name: "Sagar Damera",
  address: {
    street: "100 Main St",
  },
};

Object.freeze(person);

// Output: person.address.street = "101 Main St"
// Answer: C
// Explanation:
// The `Object.freeze` method _freezes_ an object. No properties can be added, modified, or removed.
//
// However, it only _shallowly_ freezes the object, meaning that only _direct_ properties on the object are
// frozen. If the property is another object, like `address` in this case, the properties on that object aren't
// frozen, and can be modified.
```

### Original Q206. Guess the Output?

```js
let obj1 = { key: "value" };
let obj2 = obj1;
let obj3 = obj2;

obj1.key = "new value";
obj2 = { key: "another value" };

console.log(obj1.key, obj2.key, obj3.key);

// Output: `new value` `another value` `new value`.
// Explanation:
// The output of this code will be `new value` `another value` `new value`.
//
// In this code, we are declaring three variables obj1, obj2, and obj3, and assigning an object to each of them.
// Then, we are reassigning a new object to obj2 and modifying a property of obj1.
//
// When the console.log statement is executed, it logs the values of the key property for each object. The value
// of the key property for obj1 is "new value", the value of the key property for obj2 is "another value", and
// the value of the key property for obj3 is "new value".
//
// This is because when an object is assigned to a variable, the variable stores a reference to the object in
// memory rather than the object itself. Changing the value of a property of the object using one variable will
// affect the value of that property when accessed using a different variable that references the same object.
// However, reassigning a new object to a variable will change the reference stored in that variable, so the
// original object is no longer accessible using that variable.
//
// In this case, the value of the key property for obj1 was changed to "new value" using the obj1 variable, which
// affected the value of the key property when accessed using the obj3 variable, because both variables reference
// the same object. However, the value of the key property for obj2 was not affected, because the obj2 variable
// was reassigned to reference a new object.
```

### Original Q218. Guess the Output?

```js
const name = "John";
const age = 25;

const user = { name, age };
console.log(user);

// Output: { name: "John", age: 25 }
// Explanation:
// { name: "John", age: 25 }
//
// The code defines two variables name and age with values "John" and 25 respectively.
//
// Then, it uses `object literal` notation to create an object user with properties `name` and `age` and the
// values are assigned from the variables name and age respectively.
//
// So, the `console.log` statement logs the user object which is `{ name: "John", age: 25 }`.
//
// In `ES6+`, you can use object literal notation to create objects with properties using the same name as the
// variables with the values assigned to them.
```

### Original Q241. Guess the Output?

```js
const person = {
  name: "John",
  age: 30,
};

Object.freeze(person);
person.age = 40;

console.log(person.age);

// Output: A: 30
// Explanation:
// Answer -
// A: 30
//
// In this code, the `Object.freeze()` method is used to make
//
// the `person` object immutable. This means that the properties of the object cannot be modified.
//
// When attempting to assign a new value to `person.age` after freezing the object, it does not throw an error or
// modify the object. Instead, it silently fails in non-strict mode and throws a TypeError in strict mode.
//
// Since the code is not running in strict mode, the assignment `person.age = 40` does not have any effect.
// Therefore, when `console.log(person.age)` is executed, it will output the original value of `30`.
//
// Hence, the output will be `30`.
```

---

## Arrays & Array Methods

Array methods, indexing, length, sort, map/filter/reduce/slice/splice, spread arrays.

### Original Q1. Guess the Output?

```js
let arr = [1, 2, 3, 4, 5, -6, 7];
arr.length = 0;
console.log(arr);

// Output: []
// Explanation: Setting arr.length to 0 removes all elements from the array, so it becomes empty.
```

### Original Q19. Guess the Output?

```js
console.log("apple".split(""));

// Output: ['a', 'p', 'p', 'l', 'e']
// Explanation: split('') splits the string into an array of individual characters.
```

### Original Q20. Guess the Output?

```js
const arr = [2, 3, 5, 2, 8, 10, 5];
console.log(arr.indexOf(5));

// Output: 2
// Explanation: indexOf returns the index of the first matching element. The first 5 is at index 2.
```

### Original Q21. Guess the Output?

```js
const array = [8, 18, 28, 38];
const result = array
  .map((element) => element + 2)
  .filter((element) => element > 25);
console.log(result);

// Output: [30, 40]
// Explanation: map adds 2 to each element, giving [10, 20, 30, 40]. filter keeps values greater than 25.
```

### Original Q44. Guess the Output?

```js
var array = [1, 2, 3, 4, 5];
delete array[2];
console.log(array.length);

// Output: 5
// Explanation: delete removes the element value but does not reindex the array or change its length. It leaves an empty slot.
```

### Original Q87. Guess the Output?

```js
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);

// Output: [1, 2, 3, empty x 7, 11]
// Answer: C
// Explanation:
// When you set a value to an element in an array that exceeds the length of the array, JavaScript creates
// something called "empty slots". These actually have the value of `undefined`, but you will see something like:
//
// `[1, 2, 3, empty x 7, 11]`
//
// depending on where you run it (it's different for every browser, node, etc.)
```

### Original Q90. Guess the Output?

```js
[
  [0, 1],
  [2, 3],
].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);

// Output: [1, 2, 0, 1, 2, 3]
// Answer: C
// Explanation:
// `[1, 2]` is our initial value. This is the value we start with, and the value of the very first `acc`. During
// the first round, `acc` is `[1,2]`, and `cur` is `[0, 1]`. We concatenate them, which results in `[1, 2, 0, 1]`.
//
// Then, `[1, 2, 0, 1]` is `acc` and `[2, 3]` is `cur`. We concatenate them, and get `[1, 2, 0, 1, 2, 3]`
```

### Original Q130. Guess the Output?

```js
const list = [1 + 2, 1 * 2, 1 / 2];
console.log(list);

// Output: [3, 2, 0.5]
// Answer: C
// Explanation:
// Array elements can hold any value. Numbers, strings, objects, other arrays, null, boolean values, undefined,
// and other expressions such as dates, functions, and calculations.
//
// The element will be equal to the returned value. `1 + 2` returns `3`, `1 * 2` returns `2`, and `1 / 2` returns
// `0.5`.
```

### Original Q141. Guess the Output?

```js
let newList = [1, 2, 3].push(4);

console.log(newList.push(5));

// Output: Error
// Answer: D
// Explanation:
// The `.push` method returns the _new length_ of the array, not the array itself! By setting `newList` equal to
// `[1, 2, 3].push(4)`, we set `newList` equal to the new length of the array: `4`.
//
// Then, we try to use the `.push` method on `newList`. Since `newList` is the numerical value `4`, we cannot use
// the `.push` method: a TypeError is thrown.
```

### Original Q158. Guess the Output?

```js
const emojis = ["✨", "🥑", "😍"];

emojis.map((x) => x + "✨");
emojis.filter((x) => x !== "🥑");
emojis.find((x) => x !== "🥑");
emojis.reduce((acc, cur) => acc + "✨");
emojis.slice(1, 2, "✨");
emojis.splice(1, 2, "✨");

// Output: splice
// Answer: D
// Explanation:
// With `splice` method, we modify the original array by deleting, replacing or adding elements. In this case, we
// removed 2 items from index 1 (we removed `'🥑'` and `'😍'`) and added the ✨ emoji instead.
//
// `map`, `filter` and `slice` return a new array, `find` returns an element, and `reduce` returns a reduced value.
```

### Original Q159. Guess the Output?

```js
const food = ["🍕", "🍫", "🥑", "🍔"];
const info = { favoriteFood: food[0] };

info.favoriteFood = "🍝";

console.log(food);

// Output: ['🍕', '🍫', '🥑', '🍔']
// Answer: A
// Explanation:
// We set the value of the `favoriteFood` property on the `info` object equal to the string with the pizza emoji,
// `'🍕'`. A string is a primitive data type. In JavaScript, primitive data types don't interact by reference.
//
// In JavaScript, primitive data types (everything that's not an object) interact by _value_. In this case, we set
// the value of the `favoriteFood` property on the `info` object equal to the value of the first element in the
// `food` array, the string with the pizza emoji in this case (`'🍕'`). A string is a primitive data type, and
// interact by value (see my blogpost if you're interested in learning more)
//
// Then, we change the value of the `favoriteFood` property on the `info` object. The `food` array hasn't changed,
// since the value of `favoriteFood` was merely a _copy_ of the value of the first element in the array, and
// doesn't have a reference to the same spot in memory as the element on `food[0]`. When we log food, it's still
// the original array, `['🍕', '🍫', '🥑', '🍔']`.
```

### Original Q168. Guess the Output?

```js
let num = 1;
const list = ["🥳", "🤠", "🥰", "🤪"];

console.log(list[(num += 1)]);

// Output: 🥰
// Answer: B
// Explanation:
// With the `+=` operator, we're incrementing the value of `num` by `1`. `num` had the initial value `1`, so `1 +
// 1` is `2`. The item on the second index in the `list` array is 🥰, `console.log(list[2])` prints 🥰.
```

### Original Q191. Guess the Output?

```js
const person = {
  name: "Sagar Damera",
  hobbies: ["coding"],
};

function addHobby(hobby, hobbies = person.hobbies) {
  hobbies.push(hobby);
  return hobbies;
}

addHobby("running", []);
addHobby("dancing");
addHobby("baking", person.hobbies);

console.log(person.hobbies);

// Output: ["coding", "dancing", "baking"]
// Answer: C
// Explanation:
// The `addHobby` function receives two arguments, `hobby` and `hobbies` with the default value of the `hobbies`
// array on the `person` object.
//
// First, we invoke the `addHobby` function, and pass `"running"` as the value for `hobby` and an empty array as
// the value for `hobbies`. Since we pass an empty array as the value for `hobbies`, `"running"` gets added to
// this empty array.
//
// Then, we invoke the `addHobby` function, and pass `"dancing"` as the value for `hobby`. We didn't pass a value
// for `hobbies`, so it gets the default value, the `hobbies` property on the `person` object. We push the hobby
// `dancing` to the `person.hobbies` array.
//
// Last, we invoke the `addHobby` function, and pass `"baking"` as the value for `hobby`, and the `person.hobbies`
// array as the value for `hobbies`. We push the hobby `baking` to the `person.hobbies` array.
//
// After pushing `dancing` and `baking`, the value of `person.hobbies` is `["coding", "dancing", "baking"]`
```

### Original Q193. Guess the Output?

```js
const emojis = ["🎄", "🎅🏼", "🎁", "⭐"];

/* 1 */ emojis.push("🦌");
/* 2 */ emojis.splice(0, 2);
/* 3 */ emojis = [...emojis, "🥂"];
/* 4 */ emojis.length = 0;

// Output: 3
// Answer: D
// Explanation:
// The `const` keyword simply means we cannot _redeclare_ the value of that variable, it's _read-only_. However,
// the value itself isn't immutable. The properties on the `emojis` array can be modified, for example by pushing
// new values, splicing them, or setting the length of the array to 0.
```

### Original Q210. Guess the Output?

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach(function (element) {
  console.log(element);
});

// Output: 1, 2, 3, 4, 5
// Explanation:
// Answer - 1, 2, 3, 4, 5
//
// The forEach method is called on the arr array and a callback function is passed as an argument. The callback
// function will be executed for each element in the array, with the element passed as an argument to the
// callback. As a result, the output will be the elements of the array, 1, 2, 3, 4, and 5, printed on separate
// lines.
```

### Original Q214. Guess the Output?

```js
let a = { x: 1 };
let b = { x: 2 };
let c = { x: 3 };
let d = { x: 4 };
let e = { x: 5 };
let arr = [a, b, c, d, e];

arr.forEach((obj) => (obj.x = obj.x * 2));

console.log(a.x, b.x, c.x, d.x, e.x);

// Output: 2 4 6 8 10.
// Explanation:
// 2 4 6 8 10
//
// The code is using the `forEach` method to iterate over an array of objects, and it is modifying the `x`
// property of each object by multiplying it by 2.
//
// It's updating the original objects with `x*2` values.
//
// So, the output of the code is 2 4 6 8 10.
```

### Original Q221. Guess the Output?

```js
function sumOfPositiveNumbers(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
      sum += numbers[i];
    }
  }
  return sum;
}

// Example usage:
const arr = [1, -2, 3, 4, -5, 6];
console.log(sumOfPositiveNumbers(arr)); // Output: 14

// Output: function sumOfPositiveNumbers(numbers) {
// let sum = 0;
// for (let i = 0; i   0) {
// sum += numbers[i];
// }
// }
// return sum;
// }
// Explanation:
// function sumOfPositiveNumbers(numbers) {
// let sum = 0;
// for (let i = 0; i   0) {
// sum += numbers[i];
// }
// }
// return sum;
// }
//
// // Example usage:
// const arr = [1, -2, 3, 4, -5, 6];
// console.log(sumOfPositiveNumbers(arr)); // Output: 14
//
// The `sumOfPositiveNumbers` function takes an array of numbers as its parameter and initializes a variable sum
// to `0`. It then loops through each element of the array and checks if the number is greater than 0. If the
// number is positive, it adds the number to the sum. Finally, it returns the sum of all positive numbers in the
// array.
//
// In the example usage, we pass an array `[1, -2, 3, 4, -5, 6]` to the sumOfPositiveNumbers function. The
// function returns the sum of all positive numbers in the array, which is `14`.
```

### Original Q235. Guess the Output?

```js
const a = [1, 2, 3];
const b = a;

b.push(4);

console.log(a);
console.log(b);

// Output: Answer:
// Explanation:
// The output of the code will be:
//
//
// [1, 2, 3, 4]
// [1, 2, 3, 4]
//
// The code creates an array a with the values [1, 2, 3]. It then creates a new variable b and assigns it to a,
// creating a reference to the same array.
//
// b.push(4) adds the value 4 to the end of the array.
//
// Since a and b reference the same array, both console.log(a) and console.log(b) will print [1, 2, 3, 4].
//
// This is different from the previous example where ... spread operator was used, which created a new array with
// the same values as the original array instead of referencing the same array.
```

### Original Q248. Guess the Output?

```js
let numbers = [1, 2, 3, 4, 5];
numbers = numbers.map((number) => number * 2);
console.log(numbers.reduce((total, num) => total + num));

// Output: **
// Explanation:
// **Answer:**
//
// // Output: 30 (No errors in the code)
//
// **Explanation:**
//
// 1. **Array Creation:** The code starts by creating an array named `numbers` containing the values `[1, 2, 3,
// 4, 5]`.
//
// 2. **Array Mapping:** The `map()` method is used to create a new array by applying a function to each element
// of the original array. In this case, the function `number => number * 2` doubles each number in the array. The
// new array becomes `[2, 4, 6, 8, 10]`.
//
// 3. **Array Reduction:** The `reduce()` method is used to reduce the array to a single value by applying a
// function against an accumulator and each element in the array (from left to right). The function `(total, num)
// => total + num` adds each number in the array to the `total`, starting with an initial `total` of 0.
//
// 4. **Output:** The final `console.log()` statement outputs the result of the `reduce()` operation, which is 30
// (the sum of all the doubled numbers in the array).
```

### Original Q249. Guess the Output?

```js
function findEvenNumbers(numberArray) {
  const evenNumbers = [];
  for (let i = 0; i < numberArray.length; i++) {
    if (numberArray[i] % 2 === 0) {
      evenNumbers.push(numberArray[i]);
    }
  }
  return evenNumbers;
}

// Output: **
// Explanation:
// **Answer:**
//
// Approach 1: Using a loop and conditional statement
//
// function findEvenNumbers(numberArray) {
// const evenNumbers = [];
// for (let i = 0; i < numberArray.length; i++) {
// if (numberArray[i] % 2 === 0) {
// evenNumbers.push(numberArray[i]);
// }
// }
// return evenNumbers;
// }
//
// Approach 2: Using recursion and conditional statement
//
// function findEvenNumbersRecursive(numberArray) {
// if (numberArray.length === 0) {
// return [];
// }
//
// const firstNumber = numberArray[0];
// const remainingNumbers = numberArray.slice(1);
//
// if (firstNumber % 2 === 0) {
// return [firstNumber].concat(findEvenNumbersRecursive(remainingNumbers));
// } else {
// return findEvenNumbersRecursive(remainingNumbers);
// }
// }
```

---

## Functions, Arguments, Closures & Currying

Function calls, arguments object, closures, memoization, currying, pure functions.

### Original Q3. Guess the Output?

```js
let a = { x: 1, y: 2 };
let b = a;
b.x = 3;
console.log(a);
console.log(b);

// Output:
// { x: 3, y: 2 }
// { x: 3, y: 2 }
// Explanation: a and b point to the same object reference. Updating b.x also updates a.x.
```

### Original Q17. Guess the Output?

```js
let x = 5;
let y = x++;
console.log(y);
console.log(x);

// Output:
// 5
// 6
// Explanation: Post-increment returns the old value first, then increments x.
```

### Original Q18. Guess the Output?

```js
let x = 5;
let y = ++x;
console.log(y);
console.log(x);

// Output:
// 6
// 6
// Explanation: Pre-increment increments x first, then returns the new value.
```

### Original Q24. Guess the Output?

```js
console.log(10 + "5");
console.log("5" + 10);

// Output:
// 105
// 510
// Explanation: When + has a string operand, it performs string concatenation.
```

### Original Q41. Guess the Output?

```js
function modify(obj) {
  obj.name = "Updated";
}

let person = { name: "Original" };
modify(person);
console.log(person.name);

function reassign(obj) {
  obj = { name: "New Object" };
}
reassign(person);
console.log(person.name);

// Output:
// Updated
// Updated
// Explanation: Modifying an object's property affects the original object. Reassigning the local parameter does not change the original reference.
```

### Original Q46. Guess the Output?

```js
let x;
console.log(x);
x = 20;
console.log(x);
x = "John";
console.log(x);

// Output:
// undefined
// 20
// John
// Explanation: x is first declared without a value, so it is undefined. Then it is assigned 20, then reassigned to "John".
```

### Original Q47. Guess the Output?

```js
let text;
switch (1) {
  case 0:
    text = "This is zero";
    break;
  case 1:
    text = "This is one";
  case 2:
    text = "This is two";
    break;
  default:
    text = "No matches found!";
}
console.log(text);

// Output: This is two
// Explanation: case 1 matches, but there is no break. Execution falls through to case 2 and overwrites text.
```

### Original Q57. Guess the Output?

```js
let c = { greeting: "Hey!" };
let d;

d = c;
c.greeting = "Hello";
console.log(d.greeting);

// Output: Hello
// Answer: A
// Explanation:
// In JavaScript, all objects interact by _reference_ when setting them equal to each other.
//
// First, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to
// the object.
//
// When you change one object, you change all of them.
```

### Original Q61. Guess the Output?

```js
function bark() {
  console.log("Woof!");
}

bark.animal = "dog";

// Output: Nothing, this is totally fine!
// Answer: A
// Explanation:
// This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)
//
// A function is a special type of object. The code you write yourself isn't the actual function. The function is
// an object with properties. This property is invocable.
```

### Original Q67. Guess the Output?

```js
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);

// Output: 0 2 2
// Answer: C
// Explanation:
// The postfix unary operator `++`:
//
// 1. Returns the value (this returns `0`)
// 2. Increments the value (number is now `1`)
//
// The prefix unary operator `++`:
//
// 1. Increments the value (number is now `2`)
// 2. Returns the value (this returns `2`)
//
// This returns `0 2 2`.
```

### Original Q68. Guess the Output?

```js
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = "Sagar";
const age = 21;

getPersonInfo`${person} is ${age} years old`;

// Output: ["", " is ", " years old"] "Sagar" 21
// Answer: B
// Explanation:
// If you use tagged template literals, the value of the first argument is always an array of the string values.
// The remaining arguments get the values of the passed expressions!
```

### Original Q101. Guess the Output?

```js
function getInfo(member, year) {
  member.name = "Sagar";
  year = "1998";
}

const person = { name: "Sarah" };
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);

// Output: { name: "Sagar" }, "1997"
// Answer: A
// Explanation:
// Arguments are passed by _value_, unless their value is an object, then they're passed by _reference_.
// `birthYear` is passed by value, since it's a string, not an object. When we pass arguments by value, a _copy_
// of that value is created (see question 46).
//
// The variable `birthYear` has a reference to the value `"1997"`. The argument `year` also has a reference to the
// value `"1997"`, but it's not the same value as `birthYear` has a reference to. When we update the value of
// `year` by setting `year` equal to `"1998"`, we are only updating the value of `year`. `birthYear` is still
// equal to `"1997"`.
//
// The value of `person` is an object. The argument `member` has a (copied) reference to the _same_ object. When
// we modify a property of the object `member` has a reference to, the value of `person` will also be modified,
// since they both have a reference to the same object. `person`'s `name` property is now equal to the value
// `"Sagar"`
```

### Original Q102. Guess the Output?

```js
function greeting() {
  throw "Hello world!";
}

function sayHi() {
  try {
    const data = greeting();
    console.log("It worked!", data);
  } catch (e) {
    console.log("Oh no an error:", e);
  }
}

sayHi();

// Output: Oh no an error: Hello world!
// Answer: D
// Explanation:
// With the `throw` statement, we can create custom errors. With this statement, you can throw exceptions. An
// exception can be a string, a number, a boolean or an object. In this case, our exception is the string `'Hello
// world!'`.
//
// With the `catch` statement, we can specify what to do if an exception is thrown in the `try` block. An
// exception is thrown: the string `'Hello world!'`. `e` is now equal to that string, which we log. This results
// in `'Oh an error: Hello world!'`.
```

### Original Q106. Guess the Output?

```js
const set = new Set([1, 1, 2, 3, 4]);

console.log(set);

// Output: {1, 2, 3, 4}
// Answer: D
// Explanation:
// The `Set` object is a collection of _unique_ values: a value can only occur once in a set.
//
// We passed the iterable `[1, 1, 2, 3, 4]` with a duplicate value `1`. Since we cannot have two of the same
// values in a set, one of them is removed. This results in `{1, 2, 3, 4}`.
```

### Original Q108. Guess the Output?

```js
const name = "Sagar";
age = 21;

console.log(delete name);
console.log(delete age);

// Output: false, true
// Answer: A
// Explanation:
// The `delete` operator returns a boolean value: `true` on a successful deletion, else it'll return `false`.
// However, variables declared with the `var`, `const`, or `let` keywords cannot be deleted using the `delete`
// operator.
//
// The `name` variable was declared with a `const` keyword, so its deletion is not successful: `false` is
// returned. When we set `age` equal to `21`, we actually added a property called `age` to the global object. You
// can successfully delete properties from objects this way, also the global object, so `delete age` returns
// `true`.
```

### Original Q119. Guess the Output?

```js
const name = "Sagar Damera";
console.log(name.padStart(13));
console.log(name.padStart(2));

// Output: " Sagar Damera", "Sagar Damera" ("[1x whitespace]Sagar Damera", "Sagar Damera")
// Answer: C
// Explanation:
// With the `padStart` method, we can add padding to the beginning of a string. The value passed to this method is
// the _total_ length of the string together with the padding. The string `"Sagar Damera"` has a length of `12`.
// `name.padStart(13)` inserts 1 space at the start of the string, because 12 + 1 is 13.
//
// If the argument passed to the `padStart` method is smaller than the length of the array, no padding will be
// added.
```

### Original Q120. Guess the Output?

```js
console.log("🥑" + "💻");

// Output: "🥑💻"
// Answer: A
// Explanation:
// With the `+` operator, you can concatenate strings. In this case, we are concatenating the string `"🥑"` with
// the string `"💻"`, resulting in `"🥑💻"`.
```

### Original Q129. Guess the Output?

```js
const myLifeSummedUp = ["☕", "💻", "🍷", "🍫"];

for (let item in myLifeSummedUp) {
  console.log(item);
}

for (let item of myLifeSummedUp) {
  console.log(item);
}

// Output: 0 1 2 3 and "☕" "💻" "🍷" "🍫"
// Answer: A
// Explanation:
// With a _for-in_ loop, we can iterate over enumerable properties. In an array, the enumerable properties are the
// "keys" of array elements, which are actually their indexes. You could see an array as:
//
// `{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}`
//
// Where the keys are the enumerable properties. `0` `1` `2` `3` get logged.
//
// With a _for-of_ loop, we can iterate over iterables. An array is an iterable. When we iterate over the array,
// the variable "item" is equal to the element it's currently iterating over, `"☕"` `"💻"` `"🍷"` `"🍫"` get logged.
```

### Original Q137. Guess the Output?

```js
console.log("I want pizza"[0]);

// Output: "I"
// Answer: B
// Explanation:
// In order to get a character at a specific index of a string, you can use bracket notation. The first character
// in the string has index 0, and so on. In this case, we want to get the element with index 0, the character
// `"I'`, which gets logged.
//
// Note that this method is not supported in IE7 and below. In that case, use `.charAt()`.
```

### Original Q156. Guess the Output?

```js
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false,
};

const colors = ["pink", "red", "blue"];

console.log(colorConfig.colors[1]);

// Output: TypeError
// Answer: D
// Explanation:
// In JavaScript, we have two ways to access properties on an object: bracket notation, or dot notation. In this
// example, we use dot notation (`colorConfig.colors`) instead of bracket notation (`colorConfig["colors"]`).
//
// With dot notation, JavaScript tries to find the property on the object with that exact name. In this example,
// JavaScript tries to find a property called `colors` on the `colorConfig` object. There is no property called
// `colors`, so this returns `undefined`. Then, we try to access the value of the first element by using `[1]`. We
// cannot do this on a value that's `undefined`, so it throws a `TypeError`: `Cannot read property '1' of
// undefined`.
//
// JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket
// `[` and keeps going until it finds the closing bracket `]`. Only then, it will evaluate the statement. If we
// would've used `colorConfig[colors[1]]`, it would have returned the value of the `red` property on the
// `colorConfig` object.
```

### Original Q167. Guess the Output?

```js
function sumValues(x, y, z) {
  return x + y + z;
}

// Output: sumValues(...[1, 2, 3])
// Answer: C
// Explanation:
// With the spread operator `...`, we can _spread_ iterables to individual elements. The `sumValues` function
// receives three arguments: `x`, `y` and `z`. `...[1, 2, 3]` will result in `1, 2, 3`, which we pass to the
// `sumValues` function.
```

### Original Q177. Guess the Output?

```js
const spookyItems = ["👻", "🎃", "🕸"];
({ item: spookyItems[3] } = { item: "💀" });

console.log(spookyItems);

// Output: ["👻", "🎃", "🕸", "💀"]
// Answer: B
// Explanation:
// By destructuring objects, we can unpack values from the right-hand object, and assign the unpacked value to the
// value of the same property name on the left-hand object. In this case, we're assigning the value "💀" to
// `spookyItems[3]`. This means that we're modifying the `spookyItems` array, we're adding the "💀" to it. When
// logging `spookyItems`, `["👻", "🎃", "🕸", "💀"]` gets logged.
```

### Original Q196. Guess the Output?

```js
function getFruit(fruits) {
  console.log(fruits?.[1]?.[1]);
}

getFruit([["🍊", "🍌"], ["🍍"]]);
getFruit();
getFruit([["🍍"], ["🍊", "🍌"]]);

// Output: undefined, undefined, 🍌
// Answer: D
// Explanation:
// The `?` allows us to optionally access deeper nested properties within objects. We're trying to log the item on
// index `1` within the subarray that's on index `1` of the `fruits` array. If the subarray on index `1` in the
// `fruits` array doesn't exist, it'll simply return `undefined`. If the subarray on index `1` in the `fruits`
// array exists, but this subarray doesn't have an item on its `1` index, it'll also return `undefined`.
//
// First, we're trying to log the second item in the `['🍍']` subarray of `[['🍊', '🍌'], ['🍍']]`. This subarray only
// contains one item, which means there is no item on index `1`, and returns `undefined`.
//
// Then, we're invoking the `getFruits` function without passing a value as an argument, which means that `fruits`
// has a value of `undefined` by default. Since we're conditionally chaining the item on index `1` of`fruits`, it
// returns `undefined` since this item on index `1` does not exist.
//
// Lastly, we're trying to log the second item in the `['🍊', '🍌']` subarray of `['🍍'], ['🍊', '🍌']`. The item on
// index `1` within this subarray is `🍌`, which gets logged.
```

### Original Q208. Guess the Output?

```js
const x = { foo: 1 };
const y = { foo: 2 };

function addFoo(obj) {
  return obj.foo + 1;
}

console.log(addFoo(x));
console.log(addFoo(y));

// Output: 2, 3
// Explanation:
// Answer - 2, 3
//
// The addFoo function takes an object as an argument and returns the value of obj.foo + 1. When addFoo is called
// with x as the argument, the output will be 2, because x.foo is equal to 1. When addFoo is called with y as the
// argument, the output will be 3, because y.foo is equal to 2.
```

### Original Q222. Guess the Output?

```js
function removeVowels(str) {
  const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (!vowels.includes(str[i])) {
      newStr += str[i];
    }
  }
  return newStr;
}

// Example usage:
const str = "This is a test string with vowels";
console.log(removeVowels(str)); // Output: Ths s  tst strng wth vwls

// Output: function removeVowels(str) {
// const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
// let newStr = "";
// for (let i = 0; i < str.length; i++) {
// if (!vowels.includes(str[i])) {
// newStr += str[i];
// }
// }
// return newStr;
// }
// Explanation:
// function removeVowels(str) {
// const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
// let newStr = "";
// for (let i = 0; i < str.length; i++) {
// if (!vowels.includes(str[i])) {
// newStr += str[i];
// }
// }
// return newStr;
// }
//
// // Example usage:
// const str = "This is a test string with vowels";
// console.log(removeVowels(str)); // Output: Ths s  tst strng wth vwls
//
// The `removeVowels` function takes a string as its parameter and initializes an array vowels containing all the
// vowels. It then loops through each character of the input string and checks if the character is not present in
// the vowels array. If the character is not a vowel, it adds the character to the `newStr` string. Finally, it
// returns the newStr string with all the vowels removed.
//
// In the example usage, we pass a string 'This is a test string with vowels' to the removeVowels function. The
// function returns a new string with all the vowels removed, which is 'Ths s tst strng wth vwls'.
```

### Original Q242. Guess the Output?

```js
function foo() {
  let x = 1;

  function bar() {
    let y = 2;
    console.log(x + y);
  }

  bar();
}

foo();

// Output: C: 3
// Explanation:
// Answer -
// C: 3
//
// In this code, there are two nested functions: `foo` and `bar`. The variable `x` is declared and assigned a
// value of `1` within the `foo` function, while the variable `y` is declared and assigned a value of `2` within
// the `bar` function.
//
// When the `foo` function is called, it invokes the `bar` function. Inside the `bar` function, the values of `x`
// and `y` are accessed and summed together using `console.log(x + y)`.
//
// Since `x` is accessible within the `bar` function due to lexical scoping, the value of `x` is `1`. Similarly,
// the value of `y` is `2`. Therefore, the output of `console.log(x + y)` will be `3`.
//
// Hence, the correct answer is C: 3.
```

### Original Q246. Guess the Output?

```js
console.log(sum(4, 6, 8, 10).value); //output - 28
console.log(sum(4)(6)(8)(10).value); //output - 28

// Output / Answer: See explanation below.
// Explanation:
// function sum(...args) {
// const ans = args.reduce((a, b) => a + b, 0); //just to get sum of all the array elements
//
// const myFunc = (num) => {
// return sum(num, ...args);
// };
//
// myFunc.value = ans;
//
// return myFunc;
// }
//
// console.log(sum(4, 6, 8, 10).value); //output - 28
// console.log(sum(4)(6)(8)(10).value); //output - 28
//
// The sum function takes any number of arguments using the rest parameter ...args and calculates the sum of
// those arguments.
//
// It defines a nested function called myFunc, which takes a new number num and returns a new instance of the sum
// function with the accumulated sum and the new number.
//
// The current sum value is assigned to a property named value on myFunc.
//
// The myFunc function is then returned, allowing you to chain multiple function calls together.
//
// As a result, you can use this sum function to either pass all numbers at once or chain multiple function calls
// to add numbers incrementally, and it will provide the correct sum when you access the value property.
```

### Original Q259. Guess the Output?

```js
let result = 5 > 4 ? "Hello World" : "Hello India";
console.log(result);

// Output: Hello World
// Explanation:
// Ternary operator is an expression and thus we can store the result of it in a variable and we wil get Hello World here as output.
```

---

## Async JS, Event Loop, Promises

setTimeout, setInterval, event loop, promises, Promise.all/race/resolve, async/await, fetch.

### Original Q4. Guess the Output?

```js
for (var i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log("value is " + i);
  });
}

// Output:
// value is 10
// value is 10
// value is 10
// value is 10
// value is 10
// value is 10
// value is 10
// value is 10
// value is 10
// value is 10
// Explanation: var is function-scoped, so all callbacks share the same i. By the time setTimeout runs, the loop is finished and i is 10.
```

### Original Q5. Guess the Output?

```js
for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log("value is " + i);
  });
}

// Output:
// value is 0
// value is 1
// value is 2
// value is 3
// value is 4
// value is 5
// value is 6
// value is 7
// value is 8
// value is 9
// Explanation: let is block-scoped. Each loop iteration gets a new i binding, so each callback remembers its own value.
```

### Original Q6. Guess the Output?

```js
function hello() {
  console.log("1");
  setTimeout(() => {
    console.log("2");
  });
  console.log("3");
}
hello();

// Output:
// 1
// 3
// 2
// Explanation: Synchronous code runs first, so 1 and 3 print first. The setTimeout callback runs later, so 2 prints last.
```

### Original Q43. Guess the Output?

```js
console.log("Start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// Output:
// Start
// End
// Promise
// setTimeout
// Explanation: Synchronous code runs first. Promise callbacks are microtasks, so they run before setTimeout, which is a macrotask.
```

### Original Q48. Guess the Output?

```js
const user = {
  name: "Aman Bhoria!",
  logMessage() {
    console.log(this.name); // What is logged?
  },
};
setTimeout(user.logMessage, 1000);

// Output: undefined
// Explanation: Passing user.logMessage loses the user object context. Inside the callback, this is not user, so this.name is undefined.
```

### Original Q53. Guess the Output?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

// Output: 3 3 3 and 0 1 2
// Answer: C
// Explanation:
// Because of the event queue in JavaScript, the `setTimeout` callback function is called _after_ the loop has
// been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was
// global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By
// the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example.
//
// In the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let`
// (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will
// have a new value, and each value is scoped inside the loop.
```

### Original Q80. Guess the Output?

```js
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"));
const baz = () => console.log("Third");

bar();
foo();
baz();

// Output: First Third Second
// Answer: B
// Explanation:
// We have a `setTimeout` function and invoked it first. Yet, it was logged last.
//
// This is because in browsers, we don't just have the runtime engine, we also have something called a `WebAPI`.
// The `WebAPI` gives us the `setTimeout` function to start with, and for example the DOM.
//
// After the _callback_ is pushed to the WebAPI, the `setTimeout` function itself (but not the callback!) is
// popped off the stack.
//
// Now, `foo` gets invoked, and `"First"` is being logged.
//
// `foo` is popped off the stack, and `baz` gets invoked. `"Third"` gets logged.
//
// The WebAPI can't just add stuff to the stack whenever it's ready. Instead, it pushes the callback function to
// something called the _queue_.
//
// This is where an event loop starts to work. An event loop looks at the stack and task queue. If the stack is
// empty, it takes the first thing on the queue and pushes it onto the stack.
//
// `bar` gets invoked, `"Second"` gets logged, and it's popped off the stack.
```

### Original Q92. Guess the Output?

```js
setInterval(() => console.log("Hi"), 1000);

// Output: a unique id
// Answer: A
// Explanation:
// It returns a unique id. This id can be used to clear that interval with the `clearInterval()` function.
```

### Original Q95. Guess the Output?

```js
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then((res) => console.log(res));

// Output: "two"
// Answer: B
// Explanation:
// When we pass multiple promises to the `Promise.race` method, it resolves/rejects the _first_ promise that
// resolves/rejects. To the `setTimeout` method, we pass a timer: 500ms for the first promise (`firstPromise`),
// and 100ms for the second promise (`secondPromise`). This means that the `secondPromise` resolves first with the
// value of `'two'`. `res` now holds the value of `'two'`, which gets logged.
```

### Original Q123. Guess the Output?

```js
async function getData() {
  return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);

// Output: Promise {}
// Answer: C
// Explanation:
// An async function always returns a promise. The `await` still has to wait for the promise to resolve: a pending
// promise gets returned when we call `getData()` in order to set `data` equal to it.
//
// If we wanted to get access to the resolved value `"I made it"`, we could have used the `.then()` method on
// `data`:
//
// `data.then(res => console.log(res))`
//
// This would've logged `"I made it!"`
```

### Original Q132. Guess the Output?

```js
var status = "😎";

setTimeout(() => {
  const status = "😍";

  const data = {
    status: "🥑",
    getStatus() {
      return this.status;
    },
  };

  console.log(data.getStatus());
  console.log(data.getStatus.call(this));
}, 0);

// Output: "🥑" and "😎"
// Answer: B
// Explanation:
// The value of the `this` keyword is dependent on where you use it. In a method, like the `getStatus` method, the
// `this` keyword refers to _the object that the method belongs to_. The method belongs to the `data` object, so
// `this` refers to the `data` object. When we log `this.status`, the `status` property on the `data` object gets
// logged, which is `"🥑"`.
//
// With the `call` method, we can change the object to which the `this` keyword refers. In functions, the `this`
// keyword refers to the _the object that the function belongs to_. We declared the `setTimeout` function on the
// _global object_, so within the `setTimeout` function, the `this` keyword refers to the _global object_. On the
// global object, there is a variable called _status_ with the value of `"😎"`. When logging `this.status`, `"😎"`
// gets logged.
```

### Original Q135. Guess the Output?

```js
fetch("https://www.website.com/api/user/1")
  .then((res) => res.json())
  .then((res) => console.log(res));

// Output: The result of the callback in the previous .then().
// Answer: C
// Explanation:
// The value of `res` in the second `.then` is equal to the returned value of the previous `.then`. You can keep
// chaining `.then`s like this, where the value is passed to the next handler.
```

### Original Q152. Guess the Output?

```js
const myPromise = () => Promise.resolve("I have resolved!");

function firstFunction() {
  myPromise().then((res) => console.log(res));
  console.log("second");
}

async function secondFunction() {
  console.log(await myPromise());
  console.log("second");
}

firstFunction();
secondFunction();

// Output: second, I have resolved! and I have resolved!, second
// Answer: D
// Explanation:
// With a promise, we basically say _I want to execute this function, but I'll put it aside for now while it's
// running since this might take a while. Only when a certain value is resolved (or rejected), and when the call
// stack is empty, I want to use this value._
//
// We can get this value with both `.then` and the `await` keywords in an `async` function. Although we can get a
// promise's value with both `.then` and `await`, they work a bit differently.
//
// In the `firstFunction`, we (sort of) put the myPromise function aside while it was running, but continued
// running the other code, which is `console.log('second')` in this case. Then, the function resolved with the
// string `I have resolved`, which then got logged after it saw that the callstack was empty.
//
// With the await keyword in `secondFunction`, we literally pause the execution of an async function until the
// value has been resolved before moving to the next line.
//
// This means that it waited for the `myPromise` to resolve with the value `I have resolved`, and only once that
// happened, we moved to the next line: `second` got logged.
```

### Original Q154. Guess the Output?

```js
Promise.resolve(5);

// Output: Promise {: 5}
// Answer: C
// Explanation:
// We can pass any type of value we want to `Promise.resolve`, either a promise or a non-promise. The method
// itself returns a promise with the resolved value (``). If you pass a regular function, it'll be a resolved
// promise with a regular value. If you pass a promise, it'll be a resolved promise with the resolved value of
// that passed promise.
//
// In this case, we just passed the numerical value `5`. It returns a resolved promise with the value `5`.
```

### Original Q164. Guess the Output?

```js
let config = {
  alert: setInterval(() => {
    console.log("Alert!");
  }, 1000),
};

config = null;

// Output: The setInterval callback will still be called every second
// Answer: C
// Explanation:
// Normally when we set objects equal to `null`, those objects get _garbage collected_ as there is no reference
// anymore to that object. However, since the callback function within `setInterval` is an arrow function (thus
// bound to the `config` object), the callback function still holds a reference to the `config` object.
// As long as there is a reference, the object won't get garbage collected.
// Since this is an interval, setting `config` to `null` or `delete`-ing `config.alert` won't garbage-collect the
// interval, so the interval will still be called.
// It should be cleared with `clearInterval(config.alert)` to remove it from memory.
// Since it was not cleared, the `setInterval` callback function will still get invoked every 1000ms (1s).
```

### Original Q174. Guess the Output?

```js
async function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield Promise.resolve(i);
  }
}

(async () => {
  const gen = range(1, 3);
  for await (const item of gen) {
    console.log(item);
  }
})();

// Output: 1 2 3
// Answer: C
// Explanation:
// The generator function `range` returns an async object with promises for each item in the range we pass:
// `Promise{1}`, `Promise{2}`, `Promise{3}`. We set the variable `gen` equal to the async object, after which we
// loop over it using a `for await ... of` loop. We set the variable `item` equal to the returned Promise values:
// first `Promise{1}`, then `Promise{2}`, then `Promise{3}`. Since we're _awaiting_ the value of `item`, the
// resolved promise, the resolved _values_ of the promises get returned: `1`, `2`, then `3`.
```

### Original Q180. Guess the Output?

```js
const myPromise = Promise.resolve("Woah some cool data");

(async () => {
  try {
    console.log(await myPromise);
  } catch {
    throw new Error(`Oops didn't work`);
  } finally {
    console.log("Oh finally!");
  }
})();

// Output: Woah some cool data Oh finally!
// Answer: C
// Explanation:
// In the `try` block, we're logging the awaited value of the `myPromise` variable: `"Woah some cool data"`. Since
// no errors were thrown in the `try` block, the code in the `catch` block doesn't run. The code in the `finally`
// block _always_ runs, `"Oh finally!"` gets logged.
```

### Original Q183. Guess the Output?

```js
const myPromise = Promise.resolve(Promise.resolve("Promise"));

function funcOne() {
  setTimeout(() => console.log("Timeout 1!"), 0);
  myPromise.then((res) => res).then((res) => console.log(`${res} 1!`));
  console.log("Last line 1!");
}

async function funcTwo() {
  const res = await myPromise;
  console.log(`${res} 2!`);
  setTimeout(() => console.log("Timeout 2!"), 0);
  console.log("Last line 2!");
}

funcOne();
funcTwo();

// Output: Last line 1! Promise 2! Last line 2! Promise 1! Timeout 1! Timeout 2!
// Answer: C
// Explanation:
// First, we invoke `funcOne`. On the first line of `funcOne`, we call the _asynchronous_ `setTimeout` function,
// from which the callback is sent to the Web API. (see my article on the event loop here.)
//
// Then we call the `myPromise` promise, which is an _asynchronous_ operation. Pay attention, that now only the
// first then clause was added to the microtask queue.
//
// Both the promise and the timeout are asynchronous operations, the function keeps on running while it's busy
// completing the promise and handling the `setTimeout` callback. This means that `Last line 1!` gets logged
// first, since this is not an asynchonous operation.
//
// Since the callstack is not empty yet, the `setTimeout` function and promise in `funcOne` cannot get added to
// the callstack yet.
//
// In `funcTwo`, the variable `res` gets `Promise` because `Promise.resolve(Promise.resolve('Promise'))` is
// equivalent to `Promise.resolve('Promise')` since resolving a promise just resolves it's value. The `await` in
// this line stops the execution of the function until it receives the resolution of the promise and then keeps on
// running synchronously until completion, so `Promise 2!` and then `Last line 2!` are logged and the `setTimeout`
// is sent to the Web API. If the first then clause in `funcOne` had its own log statement, it would be printed
// before `Promise 2!`. Howewer, it executed silently and put the second then clause in microtask queue. So, the
// second clause will be printed after `Promise 2!`.
//
// Then the call stack is empty. Promises are _microtasks_ so they are resolved first when the call stack is empty
// so `Promise 1!` gets to be logged.
//
// Now, since `funcTwo` popped off the call stack, the call stack is empty. The callbacks waiting in the queue
// (`() => console.log("Timeout 1!")` from `funcOne`, and `() => console.log("Timeout 2!")` from `funcTwo`) get
// added to the call stack one by one. The first callback logs `Timeout 1!`, and gets popped off the stack. Then,
// the second callback logs `Timeout 2!`, and gets popped off the stack.
```

### Original Q202. Guess the Output?

```js
const promise1 = Promise.resolve("First");
const promise2 = Promise.resolve("Second");
const promise3 = Promise.reject("Third");
const promise4 = Promise.resolve("Fourth");

const runPromises = async () => {
  const res1 = await Promise.all([promise1, promise2]);
  const res2 = await Promise.all([promise3, promise4]);
  return [res1, res2];
};

runPromises()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

// Output: 'Third'
// Answer: D
// Explanation:
// The `Promise.all` method runs the passed promises in parallel. If one promise fails, the `Promise.all` method
// _rejects_ with the value of the rejected promise. In this case, `promise3` is rejected with the value
// `"Third"`. We’re catching the rejected value in the chained `catch` method on the `runPromises` invocation to
// catch any errors  within the `runPromises` function. Only `"Third"` gets logged, since `promise3` is rejected
// with this value.
```

### Original Q209. Guess the Output?

```js
const arr = [1, 2, 3, 4, 5];

for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// Output: 5, 5, 5, 5, 5
// Explanation:
// Answer - 5, 5, 5, 5, 5
//
// The setTimeout function is called inside of a loop that iterates through the elements in the arr array. The
// setTimeout function will execute its callback function after a delay of 1000 milliseconds. However, by the
// time the delay has elapsed and the callback function is called, the loop will have already completed and the
// value of i will be 5. As a result, the output will be 5 printed five times.
```

### Original Q213. Guess the Output?

```js
var x = 0;
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    x++;
    console.log(x);
  }, 1000);
}

// Output: 1
// 2
// 3
// 4
// 5
// Explanation:
// 1
// 2
// 3
// 4
// 5
//
// The for loop is iterating 5 times, and in each iteration, it is scheduling a function to be invoked after 1000
// milliseconds (1 second) using setTimeout.
// This function increments the value of `x` and logs it.
//
// But all the 5 functions invoked after 1000 milliseconds.
//
// Since, javascript is single threaded and event loop queue all the functions in the event loop and execute them
// one by one.
//
// But inside each `setTimeout` callback execution, `x++` increments `x` value by 1.
//
// _It makes difference when position of `x++` code changes wrt the setTimout callback._
//
// So all the 5 `callbacks` logs the values in `incremental` way, which is `1 2 3 4 5`.
```

---

## Classes, Constructors & Prototypes

class syntax, constructors, static methods, prototype, private fields, new keyword.

### Original Q58. Guess the Output?

```js
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);

// Output: true false false
// Answer: C
// Explanation:
// `new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number:
// it has a bunch of extra features and is an object.
//
// When we use the `==` operator (Equality operator), it only checks whether it has the same _value_. They both
// have the value of `3`, so it returns `true`.
//
// However, when we use the `===` operator (Strict equality operator), both value _and_ type should be the same.
// It's not: `new Number()` is not a number, it's an object. Both return `false.`
```

### Original Q59. Guess the Output?

```js
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor;
    return this.newColor;
  }

  constructor({ newColor = "green" } = {}) {
    this.newColor = newColor;
  }
}

const freddie = new Chameleon({ newColor: "purple" });
console.log(freddie.colorChange("orange"));

// Output: TypeError
// Answer: D
// Explanation:
// The `colorChange` function is static. Static methods are designed to live only on the constructor in which they
// are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an
// instance of class Chameleon, the function cannot be called upon it. A `TypeError` is thrown.
```

### Original Q62. Guess the Output?

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Sagar", "Damera");
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

console.log(member.getFullName());

// Output: TypeError
// Answer: A
// Explanation:
// In JavaScript, functions are objects, and therefore, the method `getFullName` gets added to the constructor
// function object itself. For that reason, we can call `Person.getFullName()`, but `member.getFullName` throws a
// `TypeError`.
//
// If you want a method to be available to all object instances, you have to add it to the prototype property:
//
// Person.prototype.getFullName = function() {
// return `${this.firstName} ${this.lastName}`;
// };
```

### Original Q63. Guess the Output?

```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const Sagar = new Person("Sagar", "Damera");
const sarah = Person("Sarah", "Smith");

console.log(Sagar);
console.log(sarah);

// Output: Person {firstName: "Sagar", lastName: "Damera"} and undefined
// Answer: A
// Explanation:
// For `sarah`, we didn't use the `new` keyword. When using `new`, `this` refers to the new empty object we
// create. However, if you don't add `new`, `this` refers to the global object!
//
// We said that `this.firstName` equals `"Sarah"` and `this.lastName` equals `"Smith"`. What we actually did, is
// defining `global.firstName = 'Sarah'` and `global.lastName = 'Smith'`. `sarah` itself is left `undefined`,
// since we don't return a value from the `Person` function.
```

### Original Q65. Guess the Output?

```js
// Source Question: All object have prototypes.
// Options:
// A: true
// B: false

// Output: false
// Answer: B
// Explanation:
// All objects have prototypes, except for the base object. The base object is the object created by the user, or
// an object that is created using the `new` keyword. The base object has access to some methods and properties,
// such as `.toString`. This is the reason why you can use built-in JavaScript methods! All of such methods are
// available on the prototype. Although JavaScript can't find it directly on your object, it goes down the
// prototype chain and finds it there, which makes it accessible for you.
```

### Original Q79. Guess the Output?

```js
String.prototype.giveSagarPizza = () => {
  return "Just give Sagar pizza already!";
};

const name = "Sagar";

console.log(name.giveSagarPizza());

// Output: "Just give Sagar pizza already!"
// Answer: A
// Explanation:
// `String` is a built-in constructor, that we can add properties to. I just added a method to its prototype.
// Primitive strings are automatically converted into a string object, generated by the string prototype function.
// So, all strings (string objects) have access to that method!
```

### Original Q85. Guess the Output?

```js
0;
new Number(0);
("");
(" ");
new Boolean(false);
undefined;

// Output: 0, '', undefined
// Answer: A
// Explanation:
// There are 8 falsy values:
//
// - `undefined`
// - `null`
// - `NaN`
// - `false`
// - `''` (empty string)
// - `0`
// - `-0`
// - `0n` (BigInt(0))
//
// Function constructors, like `new Number` and `new Boolean` are truthy.
```

### Original Q103. Guess the Output?

```js
function Car() {
  this.make = "Lamborghini";
  return { make: "Maserati" };
}

const myCar = new Car();
console.log(myCar.make);

// Output: "Maserati"
// Answer: B
// Explanation:
// When a constructor function is called with the `new` keyword, it creates an object and sets the `this` keyword
// to refer to that object. By default, if the constructor function doesn't explicitly return anything, it will
// return the newly created object.
//
// In this case, the constructor function `Car` explicitly returns a new object with `make` set to `"Maserati"`,
// which overrides the default behavior. Therefore, when `new Car()` is called, the _returned_ object is assigned
// to `myCar`, resulting in the output being `"Maserati"` when `myCar.make` is accessed.
```

### Original Q105. Guess the Output?

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function () {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog("Mara");

pet.bark();

delete Dog.prototype.bark;

pet.bark();

// Output: "Woof I am Mara", TypeError
// Answer: A
// Explanation:
// We can delete properties from objects using the `delete` keyword, also on the prototype. By deleting a property
// on the prototype, it is not available anymore in the prototype chain. In this case, the `bark` function is not
// available anymore on the prototype after `delete Dog.prototype.bark`, yet we still try to access it.
//
// When we try to invoke something that is not a function, a `TypeError` is thrown. In this case `TypeError:
// pet.bark is not a function`, since `pet.bark` is `undefined`.
```

### Original Q116. Guess the Output?

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  // 1
  constructor(name, size) {
    this.size = size;
  }
  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }
  // 4
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

};

// Output: 2
// Answer: B
// Explanation:
// In a derived class, you cannot access the `this` keyword before calling `super`. If you try to do that, it will
// throw a ReferenceError: 1 and 4 would throw a reference error.
//
// With the `super` keyword, we call that parent class's constructor with the given arguments. The parent's
// constructor receives the `name` argument, so we need to pass `name` to `super`.
//
// The `Labrador` class receives two arguments, `name` since it extends `Dog`, and `size` as an extra property on
// the `Labrador` class. They both need to be passed to the constructor function on `Labrador`, which is done
// correctly using constructor 2.
```

### Original Q140. Guess the Output?

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person("John");
console.log(typeof member);

// Output: "object"
// Answer: C
// Explanation:
// Classes are syntactical sugar for function constructors. The equivalent of the `Person` class as a function
// constructor would be:
//
// function Person(name) {
// this.name = name;
// }
//
// Calling a function constructor with `new` results in the creation of an instance of `Person`, `typeof` keyword
// returns `"object"` for an instance. `typeof member` returns `"object"`.
```

### Original Q142. Guess the Output?

```js
function giveSagarPizza() {
  return "Here is pizza!";
}

const giveSagarChocolate = () =>
  "Here's chocolate... now go hit the gym already.";

console.log(giveSagarPizza.prototype);
console.log(giveSagarChocolate.prototype);

// Output: { constructor: ...} undefined
// Answer: D
// Explanation:
// Regular functions, such as the `giveSagarPizza` function, have a `prototype` property, which is an object
// (prototype object) with a `constructor` property. Arrow functions however, such as the `giveSagarChocolate`
// function, do not have this `prototype` property. `undefined` gets returned when trying to access the
// `prototype` property using `giveSagarChocolate.prototype`.
```

### Original Q146. Guess the Output?

```js
class Person {
  constructor() {
    this.name = "Sagar";
  }
}

Person = class AnotherPerson {
  constructor() {
    this.name = "Sarah";
  }
};

const member = new Person();
console.log(member.name);

// Output: "Sarah"
// Answer: B
// Explanation:
// We can set classes equal to other classes/function constructors. In this case, we set `Person` equal to
// `AnotherPerson`. The name on this constructor is `Sarah`, so the name property on the new `Person` instance
// `member` is `"Sarah"`.
```

### Original Q182. Guess the Output?

```js
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);

// Output: 3
// Answer: D
// Explanation:
// `counterOne` is an instance of the `Counter` class. The counter class contains a `count` property on its
// constructor, and an `increment` method. First, we invoked the `increment` method twice by calling
// `counterOne.increment()`. Currently, `counterOne.count` is `2`.
//
// Then, we create a new variable `counterTwo`, and set it equal to `counterOne`. Since objects interact by
// reference, we're just creating a new reference to the same spot in memory that `counterOne` points to. Since it
// has the same spot in memory, any changes made to the object that `counterTwo` has a reference to, also apply to
// `counterOne`. Currently, `counterTwo.count` is `2`.
//
// We invoke `counterTwo.increment()`, which sets `count` to `3`. Then, we log the count on `counterOne`, which
// logs `3`.
```

### Original Q189. Guess the Output?

```js
class Counter {
  #number = 10;

  increment() {
    this.#number++;
  }

  getNum() {
    return this.#number;
  }
}

const counter = new Counter();
counter.increment();

console.log(counter.#number);

// Output: SyntaxError
// Answer: D
// Explanation:
// In ES2020, we can add private variables in classes by using the `#`. We cannot access these variables outside
// of the class. When we try to log `counter.#number`, a SyntaxError gets thrown: we cannot access it outside the
// `Counter` class!
```

### Original Q192. Guess the Output?

```js
class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();

// Output: I'm pink. 🌸 I'm a bird. 🦢
// Answer: B
// Explanation:
// We create the variable `pet` which is an instance of the `Flamingo` class. When we instantiate this instance,
// the `constructor` on `Flamingo` gets called. First, `"I'm pink. 🌸"` gets logged, after which we call `super()`.
// `super()` calls the constructor of the parent class, `Bird`. The constructor in `Bird` gets called, and logs
// `"I'm a bird. 🦢"`.
```

### Original Q197. Guess the Output?

```js
class Calc {
  constructor() {
    this.count = 0;
  }

  increase() {
    this.count++;
  }
}

const calc = new Calc();
new Calc().increase();

console.log(calc.count);

// Output: 0
// Answer: A
// Explanation:
// We set the variable `calc` equal to a new instance of the `Calc` class. Then, we instantiate a new instance of
// `Calc`, and invoke the `increase` method on this instance. Since the count property is within the constructor
// of the `Calc` class, the count property is not shared on the prototype of `Calc`. This means that the value of
// count has not been updated for the instance calc points to, count is still `0`.
```

---

## Destructuring, Spread/Rest & Defaults

Object/array destructuring, spread/rest syntax, default parameters.

### Original Q10. Guess the Output?

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [6, 7, 5];
const result = [...arr1, ...arr2];
console.log(result);

// Output: [1, 2, 3, 4, 6, 7, 5]
// Explanation: The spread operator expands both arrays into a new array.
```

### Original Q11. Guess the Output?

```js
const person1 = { name: "xyz", age: 21 };
const person2 = { city: "abc", ...person1 };
console.log(person2);

// Output: { city: 'abc', name: 'xyz', age: 21 }
// Explanation: The spread operator copies properties from person1 into person2.
```

### Original Q23. Guess the Output?

```js
function sum(a = 5, b = 7) {
  return a + b;
}
console.log(sum(undefined, 20));

// Output: 25
// Explanation: Passing undefined makes JavaScript use the default value for a, so a is 5 and b is 20.
```

### Original Q28. Guess the Output?

```js
const userDetails = {
  firstName: "Surbhi",
  lastName: "Dighe",
  age: 20,
  address: {
    city: "Hyderabad",
    country: "India",
  },
};
let cloneUserDetails = { ...userDetails };

// Updating original object
userDetails.age = 22;
userDetails.address.city = "Banglore";

console.log(cloneUserDetails.age);
console.log(cloneUserDetails.address.city);

// Output:
// 20
// Banglore
// Explanation: Spread creates a shallow copy. Top-level age is copied separately, but nested address is still shared by reference.
```

### Original Q35. Guess the Output?

```js
const obj = {
  var1: 1,
  var2: 2,
};
const { var1, var2 } = obj;
console.log(var1, var2);

// Output: 1 2
// Explanation: Object destructuring extracts var1 and var2 from obj into local variables.
```

### Original Q36. Guess the Output?

```js
const user = {
  name: "Surbhi dighe",
  country: "India",
};
const { name: fullname, country } = user;
console.log(fullname);
console.log(name);

// Output:
// Surbhi dighe
// ReferenceError: name is not defined
// Explanation: The name property is renamed to fullname during destructuring. No local variable named name is created.
```

### Original Q37. Guess the Output?

```js
const person = {
  firstName: "Surbhi",
};
const { lastName = "dighe" } = person;
console.log(lastName);

// Output: dighe
// Explanation: lastName does not exist in person, so the default value "dighe" is used.
```

### Original Q38. Guess the Output?

```js
const person = {
  firstName: "Surbhi",
};
const { firstName = "Henry" } = person;
console.log(firstName);

// Output: Surbhi
// Explanation: firstName exists in person, so the default value "Henry" is ignored.
```

### Original Q42. Guess the Output?

```js
let a = { x: 1, y: { alpha: 10, beta: 20 } };
let b = { ...a };
b.x = 101;
b.y.alpha = 1001;
console.log(a.x);
console.log(a.y.alpha);

// Output:
// 1
// 1001
// Explanation: Spread creates a shallow copy. b.x is separate, but nested object y is shared between a and b.
```

### Original Q50. Guess the Output?

```js
let a = {};
let b = { key: "abc" };
let c = { key: "efg" };
a[b] = 111;
a[c] = 222;
console.log(a[b]);

// Output: 222
// Explanation: Object keys in normal objects are converted to strings. Both b and c become "[object Object]", so the second assignment overwrites the first.
```

### Original Q60. Guess the Output?

```js
let greeting;
greetign = {}; // Typo!
console.log(greetign);

// Output: {}
// Answer: A
// Explanation:
// It logs the object, because we just created an empty object on the global object! When we mistyped `greeting`
// as `greetign`, the JS interpreter actually saw this as:
//
// 1. `global.greetign = {}` in Node.js
// 2. `window.greetign = {}`, `frames.greetign = {}` and `self.greetign` in browsers.
// 3. `self.greetign` in web workers.
// 4. `globalThis.greetign` in all environments.
//
// In order to avoid this, we can use `"use strict"`. This makes sure that you have declared a variable before
// setting it equal to anything.
```

### Original Q70. Guess the Output?

```js
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);

// Output: "object"
// Answer: C
// Explanation:
// The rest parameter (`...args`) lets us "collect" all remaining arguments into an array. An array is an object,
// so `typeof args` returns `"object"`
```

### Original Q89. Guess the Output?

```js
// Source Question: Everything in JavaScript is either a...
// Options:
// A: primitive or object
// B: function or object
// C: trick question! only objects
// D: number or object

// Output: primitive or object
// Answer: A
// Explanation:
// JavaScript only has primitive types and objects.
//
// Primitive types are `boolean`, `null`, `undefined`, `bigint`, `number`, `string`, and `symbol`.
//
// What differentiates a primitive from an object is that primitives do not have any properties or methods;
// however, you'll note that `'foo'.toUpperCase()` evaluates to `'FOO'` and does not result in a `TypeError`. This
// is because when you try to access a property or method on a primitive like a string, JavaScript will implicitly
// wrap the primitive type using one of the wrapper classes, i.e. `String`, and then immediately discard the
// wrapper after the expression evaluates. All primitives except for `null` and `undefined` exhibit this behavior.
```

### Original Q93. Guess the Output?

```js
[..."Sagar"];

// Output: ["L", "y", "d", "i", "a"]
// Answer: A
// Explanation:
// A string is an iterable. The spread operator maps every character of an iterable to one element.
```

### Original Q109. Guess the Output?

```js
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);

// Output: 1
// Answer: C
// Explanation:
// We can unpack values from arrays or properties from objects through destructuring. For example:
//
// [a, b] = [1, 2];
//
// The value of `a` is now `1`, and the value of `b` is now `2`. What we actually did in the question, is:
//
// [y] = [1, 2, 3, 4, 5];
//
// This means that the value of `y` is equal to the first value in the array, which is the number `1`. When we log
// `y`, `1` is returned.
```

### Original Q110. Guess the Output?

```js
const user = { name: "Sagar", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);

// Output: { admin: true, name: "Sagar", age: 21 }
// Answer: B
// Explanation:
// It's possible to combine objects using the spread operator `...`. It lets you create copies of the key/value
// pairs of one object, and add them to another object. In this case, we create copies of the `user` object, and
// add them to the `admin` object. The `admin` object now contains the copied key/value pairs, which results in `{
// admin: true, name: "Sagar", age: 21 }`.
```

### Original Q114. Guess the Output?

```js
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);

// Output: 20, 20, 20, 40
// Answer: C
// Explanation:
// In ES6, we can initialize parameters with a default value. The value of the parameter will be the default
// value, if no other value has been passed to the function, or if the value of the parameter is `"undefined"`. In
// this case, we spread the properties of the `value` object into a new object, so `x` has the default value of `{
// number: 10 }`.
//
// The default argument is evaluated at _call time_! Every time we call the function, a _new_ object is created.
// We invoke the `multiply` function the first two times without passing a value: `x` has the default value of `{
// number: 10 }`. We then log the multiplied value of that number, which is `20`.
//
// The third time we invoke multiply, we do pass an argument: the object called `value`. The `*=` operator is
// actually shorthand for `x.number = x.number * 2`: we modify the value of `x.number`, and log the multiplied
// value `20`.
//
// The fourth time, we pass the `value` object again. `x.number` was previously modified to `20`, so `x.number *=
// 2` logs `40`.
```

### Original Q126. Guess the Output?

```js
const { firstName: myName } = { firstName: "Sagar" };

console.log(firstName);

// Output: ReferenceError
// Answer: D
// Explanation:
// By using destructuring assignment syntax we can unpack values from arrays, or properties from objects, into
// distinct variables:
//
// const { firstName } = { firstName: 'Sagar' };
// // ES5 version:
// // var firstName = { firstName: 'Sagar' }.firstName;
//
// console.log(firstName); // "Sagar"
//
// Also, a property can be unpacked from an object and assigned to a variable with a different name than the
// object property:
//
// const { firstName: myName } = { firstName: 'Sagar' };
// // ES5 version:
// // var myName = { firstName: 'Sagar' }.firstName;
//
// console.log(myName); // "Sagar"
// console.log(firstName); // Uncaught ReferenceError: firstName is not defined
//
// Therefore, `firstName` does not exist as a variable, thus attempting to access its value will raise a
// `ReferenceError`.
//
// Note: Be aware of the `global scope` properties:
//
// const { name: myName } = { name: 'Sagar' };
//
// console.log(myName); // "Sagar"
// console.log(name); // "" ----- Browser e.g. Chrome
// console.log(name); // ReferenceError: name is not defined  ----- NodeJS
//
// Whenever Javascript is unable to find a variable within the _current scope_, it climbs up the Scope chain and
// searches for it and if it reaches the top-level scope, aka Global scope, and still doesn't find it, it will
// throw a `ReferenceError`.
//
// - In Browsers such as _Chrome_, `name` is a _deprecated global scope property_. In this example, the code is
// running inside _global scope_ and there is no user-defined local variable for `name`, therefore it searches the
// predefined _variables/properties_ in the global scope which is in the case of browsers, it searches through
// `window` object and it will extract the window.name value which is equal to an empty string.
//
// - In NodeJS, there is no such property on the `global` object, thus attempting to access a non-existent
// variable will raise a ReferenceError.
```

### Original Q128. Guess the Output?

```js
const add = () => {
  const cache = {};
  return (num) => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));

// Output: Calculated! 20 From cache! 20 From cache! 20
// Answer: C
// Explanation:
// The `add` function is a _memoized_ function. With memoization, we can cache the results of a function in order
// to speed up its execution. In this case, we create a `cache` object that stores the previously returned values.
//
// If we call the `addFunction` function again with the same argument, it first checks whether it has already
// gotten that value in its cache. If that's the case, the cache value will be returned, which saves execution
// time. Otherwise, if it's not cached, it will calculate the value and store it afterward.
//
// We call the `addFunction` function three times with the same value: on the first invocation, the value of the
// function when `num` is equal to `10` isn't cached yet. The condition of the if-statement `num in cache` returns
// `false`, and the else block gets executed: `Calculated! 20` gets logged, and the value of the result gets added
// to the cache object. `cache` now looks like `{ 10: 20 }`.
//
// The second time, the `cache` object contains the value that gets returned for `10`. The condition of the
// if-statement `num in cache` returns `true`, and `'From cache! 20'` gets logged.
//
// The third time, we pass `5 * 2` to the function which gets evaluated to `10`. The `cache` object contains the
// value that gets returned for `10`. The condition of the if-statement `num in cache` returns `true`, and `'From
// cache! 20'` gets logged.
```

### Original Q131. Guess the Output?

```js
function sayHi(name) {
  return `Hi there, ${name}`;
}

console.log(sayHi());

// Output: Hi there, undefined
// Answer: B
// Explanation:
// By default, arguments have the value of `undefined`, unless a value has been passed to the function. In this
// case, we didn't pass a value for the `name` argument. `name` is equal to `undefined` which gets logged.
//
// In ES6, we can overwrite this default `undefined` value with default parameters. For example:
//
// `function sayHi(name = "Sagar") { ... }`
//
// In this case, if we didn't pass a value or if we passed `undefined`, `name` would always be equal to the string
// `Sagar`
```

### Original Q138. Guess the Output?

```js
function sum(num1, num2 = num1) {
  console.log(num1 + num2);
}

sum(10);

// Output: 20
// Answer: B
// Explanation:
// You can set a default parameter's value equal to another parameter of the function, as long as they've been
// defined _before_ the default parameter. We pass the value `10` to the `sum` function. If the `sum` function
// only receives 1 argument, it means that the value for `num2` is not passed, and the value of `num1` is equal to
// the passed value `10` in this case. The default value of `num2` is the value of `num1`, which is `10`. `num1 +
// num2` returns `20`.
//
// If you're trying to set a default parameter's value equal to a parameter that is defined _after_ (to the
// right), the parameter's value hasn't been initialized yet, which will throw an error.
```

### Original Q155. Guess the Output?

```js
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Not the same!");
  } else {
    console.log("They are the same!");
  }
}

const person = { name: "Sagar" };

compareMembers(person);

// Output: They are the same!
// Answer: B
// Explanation:
// Objects are passed by reference. When we check objects for strict equality (`===`), we're comparing their
// references.
//
// We set the default value for `person2` equal to the `person` object, and passed the `person` object as the
// value for `person1`.
//
// This means that both values have a reference to the same spot in memory, thus they are equal.
//
// The code block in the `else` statement gets run, and `They are the same!` gets logged.
```

### Original Q166. Guess the Output?

```js
const person = {
  name: "Sagar",
  age: 21,
};

const changeAge = (x = { ...person }) => (x.age += 1);
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1;
  x.name = "Sarah";
};

changeAge(person);
changeAgeAndName();

console.log(person);

// Output: {name: "Sagar", age: 22}
// Answer: C
// Explanation:
// Both the `changeAge` and `changeAgeAndName` functions have a default parameter, namely a _newly_ created object
// `{ ...person }`. This object has copies of all the key/values in the `person` object.
//
// First, we invoke the `changeAge` function and pass the `person` object as its argument. This function increases
// the value of the `age` property by 1. `person` is now `{ name: "Sagar", age: 22 }`.
//
// Then, we invoke the `changeAgeAndName` function, however we don't pass a parameter. Instead, the value of `x`
// is equal to a _new_ object: `{ ...person }`. Since it's a new object, it doesn't affect the values of the
// properties on the `person` object. `person` is still equal to `{ name: "Sagar", age: 22 }`.
```

### Original Q175. Guess the Output?

```js
const myFunc = ({ x, y, z }) => {
  console.log(x, y, z);
};

myFunc(1, 2, 3);

// Output: undefined undefined undefined
// Answer: D
// Explanation:
// `myFunc` expects an object with properties `x`, `y` and `z` as its argument. Since we're only passing three
// separate numeric values (1, 2, 3) instead of one object with properties `x`, `y` and `z` ({x: 1, y: 2, z: 3}),
// `x`, `y` and `z` have their default value of `undefined`.
```

### Original Q181. Guess the Output?

```js
const emojis = ["🥑", ["✨", "✨", ["🍕", "🍕"]]];

console.log(emojis.flat(1));

// Output: ['🥑', '✨', '✨', ['🍕', '🍕']]
// Answer: B
// Explanation:
// With the `flat` method, we can create a new, flattened array. The depth of the flattened array depends on the
// value that we pass. In this case, we passed the value `1` (which we didn't have to, that's the default value),
// meaning that only the arrays on the first depth will be concatenated. `['🥑']` and `['✨', '✨', ['🍕', '🍕']]` in
// this case. Concatenating these two arrays results in `['🥑', '✨', '✨', ['🍕', '🍕']]`.
```

### Original Q188. Guess the Output?

```js
const add = (x) => x + x;

function myFunc(num = 2, value = add(num)) {
  console.log(num, value);
}

myFunc();
myFunc(3);

// Output: 2 4 and 3 6
// Answer: A
// Explanation:
// First, we invoked `myFunc()` without passing any arguments. Since we didn't pass arguments, `num` and `value`
// got their default values: num is `2`, and `value` is the returned value of the function `add`. To the `add`
// function, we pass `num` as an argument, which had the value of `2`. `add` returns `4`, which is the value of
// `value`.
//
// Then, we invoked `myFunc(3)` and passed the value `3` as the value for the argument `num`. We didn't pass an
// argument for `value`. Since we didn't pass a value for the `value` argument, it got the default value: the
// returned value of the `add` function. To `add`, we pass `num`, which has the value of `3`. `add` returns `6`,
// which is the value of `value`.
```

### Original Q200. Guess the Output?

```js
const animals = {};
let dog = { emoji: "🐶" };
let cat = { emoji: "🐈" };

animals[dog] = { ...dog, name: "Mara" };
animals[cat] = { ...cat, name: "Sara" };

console.log(animals[dog]);

// Output: { emoji: "🐈", name: "Sara" }
// Answer: B
// Explanation:
// Object keys are converted to strings.
//
// Since the value of  `dog` is an object,  `animals[dog]` actually means that we’re creating a new property
// called `"[object Object]"` equal to the new object. `animals["[object Object]"]` is now equal to `{ emoji: "🐶",
// name: "Mara"}`.
//
// `cat` is also an object, which means that `animals[cat]` actually means that we’re overwriting the value of
// `animals["[object Object]"]` with the new cat properties.
//
// Logging `animals[dog]`, or actually `animals["[object Object]"]` since converting the `dog` object to a string
// results `"[object Object]"`, returns the `{ emoji: "🐈", name: "Sara" }`.
```

### Original Q204. Guess the Output?

```js
const createMember = ({ email, address = {} }) => {
  const validEmail = /.+\@.+\..+/.test(email);
  if (!validEmail) throw new Error("Valid email pls");

  return {
    email,
    address: address ? address : null,
  };
};

const member = createMember({ email: "my@email.com" });
console.log(member);

// Output: { email: "my@email.com", address: {} }
// Answer: C
// Explanation:
// The default value of `address` is an empty object `{}`. When we set the variable `member` equal to the object
// returned by the `createMember` function, we didn't pass a value for the address, which means that the value of
// the address is the default empty object `{}`. An empty object is a truthy value, which means that the condition
// of the `address ? address : null` conditional returns `true`. The value of the address is the empty object `{}`.
```

### Original Q216. Guess the Output?

```js
let obj = { name: "John", age: 25 };
let newObj = { ...obj, age: 30 };

console.log(obj.age);
console.log(newObj.age);

// Output: 25
// 30
// Explanation:
// 25
// 30
//
// The code creates an object obj with properties name and age. Then it creates a new object newObj using the
// spread operator to copy the properties of obj and then it updates the age property to 30.
//
// The spread operator `...` creates a new object with properties copied from the original object.
//
// So, the first console.log statement logs the value of age property of obj which is `25`.
//
// And, the second console.log statement logs the value of age property of newObj which is `30`.
//
// It doesn't affect the original object `obj`.
```

### Original Q217. Guess the Output?

```js
const add = (a = 1, b = 2) => a + b;
console.log(add());
console.log(add(5));
console.log(add(undefined, 10));

// Output: 3
// 7
// 11
// Explanation:
// 3
// 7
// 11
//
// The code defines a function add which takes two parameters a and b and returns the sum of both. It uses
// default parameters to assign default values 1 to a and 2 to b if they are not provided.
//
// So, the first console.log statement logs the result of add() which is 1 + 2 = 3 as both the parameters are not
// provided and default values are used.
//
// The second console.log statement logs the result of add(5) which is 5 + 2 = 7 as only the first parameter is
// provided and the default value of b is used.
//
// The third console.log statement logs the result of add(undefined, 10) which is 1 + 10 = 11 as the first
// parameter is provided as undefined and it takes the default value 1 and the second parameter is provided as
// 10.
```

### Original Q219. Guess the Output?

```js
const arr = [1, 2, 3];
const [a, b, c] = arr;

console.log(a);
console.log(b);
console.log(c);

// Output: 1
// 2
// 3
// Explanation:
// 1
// 2
// 3
//
// The code defines an array arr with values [1, 2, 3].
//
// Then, it uses `destructuring assignment` to extract the values from the array `arr` and assign them to
// variables `a`, `b`, and `c` respectively.
//
// So, the first console.log statement logs the value of a which is `1`.
//
// The second console.log statement logs the value of b which is `2`.
//
// The third console.log statement logs the value of c which is `3`.
//
// In ES6+, you can use destructuring assignment to extract values from arrays and objects and assign them to
// variables in a concise way.
```

### Original Q244. Guess the Output?

```js
const obj = {
  a: 1,
  b: 2,
  c: {
    a: 3,
    b: 4,
  },
};

const {
  a,
  b,
  c: { a: nestedA },
} = obj;

console.log(a, b, nestedA);

// Output: A: 1 2 3
// Explanation:
// A: 1 2 3
//
// This code snippet uses destructuring assignment to extract values from the `obj` object. It extracts the
// properties `a`, `b`, and the nested property `a` from the `c` object and assigns them to the corresponding
// variables `a`, `b`, and `nestedA`, respectively.
//
// After destructuring, the variables will hold the following values:
//
// - `a`: 1 (value of `obj.a`)
// - `b`: 2 (value of `obj.b`)
// - `nestedA`: 3 (value of `obj.c.a`)
//
// When `console.log(a, b, nestedA)` is executed, it will print `1 2 3`, as the values of the variables match the
// above assignments.
//
// Hence, the correct answer is A: 1 2 3.
```

### Original Q262. Guess the Output?

```js
function multiply(a, b = 1) {
  console.log(a * b);
}
multiply(5, 4);
multiply(5);
multiply(5, null);
multiply(5, "");
multiply(5, "  ");
multiply(5, "hello");
multiply(5, false);
multiply(5, undefined);

// Output: 20,5,0,0,0,NaN,0,5
// Explanation:
// The default value will only be taken if we pass undefined or if we didn't pass the argument.In other cases multiplication will happen after type conversion
```

### Original Q263. Guess the Output?

```js
const person = {
  firstName: "Tushar",
  lastName: undefined,
};
const { firstName = "John", lastName = "Chawla" } = person;
console.log(firstName, lastName);

// Output: Tushar,Chawla
// Explanation:
// The `firstName` property in the `person` object has the value 'Tushar'. The default value "John" is ignored because it only applies when the property does not exist or is `undefined` and same reason for the lastName property.
```

---

## Modules, Imports & Exports

ES modules, import/export behavior, read-only imports, namespace imports.

### Original Q107. Guess the Output?

```js
// counter.js
let counter = 10;
export default counter;

// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);

// Output: Error
// Answer: C
// Explanation:
// An imported module is _read-only_: you cannot modify the imported module. Only the module that exports them can
// change its value.
//
// When we try to increment the value of `myCounter`, it throws an error: `myCounter` is read-only and cannot be
// modified.
```

### Original Q117. Guess the Output?

```js
// index.js
console.log("running index.js");
import { sum } from "./sum.js";
console.log(sum(1, 2));

// sum.js
console.log("running sum.js");
export const sum = (a, b) => a + b;

// Output: running sum.js, running index.js, 3
// Answer: B
// Explanation:
// With the `import` keyword, all imported modules are _pre-parsed_. This means that the imported modules get run
// _first_, and the code in the file that imports the module gets executed _after_.
//
// This is a difference between `require()` in CommonJS and `import`! With `require()`, you can load dependencies
// on demand while the code is being run. If we had used `require` instead of `import`, `running index.js`,
// `running sum.js`, `3` would have been logged to the console.
```

### Original Q139. Guess the Output?

```js
// module.js
export default () => "Hello world";
export const name = "Sagar";

// index.js
import * as data from "./module";

console.log(data);

// Output: { default: function default(), name: "Sagar" }
// Answer: A
// Explanation:
// With the `import * as name` syntax, we import _all exports_ from the `module.js` file into the `index.js` file
// as a new object called `data` is created. In the `module.js` file, there are two exports: the default export,
// and a named export. The default export is a function that returns the string `"Hello World"`, and the named
// export is a variable called `name` which has the value of the string `"Sagar"`.
//
// The `data` object has a `default` property for the default export, other properties have the names of the named
// exports and their corresponding values.
```

### Original Q184. Guess the Output?

```js
// sum.js
export default function sum(x) {
  return x + x;
}

// index.js
import * as sum from "./sum";

// Output: sum.default(4)
// Answer: C
// Explanation:
// With the asterisk `*`, we import all exported values from that file, both default and named. If we had the
// following file:
//
// // info.js
// export const name = 'Sagar';
// export const age = 21;
// export default 'I love JavaScript';
//
// // index.js
// import * as info from './info';
// console.log(info);
//
// The following would get logged:
//
// {
// default: "I love JavaScript",
// name: "Sagar",
// age: 21
// }
//
// For the `sum` example, it means that the imported value `sum` looks like this:
//
// { default: function sum(x) { return x + x } }
//
// We can invoke this function, by calling `sum.default`
```

---

## Iterators, Generators & Symbols

Generators, yield/yield\*, Symbol, custom iterators, async generators.

### Original Q94. Guess the Output?

```js
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);

// Output: 10, 20
// Answer: C
// Explanation:
// Regular functions cannot be stopped mid-way after invocation. However, a generator function can be "stopped"
// midway, and later continue from where it stopped. Every time a generator function encounters a `yield` keyword,
// the function yields the value specified after it. Note that the generator function in that case doesn’t
// _return_ the value, it _yields_ the value.
//
// First, we initialize the generator function with `i` equal to `10`. We invoke the generator function using the
// `next()` method. The first time we invoke the generator function, `i` is equal to `10`. It encounters the first
// `yield` keyword: it yields the value of `i`. The generator is now "paused", and `10` gets logged.
//
// Then, we invoke the function again with the `next()` method. It starts to continue where it stopped previously,
// still with `i` equal to `10`. Now, it encounters the next `yield` keyword, and yields `i * 2`. `i` is equal to
// `10`, so it returns `10 * 2`, which is `20`. This results in `10, 20`.
```

### Original Q118. Guess the Output?

```js
console.log(Number(2) === Number(2));
console.log(Boolean(false) === Boolean(false));
console.log(Symbol("foo") === Symbol("foo"));

// Output: true, true, false
// Answer: A
// Explanation:
// Every Symbol is entirely unique. The purpose of the argument passed to the Symbol is to give the Symbol a
// description. The value of the Symbol is not dependent on the passed argument. As we test equality, we are
// creating two entirely new symbols: the first `Symbol('foo')`, and the second `Symbol('foo')`. These two values
// are unique and not equal to each other, `Symbol('foo') === Symbol('foo')` returns `false`.
```

### Original Q121. Guess the Output?

```js
function* startGame() {
  const answer = yield "Do you love JavaScript?";
  if (answer !== "Yes") {
    return "Oh wow... Guess we're done here";
  }
  return "JavaScript loves you back ❤️";
}

const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️

// Output: game.next().value and game.next("Yes").value
// Answer: C
// Explanation:
// A generator function "pauses" its execution when it sees the `yield` keyword. First, we have to let the
// function yield the string "Do you love JavaScript?", which can be done by calling `game.next().value`.
//
// Every line is executed, until it finds the first `yield` keyword. There is a `yield` keyword on the first line
// within the function: the execution stops with the first yield! _This means that the variable `answer` is not
// defined yet!_
//
// When we call `game.next("Yes").value`, the previous `yield` is replaced with the value of the parameters passed
// to the `next()` function, `"Yes"` in this case. The value of the variable `answer` is now equal to `"Yes"`. The
// condition of the if-statement returns `false`, and `JavaScript loves you back ❤️` gets logged.
```

### Original Q147. Guess the Output?

```js
const info = {
  [Symbol("a")]: "b",
};

console.log(info);
console.log(Object.keys(info));

// Output: {Symbol('a'): 'b'} and []
// Answer: D
// Explanation:
// A Symbol is not _enumerable_. The Object.keys method returns all _enumerable_ key properties on an object. The
// Symbol won't be visible, and an empty array is returned. When logging the entire object, all properties will be
// visible, even non-enumerable ones.
//
// This is one of the many qualities of a symbol: besides representing an entirely unique value (which prevents
// accidental name collision on objects, for example when working with 2 libraries that want to add properties to
// the same object), you can also "hide" properties on objects this way (although not entirely. You can still
// access symbols using the `Object.getOwnPropertySymbols()` method).
```

### Original Q162. Guess the Output?

```js
function* generatorOne() {
  yield ["a", "b", "c"];
}

function* generatorTwo() {
  yield* ["a", "b", "c"];
}

const one = generatorOne();
const two = generatorTwo();

console.log(one.next().value);
console.log(two.next().value);

// Output: ['a', 'b', 'c'] and a
// Answer: C
// Explanation:
// With the `yield` keyword, we `yield` values in a generator function. With the `yield*` keyword, we can yield
// values from another generator function, or iterable object (for example an array).
//
// In `generatorOne`, we yield the entire array `['a', 'b', 'c']` using the `yield` keyword. The value of `value`
// property on the object returned by the `next` method on `one` (`one.next().value`) is equal to the entire array
// `['a', 'b', 'c']`.
//
// console.log(one.next().value); // ['a', 'b', 'c']
// console.log(one.next().value); // undefined
//
// In `generatorTwo`, we use the `yield*` keyword. This means that the first yielded value of `two`, is equal to
// the first yielded value in the iterator. The iterator is the array `['a', 'b', 'c']`. The first yielded value
// is `a`, so the first time we call `two.next().value`, `a` is returned.
//
// console.log(two.next().value); // 'a'
// console.log(two.next().value); // 'b'
// console.log(two.next().value); // 'c'
// console.log(two.next().value); // undefined
```

### Original Q190. Guess the Output?

```js
const teams = [
  { name: "Team 1", members: ["Paul", "Lisa"] },
  { name: "Team 2", members: ["Laura", "Tim"] },
];

function* getMembers(members) {
  for (let i = 0; i < members.length; i++) {
    yield members[i];
  }
}

function* getTeams(teams) {
  for (let i = 0; i < teams.length; i++) {
    // ✨ SOMETHING IS MISSING HERE ✨
  }
}

const obj = getTeams(teams);
obj.next(); // { value: "Paul", done: false }
obj.next(); // { value: "Lisa", done: false }

// Output: yield* getMembers(teams[i].members)
// Answer: B
// Explanation:
// In order to iterate over the `members` in each element in the `teams` array, we need to pass `teams[i].members`
// to the `getMembers` generator function. The generator function returns a generator object. In order to iterate
// over each element in this generator object, we need to use `yield*`.
//
// If we would've written `yield`, `return yield`, or `return`, the entire generator function would've gotten
// returned the first time we called the `next` method.
```

### Original Q194. Guess the Output?

```js
const person = {
  name: "Sagar Damera",
  age: 21
}

[...person] // ["Sagar Damera", 21]

// Output: *[Symbol.iterator]() { yield* Object.values(this) }
// Answer: C
// Explanation:
// Objects aren't iterable by default. An iterable is an iterable if the iterator protocol is present. We can add
// this manually by adding the iterator symbol `Symbol.iterator]`, which has to return a generator object, for
// example by making it a generator function `*[Symbol.iterator {}`. This generator function has to yield the
// `Object.values` of the `person` object if we want it to return the array `["Sagar Damera", 21]`: `yield*
// Object.values(this)`.
```

### Original Q245. Guess the Output?

```js
function* generatorFunction() {
  yield 1;
  yield 2;
  return 3;
}

const generator = generatorFunction();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());

// Output: A: { value: 1, done: false }, { value: 2, done: false }, { value: 3, done: true }
// Explanation:
// A: { value: 1, done: false }, { value: 2, done: false }, { value: 3, done: true }
//
// This code snippet demonstrates the use of a generator function. When a generator function is called, it
// returns an iterator object, which can be used to control the execution of the generator function.
//
// The `generatorFunction` is a generator function that yields three values: `1`, `2`, and `3`. The `yield`
// keyword pauses the execution and returns the yielded value. When the generator is finished, it returns the
// value using the `return` statement.
//
// When the generator is executed step by step using `generator.next()`, it proceeds through the generator
// function's code, stopping at each `yield` statement.
//
// - The first call to `generator.next()` will return `{ value: 1, done: false }`, indicating that the first
// value yielded is `1`, and the generator is not yet done.
// - The second call to `generator.next()` will return `{ value: 2, done: false }`, indicating that the second
// value yielded is `2`, and the generator is not yet done.
// - The third call to `generator.next()` will return `{ value: 3, done: true }`, indicating that the third value
// yielded is `3`, and the generator is done (`done` is `true`).
//
// After the generator is done, any further calls to `generator.next()` will keep returning `{ value: undefined,
// done: true }`.
//
// Hence, the correct answer is A: { value: 1, done: false }, { value: 2, done: false }, { value: 3, done: true
// }.
```

---

## DOM Events & Browser Storage

Event propagation, event target, bubbling, sessionStorage/localStorage, browser-specific behavior.

### Original Q64. Guess the Output?

```js
// Source Question: What are the three phases of event propagation?
// Options:
// A: Target > Capturing > Bubbling
// B: Bubbling > Target > Capturing
// C: Target > Bubbling > Capturing
// D: Capturing > Target > Bubbling

// Output: Capturing > Target > Bubbling
// Answer: D
// Explanation:
// During the capturing phase, the event goes through the ancestor elements down to the target element. It then
// reaches the target element, and bubbling begins.
```

### Original Q73. Guess the Output?

```js
sessionStorage.setItem("cool_secret", 123);

// Output: When the user closes the tab.
// Answer: B
// Explanation:
// The data stored in `sessionStorage` is removed after closing the _tab_.
//
// If you used `localStorage`, the data would've been there forever, unless for example `localStorage.clear()` is
// invoked.
```

### Original Q81. Guess the Output?

```js
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">Click!</button>
  </div>
</div>

// Output: button
// Answer: C
// Explanation:
// The deepest nested element that caused the event is the target of the event. You can stop bubbling by
// `event.stopPropagation`
```

### Original Q82. Guess the Output?

```js
<div onclick="console.log('div')">
  <p onclick="console.log('p')">Click here!</p>
</div>

// Output: p div
// Answer: A
// Explanation:
// If we click `p`, we see two logs: `p` and `div`. During event propagation, there are 3 phases: capturing,
// targeting, and bubbling. By default, event handlers are executed in the bubbling phase (unless you set
// `useCapture` to `true`). It goes from the deepest nested element outwards.
```

---

## JSON, Intl & Built-in APIs

JSON.parse/stringify, Intl.NumberFormat, eval, Object.keys/entries/fromEntries, Proxy.

### Original Q40. Guess the Output?

```js
const arr = ["A", "B", "C", "D", "E"];
console.log(Object.keys(arr));

// Output: ['0', '1', '2', '3', '4']
// Explanation: Arrays are objects, and Object.keys() returns the array indexes as string keys.
```

### Original Q72. Guess the Output?

```js
const sum = eval("10*10+5");

// Output: 105
// Answer: A
// Explanation:
// `eval` evaluates code that's passed as a string. If it's an expression, like in this case, it evaluates the
// expression. The expression is `10 * 10 + 5`. This returns the number `105`.
```

### Original Q111. Guess the Output?

```js
const person = { name: "Sagar" };

Object.defineProperty(person, "age", { value: 21 });

console.log(person);
console.log(Object.keys(person));

// Output: { name: "Sagar", age: 21 }, ["name"]
// Answer: B
// Explanation:
// With the `defineProperty` method, we can add new properties to an object, or modify existing ones. When we add
// a property to an object using the `defineProperty` method, they are by default _not enumerable_. The
// `Object.keys` method returns all _enumerable_ property names from an object, in this case only `"name"`.
//
// Properties added using the `defineProperty` method are immutable by default. You can override this behavior
// using the `writable`, `configurable` and `enumerable` properties. This way, the `defineProperty` method gives
// you a lot more control over the properties you're adding to an object.
```

### Original Q112. Guess the Output?

```js
const settings = {
  username: "SagarDamera",
  level: 19,
  health: 90,
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);

// Output: "{"level":19, "health":90}"
// Answer: A
// Explanation:
// The second argument of `JSON.stringify` is the _replacer_. The replacer can either be a function or an array,
// and lets you control what and how the values should be stringified.
//
// If the replacer is an _array_, only the property names included in the array will be added to the JSON string.
// In this case, only the properties with the names `"level"` and `"health"` are included, `"username"` is
// excluded. `data` is now equal to `"{"level":19, "health":90}"`.
//
// If the replacer is a _function_, this function gets called on every property in the object you're stringifying.
// The value returned from this function will be the value of the property when it's added to the JSON string. If
// the value is `undefined`, this property is excluded from the JSON string.
```

### Original Q143. Guess the Output?

```js
const person = {
  name: "Sagar",
  age: 21,
};

for (const [x, y] of Object.entries(person)) {
  console.log(x, y);
}

// Output: name Sagar and age 21
// Answer: A
// Explanation:
// `Object.entries(person)` returns an array of nested arrays, containing the keys and objects:
//
// `[ [ 'name', 'Sagar' ], [ 'age', 21 ] ]`
//
// Using the `for-of` loop, we can iterate over each element in the array, the subarrays in this case. We can
// destructure the subarrays instantly in the for-of loop, using `const [x, y]`. `x` is equal to the first element
// in the subarray, `y` is equal to the second element in the subarray.
//
// The first subarray is `[ "name", "Sagar" ]`, with `x` equal to `"name"`, and `y` equal to `"Sagar"`, which get
// logged.
// The second subarray is `[ "age", 21 ]`, with `x` equal to `"age"`, and `y` equal to `21`, which get logged.
```

### Original Q160. Guess the Output?

```js
JSON.parse();

// Output: Parses JSON to a JavaScript value
// Answer: A
// Explanation:
// With the `JSON.parse()` method, we can parse JSON string to a JavaScript value.
//
// // Stringifying a number into valid JSON, then parsing the JSON string to a JavaScript value:
// const jsonNumber = JSON.stringify(4); // '4'
// JSON.parse(jsonNumber); // 4
//
// // Stringifying an array value into valid JSON, then parsing the JSON string to a JavaScript value:
// const jsonArray = JSON.stringify([1, 2, 3]); // '[1, 2, 3]'
// JSON.parse(jsonArray); // [1, 2, 3]
//
// // Stringifying an object  into valid JSON, then parsing the JSON string to a JavaScript value:
// const jsonArray = JSON.stringify({ name: 'Sagar' }); // '{"name":"Sagar"}'
// JSON.parse(jsonArray); // { name: 'Sagar' }
```

### Original Q176. Guess the Output?

```js
function getFine(speed, amount) {
  const formattedSpeed = new Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "mile-per-hour",
  }).format(speed);

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return `The driver drove ${formattedSpeed} and has to pay ${formattedAmount}`;
}

console.log(getFine(130, 300));

// Output: The driver drove 130 mph and has to pay \$300.00
// Answer: B
// Explanation:
// With the `Intl.NumberFormat` method, we can format numeric values to any locale. We format the numeric value
// `130` to the `en-US` locale as a `unit` in `mile-per-hour`, which results in `130 mph`. The numeric value `300`
// to the `en-US` locale as a `currency` in `USD` results in `$300.00`.
```

### Original Q185. Guess the Output?

```js
const handler = {
  set: () => console.log("Added a new property!"),
  get: () => console.log("Accessed a property!"),
};

const person = new Proxy({}, handler);

person.name = "Sagar";
person.name;

// Output: Added a new property! Accessed a property!
// Answer: C
// Explanation:
// With a Proxy object, we can add custom behavior to an object that we pass to it as the second argument. In this
// case, we pass the `handler` object which contains two properties: `set` and `get`. `set` gets invoked whenever
// we _set_ property values, and `get` gets invoked whenever we _get_ (access) property values.
//
// The first argument is an empty object `{}`, which is the value of `person`. To this object, the custom behavior
// specified in the `handler` object gets added. If we add a property to the `person` object, `set` will get
// invoked. If we access a property on the `person` object, `get` gets invoked.
//
// First, we added a new property `name` to the proxy object (`person.name = "Sagar"`). `set` gets invoked, and
// logs `"Added a new property!"`.
//
// Then, we access a property value on the proxy object, and the `get` property on the handler object is invoked.
// `"Accessed a property!"` gets logged.
```

### Original Q203. Guess the Output?

```js
const keys = ["name", "age"];
const values = ["Sagar", 22];

const method =
  /* ?? */
  Object[method](
    keys.map((_, i) => {
      return [keys[i], values[i]];
    }),
  ); // { name: "Sagar", age: 22 }

// Output: fromEntries
// Answer: C
// Explanation:
// The `fromEntries` method turns a 2d array into an object. The first element in each subarray will be the key,
// and the second element in each subarray will be the value. In this case, we’re mapping over the `keys` array,
// which returns an array that the first element is the item on the key array on the current index, and the second
// element is the item of the values array on the current index.
//
// This creates an array of subarrays containing the correct keys and values, which results in `{ name: "Sagar",
// age: 22 }`
```

---

## Syntax Errors & Invalid Code

Invalid syntax, invalid rest parameter position, calling non-functions, ReferenceError/TypeError focused examples.

### Original Q39. Guess the Output?

```js
var a = 10;
let a = 20;
console.log(a);

// Output: SyntaxError: Identifier 'a' has already been declared
// Explanation: You cannot redeclare a variable with let in the same scope where it was already declared with var.
```

### Original Q144. Guess the Output?

```js
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")

// Output: SyntaxError
// Answer: D
// Explanation:
// `...args` is a rest parameter. The rest parameter's value is an array containing all remaining arguments, and
// can only be the last parameter! In this example, the rest parameter was the second parameter. This is not
// possible, and will throw a syntax error.
//
// function getItems(fruitList, favoriteFruit, ...args) {
// return [...fruitList, ...args, favoriteFruit];
// }
//
// getItems(['banana', 'apple'], 'pear', 'orange');
//
// The above example works. This returns the array `[ 'banana', 'apple', 'orange', 'pear' ]`
```

### Original Q148. Guess the Output?

```js
const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }

const list = [1, 2, 3, 4]
const user = { name: "Sagar", age: 21 }

console.log(getList(list))
console.log(getUser(user))

// Output: [1, [2, 3, 4]] and SyntaxError
// Answer: A
// Explanation:
// The `getList` function receives an array as its argument. Between the parentheses of the `getList` function, we
// destructure this array right away. You could see this as:
//
// `[x, ...y] = [1, 2, 3, 4]`
//
// With the rest parameter `...y`, we put all "remaining" arguments in an array. The remaining arguments are `2`,
// `3` and `4` in this case. The value of `y` is an array, containing all the rest parameters. The value of `x` is
// equal to `1` in this case, so when we log `[x, y]`, `[1, [2, 3, 4]]` gets logged.
//
// The `getUser` function receives an object. With arrow functions, we don't _have_ to write curly brackets if we
// just return one value. However, if you want to instantly return an _object_ from an arrow function, you have to
// write it between parentheses, otherwise everything between the two braces will be interpreted as a block
// statement. In this case the code between the braces is not a valid JavaScript code, so a `SyntaxError` gets
// thrown.
//
// The following function would have returned an object:
//
// `const getUser = user => ({ name: user.name, age: user.age })`
```

### Original Q149. Guess the Output?

```js
const name = "Sagar";

console.log(name());

// Output: TypeError
// Answer: C
// Explanation:
// The variable `name` holds the value of a string, which is not a function, and thus cannot be invoked.
//
// TypeErrors get thrown when a value is not of the expected type. JavaScript expected `name` to be a function
// since we're trying to invoke it. It was a string however, so a TypeError gets thrown: name is not a function!
//
// SyntaxErrors get thrown when you've written something that isn't valid JavaScript, for example when you've
// written the word `return` as `retrun`.
// ReferenceErrors get thrown when JavaScript isn't able to find a reference to a value that you're trying to
// access.
```

### Original Q257. Guess the Output?

```js
const result=if(5>4)return "true"
else return "false"

// Output: Syntax Error
// Explanation:
// If else is a statement and we cannot store the result of it in a variable and if we try to store its result we will get syntax error.
```

### Original Q258. Guess the Output?

```js
let x=let y=5;

// Output: Syntax Error
// Explanation:
// Variable Declaration is a statement and we cannot store the result of it in a variable and if we try to store its result we will get syntax error.
```

---

## Coding Problems / Utility Functions

Standalone programming utility functions such as palindrome, remove duplicates, IPv4 validation, title case.

### Original Q225. Guess the Output?

```js
function findSecondHighest(arr) {
  const sortedArr = arr.sort((a, b) => b - a);
  return sortedArr[1];
}

// Example usage:
const numbers = [10, 5, 20, 15, 8];
console.log(findSecondHighest(numbers)); // Output: 15

// Output: function findSecondHighest(arr) {
// const sortedArr = arr.sort((a, b) => b - a);
// return sortedArr[1];
// }
// Explanation:
// function findSecondHighest(arr) {
// const sortedArr = arr.sort((a, b) => b - a);
// return sortedArr[1];
// }
//
// // Example usage:
// const numbers = [10, 5, 20, 15, 8];
// console.log(findSecondHighest(numbers)); // Output: 15
//
// The `findSecondHighest` function takes an array of numbers as its parameter and first sorts the array in
// descending order using the `sort()` method and a comparison function. It then returns the second element in
// the sorted array, which is the second highest number.
//
// In the example usage, we pass the array `[10, 5, 20, 15, 8]` to the findSecondHighest function. The function
// returns `15`, which is the second highest number in the array.
```

### Original Q226. Guess the Output?

```js
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Example usage:
const numbers = [1, 2, 3, 2, 1, 4, 5, 4];
console.log(removeDuplicates(numbers)); // Output: [1, 2, 3, 4, 5]

// Output: function removeDuplicates(arr) {
// return [...new Set(arr)];
// }
// Explanation:
// function removeDuplicates(arr) {
// return [...new Set(arr)];
// }
//
// // Example usage:
// const numbers = [1, 2, 3, 2, 1, 4, 5, 4];
// console.log(removeDuplicates(numbers)); // Output: [1, 2, 3, 4, 5]
//
// The `removeDuplicates` function takes an array as its parameter and first creates a Set object from the array
// using the `Set()` constructor. A Set is a collection of unique values, so all duplicates are automatically
// removed. We then use the spread syntax `(...)` to convert the Set back to an array.
//
// In the example usage, we pass the array `[1, 2, 3, 2, 1, 4, 5, 4]` to the removeDuplicates function. The
// function returns a new array with duplicates removed, which is `[1, 2, 3, 4, 5]`.
```

### Original Q227. Guess the Output?

```js
function add(a, b) {
  while (b !== 0) {
    let carry = a & b;
    a = a ^ b;
    b = carry << 1;
  }
  return a;
}

// Example usage:
console.log(add(5, 7)); // Output: 12

// Output: function add(a, b) {
// while (b !== 0) {
// let carry = a & b;
// a = a ^ b;
// b = carry << 1;
// }
// return a;
// }
// Explanation:
// function add(a, b) {
// while (b !== 0) {
// let carry = a & b;
// a = a ^ b;
// b = carry << 1;
// }
// return a;
// }
//
// // Example usage:
// console.log(add(5, 7)); // Output: 12
//
// The add function takes two numbers a and b as its parameters and uses a bitwise approach to add them. It
// repeatedly performs a bitwise AND operation between a and b to get the carry bits and performs a bitwise XOR
// operation between a and b to get the sum bits. It then shifts the carry bits one position to the left and
// assigns the result to b. This process continues until b is equal to 0. The final value of a is the sum of the
// two numbers.
//
// In the example usage, we pass the numbers 5 and 7 to the add function. The function returns 12, which is the
// sum of the two numbers.
```

### Original Q228. Guess the Output?

```js
function isValidIPv4(str) {
  const octets = str.split(".");
  if (octets.length !== 4) return false;
  for (let i = 0; i < octets.length; i++) {
    const octet = octets[i];
    if (isNaN(octet) || octet < 0 || octet > 255) return false;
    if (octet.length > 1 && octet[0] === "0") return false;
  }
  return true;
}

// Example usage:
console.log(isValidIPv4("192.168.0.1")); // Output: true
console.log(isValidIPv4("256.0.0.0")); // Output: false

// Output: function isValidIPv4(str) {
// const octets = str.split(".");
// if (octets.length !== 4) return false;
// for (let i = 0; i   255) return false;
// if (octet.length > 1 && octet[0] === "0") return false;
// }
// return true;
// }
// Explanation:
// function isValidIPv4(str) {
// const octets = str.split(".");
// if (octets.length !== 4) return false;
// for (let i = 0; i   255) return false;
// if (octet.length > 1 && octet[0] === "0") return false;
// }
// return true;
// }
//
// // Example usage:
// console.log(isValidIPv4("192.168.0.1")); // Output: true
// console.log(isValidIPv4("256.0.0.0")); // Output: false
//
// The `isValidIPv4` function takes a string as its parameter and checks if it is a valid `IPv4` address.
//
// An IPv4 address consists of four octets separated by periods, with each octet being a number between 0 and
// 255.
//
// The function first splits the string into an array of octets using the split() method.
//
// It then checks if the array has exactly four elements and if each element is a number between 0 and 255.
//
// It also checks if each octet does not start with a 0 unless it is a single-digit octet.
//
// If any of these conditions are not met, the function returns false. Otherwise, it returns true.
//
// In the example usage, we pass the strings '192.168.0.1' and '256.0.0.0' to the isValidIPv4 function. The
// function returns true for the first string because it is a valid IPv4 address and false for the second string
// because it is not a valid IPv4 address.
```

### Original Q229. Guess the Output?

```js
function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

// Example usage:
console.log(toTitleCase("the quick brown fox")); // Output: 'The Quick Brown Fox'

// Output: function toTitleCase(str) {
// return str.replace(/\b\w+/g, function (word) {
// return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// });
// }
// Explanation:
// function toTitleCase(str) {
// return str.replace(/\b\w+/g, function (word) {
// return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// });
// }
//
// // Example usage:
// console.log(toTitleCase("the quick brown fox")); // Output: 'The Quick Brown Fox'
//
// The `toTitleCase` function takes a string as its parameter and converts it to title case. Title case is a
// style of capitalization where the first letter of each word is capitalized, and the rest of the letters are in
// lowercase.
//
// The function uses a regular expression to match the first letter of each word in the string and then uses the
// `charAt()` and `slice()` methods to capitalize the first letter and convert the rest of the letters to
// lowercase. It returns the modified string.
//
// In the example usage, we pass the string 'the quick brown fox' to the toTitleCase function. The function
// returns 'The Quick Brown Fox', which is the string converted to title case.
```

### Original Q230. Guess the Output?

```js
function getRandomColor() {
  const hexChars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Example usage:
console.log(getRandomColor()); // Output: e.g. '#3D5A89'

// Output: function getRandomColor() {
// const hexChars = "0123456789ABCDEF";
// let color = "#";
// for (let i = 0; i < 6; i++) {
// color += hexChars[Math.floor(Math.random() * 16)];
// }
// return color;
// }
// Explanation:
// function getRandomColor() {
// const hexChars = "0123456789ABCDEF";
// let color = "#";
// for (let i = 0; i < 6; i++) {
// color += hexChars[Math.floor(Math.random() * 16)];
// }
// return color;
// }
//
// // Example usage:
// console.log(getRandomColor()); // Output: e.g. '#3D5A89'
//
// The `getRandomColor` function generates a random hexadecimal color code. A hexadecimal color code is a six-
// digit code that represents a color by specifying the amount of red, green, and blue in it.
//
// Each digit of the code can be any of the sixteen hexadecimal characters (0 to 9 and A to F).
//
// The function generates a random color code by selecting six random hexadecimal characters from the hexChars
// string using the Math.random() function and concatenating them together with a # symbol.
//
// It then returns the generated color code.
//
// In the example usage, we call the getRandomColor function, which returns a randomly generated color code. The
// output can vary each time the function is called, but it should be a valid hexadecimal color code.
```

### Original Q231. Guess the Output?

```js
let x = 5;
{
  let x = 10;
  console.log(x);
}
console.log(x);

// Output: Answer:
// Explanation:
// The output of the code above is:
//
//
// 10
// 5
//
// This is because of the block scoping behavior of the let keyword in ES6.
//
// When we declare a variable with `let` inside a block (in this case, the block is defined by the curly braces),
// the variable is only accessible inside that block and its sub-blocks.
//
// In the code above, we define a variable `x` outside the block with the value of `5`. Then we define another
// variable x inside the block with the value of 10.
//
// The first `console.log()` statement inside the block will print 10, because x refers to the variable defined
// inside the block. The second console.log() statement outside the block will print 5, because it refers to the
// variable defined outside the block.
```

### Original Q232. Guess the Output?

```js
const obj = { a: 1, b: 2, c: 3 };
const { a, b } = obj;
console.log(a, b);

// Output: Answer:
// Explanation:
// The output of the code above is:
//
//
// 1 2
//
// This is because of the object destructuring syntax introduced in ES6.
//
// We declare a constant variable obj with an object containing three properties. Then we use object
// destructuring to extract the properties a and b from the object and assign them to separate variables with the
// same names.
//
// The console.log() statement then prints the values of the a and b variables, which are 1 and 2 respectively.
```

### Original Q233. Guess the Output?

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

arr2.push(4);

console.log(arr1);
console.log(arr2);

// Output: Answer:
// Explanation:
// The output of the code will be:
//
//
// [1, 2, 3]
// [1, 2, 3, 4]
//
// The code creates an array arr1 with the values [1, 2, 3]. It then creates a new array arr2 using the spread
// syntax (...) to spread the values of arr1 into a new array.
//
// arr2.push(4) adds the value 4 to the end of arr2.
//
// However, arr1 remains unchanged because arr2 is a new array with its own reference to the values of arr1. This
// is known as creating a shallow copy of the array.
//
// Therefore, the first console.log(arr1) prints [1, 2, 3] and the second console.log(arr2) prints [1, 2, 3, 4].
```

### Original Q234. Guess the Output?

```js
const x = 10;

function foo() {
  console.log(x);
  const x = 20;
}

foo();

// Output: Answer:
// Explanation:
// The output of the code will be:
//
//
// ReferenceError: Cannot access 'x' before initialization
//
// The foo function attempts to log the value of x before it is initialized. This causes a ReferenceError to be
// thrown, as x is not yet defined in the function scope.
//
// This happens because of variable hoisting in JavaScript. When a variable is declared with const or let, it is
// not hoisted to the top of the scope like variables declared with var are. Instead, they are only accessible
// after they are declared.
//
// Therefore, when console.log(x) is called in the foo function, the local variable x has not yet been
// initialized, resulting in a ReferenceError.
```

### Original Q251. Guess the Output?

```js
console.log(NaN == NaN);
console.log(NaN === NaN);
console.log(NaN !== NaN);

// Output: false,false,false
// Explanation:
// Any comparison of NaN results in false.
```

### Original Q252. Guess the Output?

```js
let a = { name: "Alice" };
let b = [1, 2, 3];
let c = a + b;
console.log(c);

// Output: [object Object]1,2,3
// Explanation:
// The object gets converted to "[object Object]", and the array gets converted to "1,2,3".And after type conversion as anyone of the operand is in string format then concatenation will take place.
```

### Original Q253. Guess the Output?

```js
let a = 5;
let b = {};
let c = a - b;
console.log(c);

// Output: NaN
// Explanation:
// JavaScript tries .toString() on {}, which results in the string "[object Object]".and When JavaScript attempts to convert "[object Object]" to a number, it fails and results in NaN (Not a Number).And finally Any arithmetic operation involving NaN results in NaN.
```

### Original Q254. Guess the Output?

```js
console.log(null == undefined);
console.log(null === undefined);
console.log(null == null);

// Output: true,false,true
// Explanation:
// null == undefined is true because they are considered equal.
// null === undefined is false because they are of different types.
// null == null is true.
```

---
