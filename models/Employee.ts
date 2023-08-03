import {Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'

@Entity()
export default class Employee{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column()
    email: string;
    
    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;
}