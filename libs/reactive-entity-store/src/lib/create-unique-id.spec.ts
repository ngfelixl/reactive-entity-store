import { createUniqueId } from './create-unique-id';

describe('createUniqueId', () => {
  it('should create an id', () => {
    const id = createUniqueId({});
    expect(id).toBeTruthy();
  });

  it('should produce ids with defined lengths', () => {
    const id = createUniqueId({}, 2);
    expect(id.length).toBe(2);
  });
});