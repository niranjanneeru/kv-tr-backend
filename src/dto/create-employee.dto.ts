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
    @IsPositive()
    age: number;

    @IsNotEmpty()
    @ValidateNested({
        each: true
    })
    @Type(()=>CreateAddressDto)
    address: Address
}

export default CreateEmployeeDto;