# Reactive Entity Store

![NPM](https://img.shields.io/npm/l/reactive-entity-store.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/reactive-entity-store.svg)

This project was generated using [Nx](https://nx.dev) and makes heavy usage of [RxJS](https://rxjs.dev).

<p align="center">
  <img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" height="100">
  <img src="https://raw.githubusercontent.com/ReactiveX/rxjs/master/doc/asset/Rx_Logo_S.png" height="100">
</p>

This is a side product of [nodeplotlib](https://github.com/ngfelixl/nodeplotlib-nx), but it is
completely independent. It's a lightweight reactive entity store providing utilities
for all commonly used crud operations, without setting up anything except the interface.

## Users Guide

See the full [users guide](https://github.com/ngfelixl/reactive-entity-store/blob/master/libs/reactive-entity-store).
Here's a quick demo:

```ts
import { Store } from 'reactive-entity-store';

export interface Book {
  id?: string;
  title: string;
  author: string;
}

export const books = new Store<Book>();
books.getAll().subscribe(books => console.log(books));
books.add({ id: 'tcc', title: 'Clean Coder', author: 'Bob' });
// logs [({ id: 'tcc', title: 'Clean Coder', author: 'Bob' }]
```

## Developers Guide

Install the [Angular Console](https://marketplace.visualstudio.com/itemdetails?itemName=nrwl.angular-console) vscode extension. 
Using it you can build, test, lint the library easily. The source files are located in `/libs/reactive-entity-store/src`.
Before submitting a PR please make sure, all tests pass.

## Contributors

Contributions in all forms are welcome!