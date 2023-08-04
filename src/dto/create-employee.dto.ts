import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString, ValidateIf, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";
import { Role } from "../utils/role.enum";

class CreateEmployeeDto{
    
    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @ValidateNested({
        each: true
    })
    @Type(()=>CreateAddressDto)
    address: Address;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role : Role;
}

export default CreateEmployeeDto;