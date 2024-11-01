import { IsNotEmpty, IsString } from "class-validator";

export class CreateMuscleDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
