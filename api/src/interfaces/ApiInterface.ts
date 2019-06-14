interface IApiResponse {
    category?: ICategory;
    categories?: ICategory[];
    transaction?: ITransaction;
    transactions?: ITransaction[];
    success?: boolean;
    message?: string;
}

interface IApiRequest {
    category?: ICategory;
    transaction?: ITransaction;
}

interface ICategory {
    id?: number;
    name?: string;
}

interface ITransaction {
    id?: number;
    name: string;
    category: ICategory;
    amount: string | number;
    timestamp?: string;
}

export { IApiRequest, IApiResponse, ITransaction };
