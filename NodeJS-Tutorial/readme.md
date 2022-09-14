# Node.js 
-  What Is Node.js  
-  Introduction
-  JS Browser ⚔ Server 
-  Download & Install Node 
-  Repl 
-  Cli 
-  Globals 
-  Modules Setup 
-  First Module 
-  Alternative Syntax 
-  Mind Grenade 
-  Built-In Module Intro 
-  Os Module 
-  Path Module
-  fs Module
-  Sync Vs Async
-  Http Module
<!-- -  Http Intro
-  NPM Info
-  NPM Command
-  First Package
-  Share Code
-  Nodemon
-  Uninstall
-  Global Install
-  Package-Lock.Json
-  Important Topics Intro
-  Event Loop
-  Event Loop Slides
-  Event Loop Code Examples
-  Async Patterns - Blocking Code
-  Async Patterns - Setup Promises
-  Async Patterns - Refactor To Async
-  Async Patterns - Node's Native Option
-  Events Info
-  Events Emitter - Code Example
-  Events Emitter - Additional Info
-  Events Emitter - Http Module Example
-  Streams Intro
-  Streams - Read File
-  Streams - Additional Info
-  Streams - Http Example
-  End Of Node Tutorial Module
-  HTTP Request/Response Cycle
-  Http Messages
-  Starter Project Install
-  Starter Overview
-  Http Basics
-  Http - Headers
-  Http - Request Object
-  Http - Html File
-  Http - App Example
-  Express Info
-  Express Basics
-  Express - App Example
-  Express - All Static
-  API Vs SSR
-  JSON Basics
-  Params, Query String - Setup
-  Route Params
-  Params - Extra Info
-  Query String
-  Additional Params And Query String Info
-  Middleware - Setup
-  APP.USE
-  Multiple Middleware Functions
-  Additional Middleware Info
-  Methods - GET
-  Methods - POST
-  Install Postman
-  Methods - PUT
-  Methods - DELETE
-  Express Router - Setup
-  Express Router - Controllers -->

