# tiny-clean-object

[![NPM version](https://img.shields.io/npm/v/tiny-clean-object.svg)](https://www.npmjs.com/package/tiny-clean-object)
[![NPM yearly download](https://img.shields.io/npm/dy/tiny-clean-object.svg)](https://www.npmjs.com/package/tiny-clean-object)

> A tiny and fast utility to clean deep object

## Installation

```bash
yarn add tiny-clean-object
```

Example:

```js
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

cleanObject(object, {deep: true});
```

Result

```json
{
  "a": "ok",
  "b": 123,
  "g": {
    "deep": "ok",
    "deep2": {
      "obj": {},
      "arr": [],
      "empty": ""
    }
  },
  "h": [],
  "i": {},
  "k": ""
}
```

## Options

| Option         | Default value | Description                    |
| -------------- | ------------- | ------------------------------ |
| _deep_         | _false_       | Recursive. Clean deep object   |
| _emptyArrays_  | _false_       | Remove empty arrays, ie: `[]`  |
| _emptyObjects_ | _false_       | Remove empty objects, ie: `{}` |
| _emptyStrings_ | _false_       | Remove empty strings, ie: `''` |

## License

MIT © [Nghiep](mailto:me@nghiepit.dev)
