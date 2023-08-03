import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./create-address.dto";
import EditAddressDto from "./edit-address.dto";

class EditEmployeeDto{

    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @ValidateNested({
        each: true
    })
    @Type(()=>EditAddressDto)
    address: Address
}

export default EditEmployeeDto;