---
##  What Is Node.js
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
![nodejs](https://cdn.discordapp.com/attachments/1017862173881544775/1018608489221861498/unknown.png)

From Wiki:
> Node.js is a runtime system used mostly for making server side applications with JavaScript. It runs on the V8 JavaScript engine. It contains a package manager called NPM.

---
## Introduction  s
https://nodejs.dev/en/learn/

---
## JS in Browser ⚔ Server 
| Browser            | Server           |
| -----------        |---------------   |
| DOM                | **No** Dom       |
| Frontend           | Backend          |
| **No** File system | File system      |
| Window Object      | No Window Object |

---
## Download & Install Node
[Check this link and follow instructions.](https://nodejs.org/en/)

---
## Repl 
> REPL stands for Read Evaluate Print Loop, and it is a programming language environment (basically a console window) that takes single expression as user input and returns the result back to the console after execution. The REPL session provides a convenient way to quickly test simple JavaScript code [[Source]](https://nodejs.dev/en/learn/how-to-use-the-nodejs-repl/).

![rebl](https://cdn.discordapp.com/attachments/1017862173881544775/1018634884455084072/unknown.png)

`Ctrl + C` to exit the repl.

---
## Globals 
In Node.js, we can access  [global variables](https://nodejs.org/api/globals.html) from anywhere.
Here is a list of mostly used global variables:
- [__dirname](https://nodejs.org/api/modules.html#__dirname) Path to current directory 
- [__filename](https://nodejs.org/api/modules.html#__filename) File name of current file 
- [exports](https://nodejs.org/api/modules.html#exports)  A reference to the module.exports that is shorter to type
- [module](https://nodejs.org/api/modules.html#module) A reference to the current module
- [require()](https://nodejs.org/api/modules.html#requireid) Function to Used to import modules

---
## Node.js Modules 
Similar to JavaScript libraries. 

---
### User-defined Modules
Suppose we have the following code
```js
const name_ = "John"
const age = 21
printNameAndAge = () => {
  console.log(name_, age);
}
```
With the following output

```
John 21
```

We can split this code into two files using the `module`, `exports`, and `require()` global variables.

```js
// data.js
const name_ = "John"
const age = 21

module.exports = { name_, age }
```

```js
// test.js
const { name_, age } = require('./data.js')
printNameAndAge = () => {
  console.log(name_, age);
}

printNameAndAge()
```
Try to *log* `module.exports` and `module` to understand how this global variable is used to share info between JS files.

### Built-in Modules
Node.js has a [list of built-in modules](https://www.w3schools.com/nodejs/ref_modules.asp) that you can use without further installation. We will be looking over, `os`, `path`, `fs`, and `http` modules soon.

---
#### `os` Module
[os Module](https://nodejs.org/api/os.html) returns info about the current operating system. Check the following example

```js
const os = require('os')

console.log(os);
```

and the output:
<details>
<summary>
Toggle Me!
</summary>

```
C:\COMP 4537\comp4537repo\playground> nodemon test.js
[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node test.js`
150996
[nodemon] clean exit - waiting for changes before restart

[nodemon] restarting due to changes...
[nodemon] starting `node test.js`
{
  arch: [Function: arch] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  cpus: [Function: cpus],
  endianness: [Function: endianness] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  freemem: [Function: getFreeMem] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  getPriority: [Function: getPriority],
  homedir: [Function: __node_internal_checkError] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  hostname: [Function: __node_internal_checkError] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  loadavg: [Function: loadavg],
  networkInterfaces: [Function: networkInterfaces],
  platform: [Function: platform] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  release: [Function: getOSRelease] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  setPriority: [Function: setPriority],
  tmpdir: [Function: tmpdir] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  totalmem: [Function: getTotalMem] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  type: [Function: getOSType] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  userInfo: [Function: userInfo],
  uptime: [Function: getUptime] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  version: [Function: getOSVersion] {
    [Symbol(Symbol.toPrimitive)]: [Function (anonymous)]
  },
  constants: [Object: null prototype] {
    UV_UDP_REUSEADDR: 4,
    dlopen: [Object: null prototype] {},
    errno: [Object: null prototype] {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 100,
      EADDRNOTAVAIL: 101,
      EAFNOSUPPORT: 102,
      EAGAIN: 11,
      EALREADY: 103,
      EBADF: 9,
      EBADMSG: 104,
      EBUSY: 16,
      ECANCELED: 105,
      ECHILD: 10,
      ECONNABORTED: 106,
      ECONNREFUSED: 107,
      ECONNRESET: 108,
      EDEADLK: 36,
      EDESTADDRREQ: 109,
      EDOM: 33,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 110,
      EIDRM: 111,
      EILSEQ: 42,
      EINPROGRESS: 112,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 113,
      EISDIR: 21,
      ELOOP: 114,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 115,
      ENAMETOOLONG: 38,
      ENETDOWN: 116,
      ENETRESET: 117,
      ENETUNREACH: 118,
      ENFILE: 23,
      ENOBUFS: 119,
      ENODATA: 120,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 39,
      ENOLINK: 121,
      ENOMEM: 12,
      ENOMSG: 122,
      ENOPROTOOPT: 123,
      ENOSPC: 28,
      ENOSR: 124,
      ENOSTR: 125,
      ENOSYS: 40,
      ENOTCONN: 126,
      ENOTDIR: 20,
      ENOTEMPTY: 41,
      ENOTSOCK: 128,
      ENOTSUP: 129,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 130,
      EOVERFLOW: 132,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 134,
      EPROTONOSUPPORT: 135,
      EPROTOTYPE: 136,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ETIME: 137,
      ETIMEDOUT: 138,
      ETXTBSY: 139,
      EWOULDBLOCK: 140,
      EXDEV: 18,
      WSAEINTR: 10004,
      WSAEBADF: 10009,
      WSAEACCES: 10013,
      WSAEFAULT: 10014,
      WSAEINVAL: 10022,
      WSAEMFILE: 10024,
      WSAEWOULDBLOCK: 10035,
      WSAEINPROGRESS: 10036,
      WSAEALREADY: 10037,
      WSAENOTSOCK: 10038,
      WSAEDESTADDRREQ: 10039,
      WSAEMSGSIZE: 10040,
      WSAEPROTOTYPE: 10041,
      WSAENOPROTOOPT: 10042,
      WSAEPROTONOSUPPORT: 10043,
      WSAESOCKTNOSUPPORT: 10044,
      WSAEOPNOTSUPP: 10045,
      WSAEPFNOSUPPORT: 10046,
      WSAEAFNOSUPPORT: 10047,
      WSAEADDRINUSE: 10048,
      WSAEADDRNOTAVAIL: 10049,
      WSAENETDOWN: 10050,
      WSAENETUNREACH: 10051,
      WSAENETRESET: 10052,
      WSAECONNABORTED: 10053,
      WSAECONNRESET: 10054,
      WSAENOBUFS: 10055,
      WSAEISCONN: 10056,
      WSAENOTCONN: 10057,
      WSAESHUTDOWN: 10058,
      WSAETOOMANYREFS: 10059,
      WSAETIMEDOUT: 10060,
      WSAECONNREFUSED: 10061,
      WSAELOOP: 10062,
      WSAENAMETOOLONG: 10063,
      WSAEHOSTDOWN: 10064,
      WSAEHOSTUNREACH: 10065,
      WSAENOTEMPTY: 10066,
      WSAEPROCLIM: 10067,
      WSAEUSERS: 10068,
      WSAEDQUOT: 10069,
      WSAESTALE: 10070,
      WSAEREMOTE: 10071,
      WSASYSNOTREADY: 10091,
      WSAVERNOTSUPPORTED: 10092,
      WSANOTINITIALISED: 10093,
      WSAEDISCON: 10101,
      WSAENOMORE: 10102,
      WSAECANCELLED: 10103,
      WSAEINVALIDPROCTABLE: 10104,
      WSAEINVALIDPROVIDER: 10105,
      WSAEPROVIDERFAILEDINIT: 10106,
      WSASYSCALLFAILURE: 10107,
      WSASERVICE_NOT_FOUND: 10108,
      WSATYPE_NOT_FOUND: 10109,
      WSA_E_NO_MORE: 10110,
      WSA_E_CANCELLED: 10111,
      WSAEREFUSED: 10112
    },
    signals: [Object: null prototype] {
      SIGHUP: 1,
      SIGINT: 2,
      SIGILL: 4,
      SIGABRT: 22,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGSEGV: 11,
      SIGTERM: 15,
      SIGBREAK: 21,
      SIGWINCH: 28
    },
    priority: [Object: null prototype] {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    }
  },
  EOL: '\r\n',
  devNull: '\\\\.\\nul'
}
[nodemon] clean exit - waiting for changes before restart

```
</details>

For example, we can check the system's uptime, release, total memory, and free memory.

---
#### `path` Module
[path Module](https://nodejs.org/api/path.html) returns info about the current file. Check the following example

```js
const path = require('path')

console.log(path);
```

and the output:
<details>
<summary>
Toggle Me!
</summary>

```
[nodemon] starting `node test.js`
<ref *1> {
  resolve: [Function: resolve],
  normalize: [Function: normalize],
  isAbsolute: [Function: isAbsolute],
  join: [Function: join],
  relative: [Function: relative],
  toNamespacedPath: [Function: toNamespacedPath],
  dirname: [Function: dirname],
  basename: [Function: basename],
  extname: [Function: extname],
  format: [Function: bound _format],
  parse: [Function: parse],
  sep: '\\',
  delimiter: ';',
  win32: [Circular *1],
  posix: <ref *2> {
    resolve: [Function: resolve],
    normalize: [Function: normalize],
    isAbsolute: [Function: isAbsolute],
    join: [Function: join],
    relative: [Function: relative],
    toNamespacedPath: [Function: toNamespacedPath],
    dirname: [Function: dirname],
    basename: [Function: basename],
    extname: [Function: extname],
    format: [Function: bound _format],
    parse: [Function: parse],
    sep: '/',
    delimiter: ':',
    win32: [Circular *1],
    posix: [Circular *2],
    _makeLong: [Function: toNamespacedPath]
  },
  _makeLong: [Function: toNamespacedPath]
}
[nodemon] clean exit - waiting for changes before restart

```

</details>

For example, we can check the file's `basename`, and `dirname`.

Another example,

```js
const path = require('path')

console.log(path.resolve(__filename));
console.log(path.basename(__filename));
console.log(path.dirname(__filename));
```
and output:

```
C:\COMP 4537\comp4537repo\playground\test.js
test.js
C:\COMP 4537\comp4537repo\playground
```

---
#### `fs` Module
[fs Module](https://nodejs.org/api/fs.html) returns info about the current file. Check the following example

```js
const fs = require('fs')

console.log(fs);
```

and the output:
<details>
<summary>
Toggle Me!
</summary>

```
[nodemon] starting `node test.js`
{
  appendFile: [Function: appendFile],
  appendFileSync: [Function: appendFileSync],
  access: [Function: access],
  accessSync: [Function: accessSync],
  chown: [Function: chown],
  chownSync: [Function: chownSync],
  chmod: [Function: chmod],
  chmodSync: [Function: chmodSync],
  close: [Function: close],
  closeSync: [Function: closeSync],
  copyFile: [Function: copyFile],
  copyFileSync: [Function: copyFileSync],
  cp: [Function: cp],
  cpSync: [Function: cpSync],
  createReadStream: [Function: createReadStream],
  createWriteStream: [Function: createWriteStream],
  exists: [Function: exists],
  existsSync: [Function: existsSync],
  fchown: [Function: fchown],
  fchownSync: [Function: fchownSync],
  fchmod: [Function: fchmod],
  fchmodSync: [Function: fchmodSync],
  fdatasync: [Function: fdatasync],
  fdatasyncSync: [Function: fdatasyncSync],
  fstat: [Function: fstat],
  fstatSync: [Function: fstatSync],
  fsync: [Function: fsync],
  fsyncSync: [Function: fsyncSync],
  ftruncate: [Function: ftruncate],
  ftruncateSync: [Function: ftruncateSync],
  futimes: [Function: futimes],
  futimesSync: [Function: futimesSync],
  lchown: [Function: lchown],
  lchownSync: [Function: lchownSync],
  lchmod: undefined,
  lchmodSync: undefined,
  link: [Function: link],
  linkSync: [Function: linkSync],
  lstat: [Function: lstat],
  lstatSync: [Function: lstatSync],
  lutimes: [Function: lutimes],
  lutimesSync: [Function: lutimesSync],
  mkdir: [Function: mkdir],
  mkdirSync: [Function: mkdirSync],
  mkdtemp: [Function: mkdtemp],
  mkdtempSync: [Function: mkdtempSync],
  open: [Function: open],
  openSync: [Function: openSync],
  opendir: [Function: opendir],
  opendirSync: [Function: opendirSync],
  readdir: [Function: readdir],
  readdirSync: [Function: readdirSync],
  read: [Function: read],
  readSync: [Function: readSync],
  readv: [Function: readv],
  readvSync: [Function: readvSync],
  readFile: [Function: readFile],
  readFileSync: [Function: readFileSync],
  readlink: [Function: readlink],
  readlinkSync: [Function: readlinkSync],
  realpath: [Function: realpath] { native: [Function (anonymous)] },
  realpathSync: [Function: realpathSync] { native: [Function (anonymous)] },
  rename: [Function: rename],
  renameSync: [Function: renameSync],
  rm: [Function: rm],
  rmSync: [Function: rmSync],
  rmdir: [Function: rmdir],
  rmdirSync: [Function: rmdirSync],
  stat: [Function: stat],
  statSync: [Function: statSync],
  symlink: [Function: symlink],
  symlinkSync: [Function: symlinkSync],
  truncate: [Function: truncate],
  truncateSync: [Function: truncateSync],
  unwatchFile: [Function: unwatchFile],
  unlink: [Function: unlink],
  unlinkSync: [Function: unlinkSync],
  utimes: [Function: utimes],
  utimesSync: [Function: utimesSync],
  watch: [Function: watch],
  watchFile: [Function: watchFile],
  writeFile: [Function: writeFile],
  writeFileSync: [Function: writeFileSync],
  write: [Function: write],
  writeSync: [Function: writeSync],
  writev: [Function: writev],
  writevSync: [Function: writevSync],
  Dir: [class Dir],
  Dirent: [class Dirent],
  Stats: [Function: Stats],
  ReadStream: [Getter/Setter],
  WriteStream: [Getter/Setter],
  FileReadStream: [Getter/Setter],
  FileWriteStream: [Getter/Setter],
  _toUnixTimestamp: [Function: toUnixTimestamp],
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1,
  constants: [Object: null prototype] {
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    UV_DIRENT_UNKNOWN: 0,
    UV_DIRENT_FILE: 1,
    UV_DIRENT_DIR: 2,
    UV_DIRENT_LINK: 3,
    UV_DIRENT_FIFO: 4,
    UV_DIRENT_SOCKET: 5,
    UV_DIRENT_CHAR: 6,
    UV_DIRENT_BLOCK: 7,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFLNK: 40960,
    O_CREAT: 256,
    O_EXCL: 1024,
    UV_FS_O_FILEMAP: 536870912,
    O_TRUNC: 512,
    O_APPEND: 8,
    S_IRUSR: 256,
    S_IWUSR: 128,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_COPYFILE_EXCL: 1,
    COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_FICLONE_FORCE: 4
  },
  promises: [Getter]
}
[nodemon] clean exit - waiting for changes before restart
```

</details>

You can see, that we can open, close, copy, read, write, and append to files.

Let us try to read two files and write them to another:

```js
const { readFileSync, writeFileSync } = require('fs')
const x = readFileSync('./t1.txt', 'utf-8')
const y = readFileSync('./t2.txt', 'utf-8')

writeFileSync('./t3.txt', `${x}${y}`)

```
`./t3.txt` content:

```
t1t2
```
`./t1.txt` content:

```
t1
```

`./t2.txt` content:
```
t2
```

---
# Sync Vs Async
Opening files, requesting HTTP from remote servers, waiting for user input, or performing complex tasks should inspire us to take the proper action asynchronously.  

Let us repeat the previous example but using *async* functions this time.

```js
const { readFile, writeFile } = require('fs')


var x = ""
var y = ""

readFile('./t1.txt', 'utf-8', (err, result) => {
  if (err) {
    console.log(err);
    return
  }
  x = result

  readFile('./t2.txt', 'utf-8', (err, result) => {
    if (err) {
      console.log(err);
      return
    }
    y = result

    writeFile('./t3.txt', `${x}${y}`, (err) => {
      if (err) {
        console.log(err);
        return
      }
    })
  })
})

```

Notice here, how we start to have the *call back hell* which make the code less readable. 

Here how to rewrite the previous code using *promises*:

```js
const { readFile, writeFile } = require('fs')


const getText = (fName) => {
  return new Promise((resolve, reject) => {
    readFile(fName, 'utf-8', (err, result) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(result)
      }
    })
  })
}

var x = ""
var y = ""

getText('./t1.txt')
  .then((result) => {
    x = result
    getText('./t2.txt')
      .then((result) => {
        y = result
        // console.log(result);
        writeFile('./t3.txt', `${x}${y}`, (err) => {if (err) console.log("write" + err); })
      })
  })
  .catch((err) => { console.log("catch" + err); })


```

But the ~~callback~~ promise hell is also there.
The workaround here is to return a promise from `getText` and have all the `then`s in one level:

```js
const { readFile, writeFile } = require('fs')


const getText = (fName) => {
  return new Promise((resolve, reject) => {
    readFile(fName, 'utf-8', (err, result) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(result)
      }
    })
  })
}

var x = ""
var y = ""

getText('./t1.txt')
  .then((result) => {
    x = result
    return getText('./t2.txt')
  })
  .then((result) => {
    y = result
    // console.log(result);
    writeFile('./t3.txt', `${x}${y}`, (err) => { if (err) console.log("write" + err); })
  })
  .catch((err) => { console.log("catch" + err); })

```

Let us move to the next approach using *async/await*:

```js
const { readFile, writeFile, write } = require('fs')


const getText = (fName) => {
  return new Promise((resolve, reject) => {
    readFile(fName, 'utf-8', (err, result) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(result)
      }
    })
  })
}





const start = async () => {
  var x = "rubbish"
  var y = "rubbish"
  try {
    x = await getText('./t1.txt')
    console.log(x);
    y = await getText('./t2.txt')
    console.log(y);
  }
  catch (err) {
    console.log(err);
  }
  writeFile('./t3.txt', `${x}${y}`, (err) => { if (err) console.log(err); })
}

start()

```

Or we can use the `promisify` function from the `util` library:

```js
const { readFile, writeFile, write } = require('fs')
const util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)


var x = "rubbish"
var y = "rubbish"



const start = async () => {
  try {
    x = await readFilePromise('./t1.txt', 'utf-8')
    y = await readFilePromise('./t2.txt', 'utf-8')
  }
  catch (err) {
    console.log(err);
  }
  await writeFilePromise('./t3.txt', `${x}${y}`, (err) => { if (err) console.log(err); })
}

start()

```

### Http Module

```js
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to our home page')
  } else if (req.url === '/about') {
    res.end('Here is our short history')
  } else {
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `)
  }
})

server.listen(5000)
```