import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";

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
}

export default CreateEmployeeDto;