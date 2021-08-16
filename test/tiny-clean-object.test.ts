import {cleanObject} from '../lib/tiny-clean-object';
import {source} from './source-tests';

jest.mock('./source-tests');

test('with default options', () => {
  expect(cleanObject(source)).toMatchObject({
    a: 'ok',
    b: 123,
    g: {
      deep: 'ok',
      deep2: {
        obj: {},
        arr: [],
      },
    },
    h: [],
    i: {},
  });
});

test('with {deep: true, skipNull: true} options', () => {
  expect(cleanObject(source, {deep: true, skipNull: true})).toMatchObject({
    a: 'ok',
    b: 123,
    g: {
      deep: 'ok',
      deep2: {
        arr: [],
      },
    },
    h: [],
  });
});

test('with {deep: true, emptyStrings: false} options', () => {
  expect(
    cleanObject(source, {
      deep: true,
      emptyStrings: false,
    })
  ).toMatchObject({
    a: 'ok',
    b: 123,
    g: {
      deep: 'ok',
      deep2: {
        arr: [],
        empty: '',
      },
    },
    h: [],
    k: '',
  });
});

test('with {deep: true, emptyInvalidNumbers: false} options', () => {
  expect(
    cleanObject(source, {
      deep: true,
      emptyInvalidNumbers: false,
    })
  ).toMatchObject({
    a: 'ok',
    b: 123,
    e: NaN,
    f: Infinity,
    g: {
      deep: 'ok',
      deep2: {
        obj: {},
        arr: [],
      },
      deep4: NaN,
    },
    h: [],
    i: {},
  });
});

test('with {deep: true, emptyArrays: true} options', () => {
  expect(cleanObject(source, {deep: true, emptyArrays: true})).toMatchObject({
    a: 'ok',
    b: 123,
    g: {
      deep: 'ok',
      deep2: {
        obj: {},
      },
    },
    i: {},
  });
});

test('with {deep: true, emptyObjects: true} options', () => {
  expect(cleanObject(source, {deep: true, emptyObjects: true})).toMatchObject({
    a: 'ok',
    b: 123,
    g: {
      deep: 'ok',
      deep2: {
        arr: [],
      },
    },
    h: [],
  });
});
