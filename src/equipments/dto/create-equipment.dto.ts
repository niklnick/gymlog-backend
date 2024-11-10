import { IsNotEmpty, IsString } from "class-validator";

export class CreateEquipmentDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
