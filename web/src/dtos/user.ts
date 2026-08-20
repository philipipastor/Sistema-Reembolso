export type UserApiRole = "employee" | "manager"


export type UserApiResponse = {
    token: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: UserApiRole
    }
}