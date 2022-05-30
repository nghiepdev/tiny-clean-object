# tiny-clean-object

[![NPM version](https://img.shields.io/npm/v/tiny-clean-object.svg)](https://www.npmjs.com/package/tiny-clean-object)
[![NPM monthly download](https://img.shields.io/npm/dm/tiny-clean-object.svg)](https://www.npmjs.com/package/tiny-clean-object)

> A tiny and fast utility to clean deep object

## Installation

```bash
npm install tiny-clean-object
```

### Example:

```ts
import {cleanObject} from 'tiny-clean-object';

const object = {
  a: 'ok',
  b: 123,
  c: null,
  d: undefined,
  e: NaN,
  f: Infinity,
  g: {
    deep: 'ok',
    deep2: {
      obj: {},
      arr: [],
      empty: '',
    },
    deep3: null,
    deep4: NaN,
  },
  h: [],
  i: {},
  k: '',
};

cleanObject(object, {deep: true, emptyObjects: true});
```

### Result

```json
{
  "a": "ok",
  "b": 123,
  "g": {
    "deep": "ok",
    "deep2": {
      "arr": []
    }
  },
  "h": []
}
```

## Options

| Option                | Default value | Description                      |
| --------------------- | ------------- | -------------------------------- |
| _deep_                | _false_       | Recursive. Clean deep object     |
| _skipNull_            | _false_       | Skip keys with null as the value |
| _emptyStrings_        | _true_        | Remove empty strings, ie: `''`   |
| _emptyInvalidNumbers_ | _true_        | Remove `NaN` and `Infinity`      |
| _emptyArrays_         | _false_       | Remove empty arrays, ie: `[]`    |
| _emptyObjects_        | _false_       | Remove empty objects, ie: `{}`   |

## License

MIT
