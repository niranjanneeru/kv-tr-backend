import { IsNotEmpty, IsString } from "class-validator";

class EditAddressDto{

    // TODO
    
    @IsString()
    @IsNotEmpty()
    line1 : string;

    @IsString()
    @IsNotEmpty()
    pincode: string;
}

export default EditAddressDto;