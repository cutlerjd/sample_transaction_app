import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Category from "./Category";

@Entity()
class Transaction {
    @PrimaryGeneratedColumn()
    public id?: number;
    @Column()
    public name: string;
    @ManyToOne((type) => Category)
    public category: Category;
    @Column("decimal")
    public amount: number;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public timestamp?: string;

    constructor(category: Category, name: string, amount: number) {
        this.name = name;
        this.category = category;
        this.amount = amount;
    }
}

export default Transaction;
