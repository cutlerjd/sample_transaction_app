interface ICategory {
    id?: number | null;
    name?: string | null;
}

class Category implements ICategory {
    public id?: number | null;
    public name?: string | null;

    constructor(c: ICategory = {}) {
        this.id = c.id !== undefined ? c.id : null;
        this.name = c.name !== undefined ? c.name : null;
    }
}

export default Category;
export { Category, ICategory };
