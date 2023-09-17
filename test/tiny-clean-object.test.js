const {cleanObject} = require('../dist/index.cjs');
const {createSource} = require('./source-tests.cjs');

let source;

beforeEach(() => {
  source = createSource();
});

test('with default options', () => {
  expect(cleanObject(source)).toEqual({
    a: 'ok',
    b: 123,
    g: {
      deep: 'ok',
      deep2: {
        obj: {},
        empty: '',
        arr: [],
      },
      deep3: null,
      deep4: NaN,
    },
    h: [],
    i: {},
  });
});

test('with {deep: true, skipNull: true} options', () => {
  expect(cleanObject(source, {deep: true, skipNull: true})).toEqual({
    a: 'ok',
    b: 123,
    c: null,
    g: {
      deep: 'ok',
      deep2: {
        arr: [],
        obj: {},
      },
      deep3: null,
    },
    h: [],
    i: {},
  });
});

test('with {deep: true, emptyStrings: false} options', () => {
  expect(
    cleanObject(source, {
      deep: true,
      emptyStrings: false,
    })
  ).toEqual({
    a: 'ok',
    b: 123,
    g: {
      deep: 'ok',
      deep2: {
        arr: [],
        empty: '',
        obj: {},
      },
    },
    h: [],
    i: {},
    k: '',
  });
});

test('with {deep: true, emptyInvalidNumbers: false} options', () => {
  expect(
    cleanObject(source, {
      deep: true,
      emptyInvalidNumbers: false,
    })
  ).toEqual({
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
  expect(cleanObject(source, {deep: true, emptyArrays: true})).toEqual({
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
  expect(cleanObject(source, {deep: true, emptyObjects: true})).toEqual({
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

test('objects are recursively cleaned up', () => {
  const clean = cleanObject(
    {o: {b: {}}},
    {
      deep: true,
      emptyObjects: true,
    }
  );

  expect(clean).toEqual({});
});
