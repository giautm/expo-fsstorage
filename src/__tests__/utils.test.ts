import {
  resolvePath,
} from '../utils';

it('resolvePath works as expect', () => {
  expect(resolvePath('.', '/', '/', 'a', '/', '/')).toBe('a');
});