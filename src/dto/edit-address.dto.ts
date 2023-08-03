import { IsNotEmpty, IsString } from "class-validator";

class EditAddressDto{
    
    @IsString()
    @IsNotEmpty()
    line1 : string;

    @IsString()
    @IsNotEmpty()
    pincode: string;
}

export default EditAddressDto;