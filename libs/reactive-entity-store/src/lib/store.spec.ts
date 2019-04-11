import { Store } from "./store";
import { TestScheduler } from 'rxjs/testing';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

interface Test {
  id?: string;
  attribute: string;
}

const scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('Store', () => {
  let store: Store<Test>;
  const subscription = new Subscription();

  beforeEach(() => {
    store = new Store<Test>();
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should add an element', (done) => {
    store.getAll().subscribe(
      (data) => {
        expect(data).toEqual([{id: '1', attribute: '2'}]);
        done();
      }
    );
    store.add({id: '1', attribute: '2'});
  });

  it('should add all elements', (done) => {
    store.getAll().subscribe(
      (data) => {
        expect(data).toEqual([{id: '1', attribute: '2'}, {id: '2', attribute: '2'}]);
        done();
      }
    );

    store.addAll([{id: '1', attribute: '2'}, {id: '2', attribute: '2'}]);
  });

  it('should update an element', (done) => {
    store.getOne('1').pipe(skip(1)).subscribe((data) => {
      expect(data).toEqual({id: '1', attribute: '2'});
      done();
    });

    store.add({id: '1', attribute: '1'});
    store.update({id: '1', payload: {attribute: '2'}});
  });

  it('should remove an element by id', (done) => {
    store.getAll().pipe(skip(1)).subscribe((data) => {
      expect(data).toEqual([{id: '2', attribute: '2'}]);
      done();
    });
    store.addAll([{id: '1', attribute: '1'}, {id: '2', attribute: '2'}]);
    store.remove('1');
  });

  it('should remove all elements', (done) => {
    store.getAll().pipe(skip(1)).subscribe((data) => {
      expect(data).toEqual([]);
      done();
    });
    store.addAll([{id: '1', attribute: '1'}, {id: '2', attribute: '2'}]);
    store.removeAll();
  });

  afterEach(() => {
    subscription.unsubscribe();
  });
});