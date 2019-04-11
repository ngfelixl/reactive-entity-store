import { EntityStore, Entities, Update } from "./interfaces";
import { createUniqueId } from './create-unique-id';

export function addOne<T>(store: EntityStore<T>, entity: T): EntityStore<T> {
  if (!entity) {
    return store;
  }

  addToStore(store, entity);
  return store;
}

export function addAll<T>(payload: T[]): EntityStore<T> {
  return payload.reduce(
    (store: EntityStore<T>, entity: T) => {
      addToStore(store, entity);
      return store
    },
    {entities: {}, ids: []}
  );
}

export function addMany<T>(store: EntityStore<T>, payload: T[]): EntityStore<T> {
  payload.forEach((entity: T) => {
    addToStore(store, entity);
  });
  return store;
}

export function removeOne<T>(store: EntityStore<T>, id: string): EntityStore<T> {
  if (store.entities[id]) {
    delete store.entities[id];
    store.ids.splice(store.ids.indexOf(id), 1);
  }
  return store;
}

export function removeAll<T>(): EntityStore<T> {
  return {entities: {}, ids: []};
}

export function updateOne<T>(store: EntityStore<T>, update: Update) {
  const entity = store.entities[update.id];
  store.entities[update.id] = {...entity, ...update.payload};
  return store;
}

function safeId<T>(entity: T, entities: Entities<T>) {
  return encodeURIComponent(entity['id']) || createUniqueId(entities);
}

function addToStore<T>(store: EntityStore<T>, entity: T): EntityStore<T> {
  const id = safeId(entity, store.entities);

  if (store.entities[id]) {
    return store;
  }

  delete entity['id'];
  store.entities[id] = entity;
  store.ids.push(id);
  return store;
}