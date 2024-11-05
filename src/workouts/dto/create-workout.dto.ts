import { IsNotEmpty, IsString } from "class-validator";
import { Exercise } from "src/exercises/entities/exercise.entity";

export class CreateWorkoutDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    readonly exercises: Exercise[];
}
