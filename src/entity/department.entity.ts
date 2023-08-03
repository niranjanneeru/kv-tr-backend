import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./employee.entity";

@Entity()
class Department{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    descrption: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @DeleteDateColumn()
    deletedAt:Date;

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee[];
}


export default Department;