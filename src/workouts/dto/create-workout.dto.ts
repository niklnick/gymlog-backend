import { IsNotEmpty, IsString } from "class-validator";

export class CreateWorkoutDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
