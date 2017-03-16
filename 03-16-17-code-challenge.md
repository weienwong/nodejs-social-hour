# Async Code Challenge

This challenge is simple... write as many async techniques as you can to read this file.

- [ ] callbacks
- [ ] Promises
- [ ] Async/Await
- [ ] Generators
- [ ] Reactive Extensions (a.k.a Observables)
- [ ] CSP(Communicating Sequential Processes)

_A couple of rules_

How you choose to read the file is up to you. As long as you implement a wrapper around reading the file in the technique you are choosing to demonstrate. i.e. Using a callback with the node [`fs` module](https://nodejs.org/api/fs.html) is not an implementation of the callback style. You would need to write a function that takes a callback and interops with `fs`.

_A couple of notes_

You should use Node v7.6 or later since it includes native async/await support. This way you won't need to transpile.

Observables are not natively supported in JavaScript. Yet... ;)
