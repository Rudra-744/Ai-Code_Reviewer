❌ Bad Code:
```javascript
function sum(){return a + b}
```

🔍 Issues:
* ❌ **Undeclared Variables:** The variables `a` and `b` are used without being declared or passed as parameters. This
will lead to a `ReferenceError` if `a` and `b` are not defined in the global scope, making the function unpredictable
and non-reusable.
* ❌ **Poor Function Signature:** A `sum` function typically implies it will operate on given arguments. Relying on
external, undeclared variables breaks the function's encapsulation and makes its behavior unclear.
* ❌ **Lack of Readability & Maintainability:** The dependency on external state makes the function harder to understand,
test, and maintain.

✅ Recommended Fix:
```javascript
/**
* Calculates the sum of two numbers.
* @param {number} a - The first number.
* @param {number} b - The second number.
* @returns {number} The sum of a and b.
*/
function sum(a, b) {
return a + b;
}
```

💡 Improvements:
* ✔ **Explicit Parameters:** `a` and `b` are now clearly defined as parameters, making the function's inputs explicit
and predictable.
* ✔ **Improved Reusability:** The function can now be called with any two numbers, making it a pure and highly reusable
component.
* ✔ **Error Prevention:** Eliminates the potential `ReferenceError` caused by undeclared variables.
* ✔ **Enhanced Readability & Maintainability:** The function's purpose and its dependencies are immediately clear,
making it easier to understand, debug, and modify.
* ✔ **Added JSDoc Comments:** Provides clear documentation for the function, its parameters, and its return value, which
is crucial for larger codebases and team collaboration.