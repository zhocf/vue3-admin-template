/**
 * 深层递归所有属性为可选
 */
type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;
