import {isPlainObject} from './utils';
import {Options} from './types';

const defaultOptions: Options = {
  deep: false,
  skipNull: false,
  emptyStrings: true,
  emptyInvalidNumbers: true,
  emptyArrays: false,
  emptyObjects: false,
};

export function cleanObject<O extends Record<string, unknown>>(
  obj: O,
  options = defaultOptions
): O {
  const deep = options.deep ?? defaultOptions.deep;
  const skipNull = options.skipNull ?? defaultOptions.skipNull;
  const emptyStrings = options.emptyStrings ?? defaultOptions.emptyStrings;
  const emptyInvalidNumbers =
    options.emptyInvalidNumbers ?? defaultOptions.emptyInvalidNumbers;
  const emptyArrays = options.emptyArrays ?? defaultOptions.emptyArrays;
  const emptyObjects = options.emptyObjects ?? defaultOptions.emptyObjects;

  for (const key in obj) {
    const value = obj[key];

    if (skipNull) {
      if (value === undefined) {
        delete obj[key];
        continue;
      }
    } else {
      if (value == undefined) {
        delete obj[key];
        continue;
      }
    }

    if (emptyStrings && value === '') {
      delete obj[key];
      continue;
    }

    if (
      emptyInvalidNumbers &&
      typeof value === 'number' &&
      isFinite(value) === false
    ) {
      delete obj[key];
      continue;
    }

    if (emptyArrays && Array.isArray(value) && value.length === 0) {
      delete obj[key];
      continue;
    }

    if (isPlainObject(value)) {
      if (emptyObjects && Object.keys(value).length === 0) {
        delete obj[key];
        continue;
      }

      if (deep) {
        cleanObject(value, {
          deep,
          skipNull,
          emptyStrings,
          emptyInvalidNumbers,
          emptyArrays,
          emptyObjects,
        });
      }
    }
  }

  return obj;
}
