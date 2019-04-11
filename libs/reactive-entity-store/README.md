# Reactive Entity Store

![NPM](https://img.shields.io/npm/l/reactive-entity-store.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/reactive-entity-store.svg)

<p align="center">
  <img src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png" height="100">
  <img src="https://raw.githubusercontent.com/ReactiveX/rxjs/master/doc/asset/Rx_Logo_S.png" height="100">
</p>

This is a side product of [nodeplotlib](https://github.com/ngfelixl/nodeplotlib-nx), but it is
completely independent. It's a lightweight reactive entity store providing utilities
for all commonly used crud operations, without setting up anything except the interface.

## Installation

```shell
npm install reactive-entity-store
```

## Usage

At first you have to create an empty entity store. Let's use the name *books*
in this demonstration. At first we create a file called **books-store.ts**
which will contain the following

```ts
import { Store } from 'reactive-entity-store';

export interface Book {
  id?: string;
  title: string;
  author: string;
}

export const books = new Store<Book>();
```

It does not matter how you name your files at all, this is just for demonstration
purposes. Lets create a reader of the store, lets name it **service.ts**.

```ts
import { books } from './pathto/books-store';

books.getAll().subscribe(books => console.log(books));

// there are several other "getters"
books.getOne('id1');            // Observable<Book>
books.getOneDynamic(of('id1')); // Observable<Book>
books.getEntities();            // Observable<{[id: string]: Book}>
books.getIds();                 // Observable<string[]>
```

In another file called **controller.ts** we are going to play
around with some of the add and remove logic. The comments are
printed due to the `console.log` in the previous file.

```ts
import { books } from './pathto/books-store';

books.add({ id: 'tcc', title: 'Clean Coder', author: 'Bob' });
// [{id: 'tcc', title: 'Clean Coder', author: 'Bob'}]
books.add({ id: 'ng', title: 'Angular', author: 'Rob' });
// [{id: 'ng', title: 'Angular', author: 'Rob'}, {id: 'tcc', title: 'Clean Coder', author: 'Bob'}]
books.remove('tcc');
// [{id: 'ng', title: 'Angular', author: 'Rob'}]
books.update({id: 'ng', title: 'React'});
// [{id: 'ng', title: 'React', author: 'Rob'}]
books.add({title: 'Vue', author: 'Evan'});
// [{id: 'someUniqueRandomString', title: 'Vue', author: 'Evan'}, {id: 'ng', title: 'React', author: 'Rob}]
books.removeAll();
// []
books.addAll([
  { id: 'ng', title: 'Angular', author: 'Rob' },
  { id: 'tcc', title: 'Clean Coder', author: 'Bob' }
]);
// [{id: 'ng', title: 'Angular', author: 'Rob'}, {id: 'tcc', title: 'Clean Coder', author: 'Bob'}]
```

If you don't provide an `id` property it will autogenerate a string of 20 characters [0-9a-zA-Z] as the id.


## Get in touch

[![twitter](https://img.shields.io/badge/twitter-%40ngfelixl-blue.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ngfelixl)
[![github](https://img.shields.io/badge/github-%40ngfelixl-blue.svg?logo=github)](https://github.com/ngfelixl)

Hi, I am Felix,
Software developer and NgRX contributor. If you have questions, don't hesitate to reach out.

<img src="https://avatars2.githubusercontent.com/u/24190530" width="150" style="border-radius: 50%;">

If you like this library, think about giving it a [star](https://github.com/ngfelixl/nodeplotlib-nx) or follow me on twitter or github or check out my personal
the [website](https://felixlemke.com).