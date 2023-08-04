import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./employee.entity";
import AbstractEntity from "./abstract.enitiy";

@Entity()
class Address extends AbstractEntity{
    @Column()
    line1: string;

    @Column()
    pincode: string;

    @OneToOne(() => Employee, (employee) => employee.address)
    @JoinColumn()
    employee: Employee
}


export default Address;