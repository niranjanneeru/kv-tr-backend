import { IsNotEmpty, IsString } from "class-validator";

class CreateAddressDto{
    
    @IsString()
    @IsNotEmpty()
    line1 : string;

    @IsString()
    @IsNotEmpty()
    pincode: string;
}

export default CreateAddressDto;