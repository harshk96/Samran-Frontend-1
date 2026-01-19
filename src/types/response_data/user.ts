export interface ListUser {
    name: string;
    email: string;
    userType: number;
    phoneCountry: string;
    phone: string;
    isActive: boolean;
    _createdAt: string;
    _id: string;
}

export interface ListUserParams {
    page: number;
    limit: number;
    sortKey: string;
    sortOrder: number;
    needCount: boolean;
    searchTerm?: string;
    userType?: number | undefined;
}