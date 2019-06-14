import Category from '@/classes/Category';
import Transaction from '@/classes/Transaction';

export interface RootState {
    categories: Category[];
    transactions: Transaction[];
    editTransactionId: null | number;
    editCategoryId: null | number;
}
