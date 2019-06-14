import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
class Category {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public name: string;

    constructor(id?: number, name?: string) {
        this.id = id !== undefined ? id : -1;
        this.name = name !== undefined ? name : "";
    }
}

export default Category;
