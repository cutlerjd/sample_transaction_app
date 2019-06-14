import {Category, ICategory} from './Category';
import store from '../store';

interface ITransaction {
    id?: number | null;
    name?: string | null;
    category?: ICategory | null;
    amount?: number | null;
    timestamp?: Date | null;
}

class Transaction implements ITransaction {
    public id?: number | null;
    public name?: string | null;
    public category?: Category | null;
    public amount?: number | null;
    public timestamp?: Date | null;

    constructor(c: ITransaction = {}) {
        this.id = c.id !== undefined ? c.id : null;
        this.name = c.name !== undefined ? c.name : null;
        this.category = new Category({id: null});
        if (c.category !== undefined && c.category !== null &&
            c.category.id !== undefined && c.category.id !== null) {
            this.category = this.setCategory(c.category.id);
        }
        this.amount = c.amount !== undefined ? c.amount : null;
        this.timestamp = c.timestamp !== undefined && c.timestamp !== null ?
            new Date(c.timestamp as unknown as number) : null;
    }

    public setCategory(val: number | null): Category | null {
        return this.category = store.getters['getCategoryById'](val);
    }

    public get categoryId(): number | null {
        if (this.category !== undefined && this.category !== null) {
            return this.category.id !== undefined ? this.category.id : null;
        } else {
            return null;
        }
    }

    public set categoryId(val: number | null) {
        this.category = store.getters['getCategoryById'](val);
    }
}

export default Transaction;
export { Transaction, ITransaction };
