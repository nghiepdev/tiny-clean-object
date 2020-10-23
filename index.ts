interface Options {
  deep?: boolean;
  emptyStrings?: boolean;
  emptyInvalidNumbers?: boolean;
  emptyArrays?: boolean;
  emptyObjects?: boolean;
}

const defaultOptions: Options = {
  deep: false,
  emptyStrings: true,
  emptyInvalidNumbers: true,
  emptyArrays: false,
  emptyObjects: false,
};

// Refer https://github.com/sindresorhus/is-plain-obj
export function isPlainObject(value: unknown): value is {} {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

export function cleanObject<O extends Record<string, unknown>>(
  obj: O,
  options = defaultOptions,
): O {
  const deep = options.deep ?? defaultOptions.deep;
  const emptyStrings = options.emptyStrings ?? defaultOptions.emptyStrings;
  const emptyInvalidNumbers =
    options.emptyInvalidNumbers ?? defaultOptions.emptyInvalidNumbers;
  const emptyArrays = options.emptyArrays ?? defaultOptions.emptyArrays;
  const emptyObjects = options.emptyObjects ?? defaultOptions.emptyObjects;

  for (const key in obj) {
    const value = obj[key];

    if (value == null) {
      delete obj[key];
      continue;
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
          emptyStrings,
          emptyArrays,
          emptyObjects,
        });
      }
    }
  }

  return obj;
}
