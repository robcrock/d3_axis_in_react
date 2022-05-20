// See Record documentation here https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
export type DataRecord = Record<string, any>;

type ValueOf<T> = T[keyof T];
export type AccessorType = (d: DataRecord, i?: number) => ValueOf<DataRecord>;

export type Dimensions = {
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  innerWidth: number;
  innerHeight: number;
};
