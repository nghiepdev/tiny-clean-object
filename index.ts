interface Options {
  deep?: boolean;
  emptyStrings?: boolean;
  emptyArrays?: boolean;
  emptyObjects?: boolean;
}

const defaultOptions: Options = {
  deep: false,
  emptyStrings: false,
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
  const emptyArrays = options.emptyArrays ?? defaultOptions.emptyArrays;
  const emptyObjects = options.emptyObjects ?? defaultOptions.emptyObjects;

  for (const key in obj) {
    const value = obj[key];

    if (deep && isPlainObject(value)) {
      cleanObject(value, options);
    }

    if (value == null) {
      delete obj[key];
      continue;
    }

    if (emptyStrings && value === '') {
      delete obj[key];
      continue;
    }

    if (typeof value === 'number' && !isFinite(value)) {
      delete obj[key];
      continue;
    }

    if (typeof value === 'object') {
      if (emptyArrays && Array.isArray(value) && value.length === 0) {
        delete obj[key];
        continue;
      }

      if (
        emptyObjects &&
        isPlainObject(value) &&
        Object.keys(value).length === 0
      ) {
        delete obj[key];
      }
    }
  }

  return obj;
}
