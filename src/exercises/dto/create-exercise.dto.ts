import { IsNotEmpty, IsString } from "class-validator";

export class CreateExerciseDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
