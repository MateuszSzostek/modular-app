export type Response<T> = {
  status: number;
  data: T | { errors: { messageCode: string }; param?: string };
};
