import { CategoriesApiEnum } from "./categories"

export type RefundApiResponse = {
    id: string,
    userId: string,
    name: string,
    category: CategoriesApiEnum,
    amount: number,
    filename: string,
    user: {
        name: string
    }
}

export type RefundsPaginationApiResponse = {
    refunds: RefundApiResponse[],
    pagination: {
        page: number,
        perPage: number,
        totalRecords: number,
        totalPages: number
    }
}

