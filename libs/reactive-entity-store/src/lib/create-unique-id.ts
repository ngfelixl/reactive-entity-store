import { Entities } from './interfaces';

export function createUniqueId<T>(object: Entities<T>, length = 20): string {
  let id: string;

  do {
    /* tslint:disable:no-bitwise */
    id = [...Array(10)].map(i => (~~(Math.random()*36)).toString(36)).join('')
    /* tslint:enable:no-bitwise */
  } while(object.hasOwnProperty(id));

  return id;
}