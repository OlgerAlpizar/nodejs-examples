export default class PaginationResults<T> {
  totalRecords: number
  totalPages: number
  pageSize: number
  pageNumber: number
  records: T[]

  constructor(totalRecords: number, pageSize: number, pageNumber: number, records: T[]) {
    this.totalRecords = totalRecords
    this.pageSize = pageSize
    this.pageNumber = pageNumber
    this.records = records
    this.totalPages = Math.ceil(totalRecords / pageSize)
  }
}
