export interface Response<T> {
  data: T
}

export interface ResponseBody {
  message: string[]
  statusCode: string
}
