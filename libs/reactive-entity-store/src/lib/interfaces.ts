export interface Action<T = any> {
  type: string;
  payload?: T;
}

export interface Entities<T> {
  [id: string]: T;
}

export interface Update<T = any> {
  id: string;
  payload: Partial<T>;
}

export interface EntityStore<T = any> {
  entities: Entities<T>;
  ids: string[];
}