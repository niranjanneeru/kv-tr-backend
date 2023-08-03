import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Address from './address.entity';
import Department from './department.entity';

@Entity()
export default class Employee {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true
    })
    address: Address

    @ManyToOne(() => Department, (deparment) => deparment.employees, {
        onDelete: 'CASCADE'
    })
    department: Department;
}