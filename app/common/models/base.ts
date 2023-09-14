export interface Page<T> {
  resultData: T[];
  totalNum: number;
  pageNo: number;
  pageSize: number;
}

export interface PageReq {
  current?: number;
  pageNo?: number;
  pageSize?: number;
}