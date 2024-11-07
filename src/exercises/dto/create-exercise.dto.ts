import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Muscle } from "src/muscles/entities/muscle.entity";

export class CreateExerciseDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsArray()
    readonly muscles: Muscle[];
}
