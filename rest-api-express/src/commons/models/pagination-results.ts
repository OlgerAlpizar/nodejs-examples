export interface PaginationResults<T> {
    totalRecords: number
    totalPages: number
    pageSize: number
    pageNumber: number
    records: T[]
}