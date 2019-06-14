import {ICategory} from '@/classes/Category';
import {ITransaction} from '@/classes/Transaction';

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

export { IApiRequest, IApiResponse };
