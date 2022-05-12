export interface Options {
  /** @default false */
  deep?: boolean;

  /** @default false */
  skipNull?: boolean;

  /** @default true */
  emptyStrings?: boolean;

  /** @default true */
  emptyInvalidNumbers?: boolean;

  /** @default false */
  emptyArrays?: boolean;

  /** @default false */
  emptyObjects?: boolean;
}
