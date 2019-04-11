import { Subject, Observable } from 'rxjs';
import { scan, map, pluck, share, switchMap } from 'rxjs/operators';
import { Action, Update, EntityStore, Entities } from './interfaces';
import { addOne, addAll, addMany, updateOne, removeOne, removeAll } from './reducers';

/**
 * Reactive crud store
 * 
 * This store targets the creation of a very simple store
 * to keep your entities in. It provides modification functions
 * for adding, adding all, removing one by id, remove all,
 * update one.
 * 
 * The read functions return observables to read the stored
 * entities in an object or array way. Also you can get a
 * single entity by an id.
 *
 * ## Example
 *
 * ```ts
 * const numberStore = new Store<number>();
 * numberStore.getAll().subscribe(console.log);
 * numberStore.add(8);
 * numberStore.add(3);
 * numberStore.removeAll();
 * // logs ---> [8] ---> [8, 3] ---> []
 * ```
 */
export class Store<T> {
  private store$: Observable<EntityStore<T>>;
  private actions$ = new Subject<Action>();
  private entities$: Observable<Entities<T>>;

  constructor() {
    this.store$ = this.createStore();
    this.entities$ = this.store$.pipe(pluck('entities'));
  }

  private createStore(): Observable<EntityStore<T>> {
    return this.actions$.pipe(
      scan((store: EntityStore<T>, action: Action) => {
        switch(action.type) {
          case 'add': return addOne<T>(store, action.payload);
          case 'addMany': return addMany<T>(store, action.payload);
          case 'addAll': return addAll<T>(action.payload);
          case 'update': return updateOne<T>(store, action.payload);
          case 'remove': return removeOne<T>(store, action.payload);
          case 'removeAll': return removeAll<T>();
          default: return store;
        }
      }, {entities: {}, ids: []}),
      share()
    );
  }

  add(entity: T): void { this.actions$.next({type: 'add', payload: entity}); }
  addMany(entities: T[]): void { this.actions$.next({type: 'addMany', payload: entities}); }
  addAll(entities: T[]): void { this.actions$.next({type: 'addAll', payload: entities}); }
  update(changes: Update): void { this.actions$.next({type: 'update', payload: changes}); }
  remove(id: string): void { this.actions$.next({type: 'remove', payload: id}); }
  removeAll(): void { this.actions$.next({type: 'removeAll'}); }

  /**
   * Get one entity filtered by id
   * @param id
   */
  getOne(id: string): Observable<T | undefined> {
    return this.entities$.pipe(
      pluck(id),
      map((entity: T | undefined) => (entity ? {id, ...entity} : undefined))
    );
  }

  /**
   * Get one item by a maybe changing variable. This for example can be useful
   * when getting data by router paramters
   * @param id$
   */
  getOneDynamic(id$: Observable<string>): Observable<T | undefined> {
    return id$.pipe(
      switchMap(id => this.getOne(id))
    )
  }

  /**
   * Get all entities in an array including the id property
   */
  getAll(): Observable<T[]> {
    return this.entities$.pipe(map(entities => {
      return Object.entries(entities).map(
        ([id, entity]: [string, T]) => ({id, ...entity})
      );
    }));
  }

  /**
   * Get all entities as an object with keys
   */
  getEntities(): Observable<Entities<T>> {
    return this.entities$;
  }

  /**
   * Return all ids
   */
  getIds(): Observable<string[]> {
    return this.store$.pipe(pluck('ids'));
  }
}

