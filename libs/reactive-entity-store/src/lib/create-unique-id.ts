import { Entities } from './interfaces';

export function createUniqueId<T>(object: Entities<T>, length = 10): string {
  let id: string;

  for (let i = 0; i === 0 || object.hasOwnProperty(id); i++) {
    id = Math.random().toFixed(36).substring(2, 2 + (length - 1));
  }

  return id;
}