// See Record documentation here https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
// Because we don't know the specific keys, we'll use an index signature here https://dmitripavlutin.com/typescript-index-signatures/
export type DataRecord = { [key: string]: any };

type ValueOf<T> = T[keyof T];
export type AccessorFn = (d: DataRecord, i?: number) => ValueOf<DataRecord>;

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
