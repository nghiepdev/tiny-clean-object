// Refer https://github.com/sindresorhus/is-plain-obj
export function isPlainObject(value: unknown): value is {} {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

// Refer https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/issues/121#issuecomment-505082672
// TODO: Replace with structuredClone
export function recursiveClone<O>(obj: O): O {
  const target = {} as O;
  for (const key in obj) {
    const value = obj[key];
    if (isPlainObject(value)) {
      target[key] = recursiveClone(value);
    } else {
      target[key] = value;
    }
  }
  return target;
}
