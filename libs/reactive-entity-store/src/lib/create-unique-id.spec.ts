import { createUniqueId } from './create-unique-id';

describe('createUniqueId', () => {
  it('should create an id', () => {
    const id = createUniqueId({});
    expect(id).toBeTruthy();
  });
});