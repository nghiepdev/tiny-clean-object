// Refer https://github.com/sindresorhus/is-plain-obj
export function isPlainObject(value: unknown): value is {} {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
