import { IsNotEmpty, IsString } from "class-validator";

class SetAddressDto{
    
    @IsString()
    @IsNotEmpty()
    line1 : string;

    @IsString()
    @IsNotEmpty()
    pincode: string;
}

export default SetAddressDto;