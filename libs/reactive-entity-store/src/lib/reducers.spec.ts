import { addOne, addMany, addAll, updateOne, removeOne, removeAll } from './reducers';
import { EntityStore } from './interfaces';

interface Test {
  id?: string;
  name: string;
}

describe('reducers', () => {
  let store: EntityStore<Test>;
  beforeEach(() => {
    store = {
      entities: {},
      ids: []
    }
  });

  describe('addOne', () => {
    it('should add an item', () => {
      store = addOne(store, {id: '1', name: 'Paul'});
      expect(store).toEqual({entities: {'1': {name: 'Paul'}}, ids: ['1']});
    });

    it('should add an item without having id property', () => {
      store = addOne(store, {name: 'Jörg'});
      expect(Object.values(store.entities)).toEqual([{name: 'Jörg'}]);
      expect(store.ids.length).toBe(1);
    });

    it('should not add elements with duplicate id', () => {
      store = {entities: {'1': {name: 'Paul'}}, ids: ['1']};
      store = addOne(store, {id: '1', name: 'Maya'});
      expect(store).toEqual({entities: {'1': {name: 'Paul'}}, ids: ['1']});
    });

    it('should return the store if entity is falsy', () => {
      store = addOne(store, undefined);
      expect(store).toEqual({entities: {}, ids: []});
    });
  });

  describe('addMany', () => {
    it('should add 1 items', () => {
      store = addMany(store, [{id: '1', name: 'Paul'}]);
      expect(store).toEqual({entities: {'1': {name: 'Paul'}}, ids: ['1']});
    });

    it('should add 2 items', () => {
      store = addMany(store, [{id: '1', name: 'Paul'}, {id: '2', name: 'Maya'}]);
      expect(store).toEqual({
        entities: {'1': {name: 'Paul'}, '2': {name: 'Maya'}},
        ids: ['1', '2']
      });
    });
  });

  describe('addAll', () => {
    it('should add items', () => {
      store = addAll([{id: '1', name: 'Paul'}]);
      expect(store).toEqual({entities: {'1': {name: 'Paul'}}, ids: ['1']});
    });
  });

  describe('removeOne', () => {
    it('should remove an item', () => {
      store = {entities: {'1': {name: 'Paul'}}, ids: ['1']};
      store = removeOne(store, '1');
      expect(store).toEqual({ entities: {}, ids: [] });
    });
  });

  describe('removeAll', () => {
    it('should remove an item', () => {
      store = {
        entities: {'1': {name: 'Paul'}, '2': {name: 'Maya'}},
        ids: ['1', '2']
      };
      store = removeAll();
      expect(store).toEqual({ entities: {}, ids: [] });
    });
  });

  describe('updateOne', () => {
    it('should update an item', () => {
      store = {
        entities: {'1': {name: 'Paul'}, '2': {name: 'Maya'}},
        ids: ['1', '2']
      };
      store = updateOne(store, {id: '1', payload: {name: 'Frieda'}});
      expect(store).toEqual({
        entities: {'1': {name: 'Frieda'}, '2': {name: 'Maya'}},
        ids: ['1', '2']
      });
    });
  });
});