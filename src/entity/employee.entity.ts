import {Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import Address from './address.entity';

@Entity()
export default class Employee{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column({nullable : true})
    age: number;

    @Column()
    email: string;
    
    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;

    @OneToOne(() => Address, (address) => address.employee, {
        cascade: true
    })
    address: Address
}