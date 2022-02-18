---
title: RxJS
transition: fade
enableMenu: false
---

>  RxJS 

---

> What is RxJS?

*"RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code."*

---

> A Javascript libray with **Observables** as the main focus

---

> **Observables**

- Zero to many values
- *A primitive that gives you zero to many value* {style="display: none"}
  
- Pushed over any amount of time
- *They push those value over time* {style="display: none"}
  
- Cancellable
- *They are cancellable, so you can tell it to stop sending you values* {style="display: none"}
  
- Lazy
- *They are lazy, so they don't do anything until you subscribe to it, like functions, they don't do anything unless you call it* {style="display: none"}

---

> **Observables** require subscription

```ts
observable$.subscribe(
  value => console.log(value),
)
```

---

> **Observables** require subscription

```ts
observable$.subscribe(
  value => console.log(value),
  error => console.log(error),
)
```

---

> **Observables** require subscription

```ts
observable$.subscribe(
  value => console.log(value),
  error => console.log(error),
  () => console.log('complete'),
)
```

---

> They give you the ability to cancel

```ts
const subscription =  observable$.subscribe(
  value => console.log(value),
  error => console.log(error),
  () => console.log('complete'),
)

// later
subscription.unsubscribe();
```

---

> Observables push values

- 0 - n values over time
- A notication that it's done successfully
- Or A notification that it had an error

---

> **Observables** are **collections** of **pushed values** or **events**

---

> Collections have operations

- querying (filtering)
- transforming (mapping)
- accumulating (reducing)
- joining
- flatting
- so many more ...

---

> Arrays are collections, for example:

```ts
const arr = [1, 2, 3, 4, 5, 6, 7, 8];

const result = arr.filter(x => x > 4)
  .map(x => x + x)
  .reduce((a, x) => a + x, 0);

console.log(result)

// 52
```

---

> Observables aren't much different:

```ts
const source$ = rx.from([1, 2, 3, 4, 5, 6, 7, 8]);

source$.pipe( // pipe chaining instead of dot chaining
  filter(x => x > 4),
  map(x => x + x),
  reduce((a, x) => a + x, 0),
)

source$.subscribe(x => console.log(x))

// 52
```

---

> Observables have the element of time

- debounce
- throttle
- delay
- race
- combineLatest
- switch
- etc ...

**It means that you can debounce it, throttle it ...** {style="display: none;"}

---

> Composing Asynchrony is where RxJS shines

> **you can use RxJS for a lot of things, but the real thing it's made for is kind of composing asynchronous things, so you have got this set of operations you can perform on asynchronous things. Which means you can kind of query events like a database and combine different sets of events. So composing asynchronous events together is really what rxjs is made for** {style="display: none;"}

---

> RxJS can be used everywhere

- Node
- Browser
- Angular
- React
- Vue
- Embedded JS
- Most JS engines ...

---

> ### Demo
