import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import Address from './address.entity';
import Department from './department.entity';
import AbstractEntity from './abstract.enitiy';

@Entity()
@Index(["email"], { unique: true })
export default class Employee extends AbstractEntity{
    @Column()
    name: string;

    @Column()
    email: string;

    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true
    })
    address: Address

    @ManyToOne(() => Department, (deparment) => deparment.employees, {
        onDelete: 'CASCADE'
    })
    department: Department;

    @Column()
    password: string;
}