import { IsArray, IsNotEmptyObject } from "class-validator";
import { Exercise } from "src/exercises/entities/exercise.entity";
import { Set } from "../entities/workout-exercise.entity";

export class CreateWorkoutExerciseDto {
    @IsNotEmptyObject({ nullable: false })
    readonly exercise: Exercise;

    @IsArray()
    sets: Set[];
}
