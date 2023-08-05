import { Column, Entity, Index, ManyToOne, OneToOne } from 'typeorm'
import Address from './address.entity';
import Department from './department.entity';
import AbstractEntity from './abstract.enitiy';
import { Role } from '../utils/role.enum';

@Entity()
@Index(["email"], { unique: true })
export default class Employee extends AbstractEntity {
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

    @Column({ default: Role.DEVELOPER })
    role: Role;

    @Column()
    joiningDate: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    experience: number
}