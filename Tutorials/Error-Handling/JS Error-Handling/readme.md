# Error handling
All the material of this lecture is derived from 
- https://expressjs.com/en/guide/error-handling.html
- https://www.w3schools.com/js/js_errors.asp  
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
- https://web.mit.edu/6.031/www/sp22/classes/06-specifications/#exceptions


## Exceptions for signaling bugs
You’ve probably already seen some exceptions in your JS programming so far. For example, in JS, different values can be returned by the error name property:

|Error Name	|Description|
|---|---|
|RangeError	|A number "out of range" has occurred|
|ReferenceError	|An illegal reference has occurred|
|SyntaxError	|A syntax error has occurred|
|TypeError	|A type error has occurred|

These kinds of exceptions generally indicate bugs – in either the client or the implementation – and the information displayed when the exception is thrown can help you find and fix the bug.

## Exceptions for anticipated failures
Exceptions are not just for signaling bugs. They can be used to signal anticipated sources of failure, in such a way that the caller can catch them and respond to them. Exceptions that signal anticipated failures should be documented in your API, specifying the conditions under which that failure occurs. 

For example, we might return a custom exception back to the client in case of wrong type of a query parameter or a missing parameter. You might want to suppress these exceptions in production environment though and instead send a friendly message to the user indicate what is the exception is all about.   


## Special results
Exceptions are the best way to communicate a problem that the caller is unlikely to be able to handle, for example because they provided an illegal input: either the client or someone who called them, i.e. a proxy, has a bug.

Neglecting to try ... catch some anticipated errors will crash the program. Instead, it would be better to produce a clear error message or prompt the client to try again.

# Throw, and Try...Catch...Finally
The `try` statement defines a code block to run (to try).

The `catch` statement defines a code block to handle any error.

The `finally` statement defines a code block to run regardless of the result.

The `throw` statement defines a custom error.

For example, the following code would trigger `ReferenceError: z is not defined`
```js
let x = z / 0
console.log(x);
```

However, if we contain it in try...catch block, we can control what to do when this error trigger:

```js
try {
  let x = z / 0
  console.log(x);
}
catch {
  // Error
  console.log("Error occurred!");
}
```

Output:
```
Error occurred!
```

# The Error Object
JavaScript has a built in error object that provides error information when an error occurs.

The error object provides two useful properties: *name* and *message*.

Example
```js
try {
  let x = z / 0
  console.log(x);
}
catch (err) {
  // Error
  console.log(err.name);
  console.log(err.message);
}
```

Output:
```
ReferenceError
z is not defined
```

# The throw Statement
The throw statement allows you to create a custom error.

Technically you can throw an exception (throw an error).

Example:
```js
try {
  let x = true
  if (x)
    throw new Error('test')
}
catch (err) {
  // Error
  console.log(err.name);
  console.log(err.message);
}
```

Output
```
Error
test
```

# Summary
When an error occurs, JavaScript will normally stop and generate an error message.

The technical term for this is: JavaScript will throw an exception (throw an error).

JavaScript will actually create an Error object with two properties: name and message.

However, when we design out API server, our goal here is  not stop the execution of the server process but rather to handle the exception gracefully. 

Moving to Express.js, what happens if an exception got raised or triggered. Would the whole server crash?