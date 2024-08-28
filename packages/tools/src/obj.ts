import lodash from 'lodash-es';

/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any */
type ObjMapCallback = (key: string, value: any) => any;

export function objMap<T extends Object>(obj: T, callback: ObjMapCallback = (k, v) => v) {
  const result: any = {};
  let changed = false;
  Object.entries(obj).forEach(([key, value]) => {
    const r = callback(key, value);
    if (r !== value) {
      changed = true;
      result[key] = r;
    } else {
      result[key] = value;
    }
  });
  return changed ? result : obj;
}

/**
 * 对象内容过滤器
 * @param obj 对象本身
 * @param callback 过滤器回调
 */
export function objFilter<T extends Object>(obj: T, callback: (key: string, value: any) => boolean) {
  const result: any = {};
  Object.entries(obj).forEach(([key, value]) => {
    const r = callback(key, value);
    if (r) {
      result[key] = value;
    }
  });
  return result;
}

export function objOmitUndefined<T extends Object>(obj: T, omitNull = true) {
  return objFilter(obj, (key, value) => {
    if (omitNull && value === null) return false;
    return value !== undefined;
  });
}

export function omit<T extends Object, K extends keyof T>(obj: T, ...args: K[]): Omit<T, K> {
  const result = { ...obj };
  args.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete result[key];
  });
  return result;
}

/**
 * 将对象中的 null 转换为 undefined
 * @param value
 */
export function convertNullToUndefined<T>(value: T): T {
  const cache = new WeakMap<any, T>();
  function convert(value: T): T {
    if (value === null) return undefined as any;
    // array
    if (Array.isArray(value)) {
      if (!cache.has(value)) {
        const newArray: any[] = [];
        cache.set(value, newArray as any);
        value.forEach((v) => {
          newArray.push(convert(v));
        });
      }
      return cache.get(value)!;
    }
    if (typeof value === 'object' && value.constructor.name === 'Object') {
      if (!cache.has(value)) {
        const newObj = {};
        cache.set(value, newObj as T);
        Object.assign(
          newObj,
          objMap(value, (_, v) => convertNullToUndefined(v)),
        );
      }
      return cache.get(value)!;
    }
    return value;
  }

  return convert(value);
}

export type AggregateKeysMapping = Record<string, string[]>;

export type AggregateOptions = {

  /** 最大递归深度，默认为 1，auto 表示完全递归，支持自定义递归深度 */
  maxDepth?: 'auto' | number;

  /** 是否剔除已经被聚合的键，默认是 */
  omitAggregatedKeys?: boolean;
};

/**
 * 对象聚合函数，通过将对象的某些属性值聚合到一个属性
 * @param obj 要聚合的对象
 * @param depth 当前聚合的深度，默认为1
 * @param mapping 聚合规则映射，指定哪些属性应该被聚合到哪个属性中，不允许待映射键和聚合映射键相同
 * @param options 配置选项
 * @returns 返回聚合后的对象
 */
function aggregate<T extends Object>(obj: T, depth: number = 1, mapping: AggregateKeysMapping = {}, options: AggregateOptions = {}): Object {
  const { maxDepth = 1, omitAggregatedKeys = true } = options;
  let result = lodash.cloneDeep(obj) as any;
  Object.entries(mapping).forEach(([key, aggregatedKeys]) => {
    // 存在同名键直接跳过
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      return;
    }
    // 存在键值为对象的情况，未达到递归最大深度设置，继续递归
    if (lodash.isPlainObject(result[key]) && (maxDepth === 'auto' || depth < maxDepth)) {
      lodash.set(result, key, aggregate(result[key], depth + 1, mapping, options));
      return;
    }
    lodash.set(result, key, lodash.pick(result, aggregatedKeys));
    // 剔除已经被聚合的键
    if (omitAggregatedKeys) {
      result = lodash.omit(result, aggregatedKeys);
    }
  });

  return result;
}

/**
 * 对象聚合函数，通过将对象的某些属性值聚合到一个属性
 * @param obj 要聚合的对象
 * @param mapping 聚合规则映射，指定哪些属性应该被聚合到哪个属性中
 * @param options 配置选项·
 * @returns 返回聚合后的对象
 */
export function aggregateObj<T extends Object>(obj: T, mapping: AggregateKeysMapping = {}, options: AggregateOptions = {}): Object {
  return aggregate(obj, 1, mapping, options);
}
