import { IsNotEmptyObject } from "class-validator";
import { Exercise } from "src/exercises/entities/exercise.entity";

export class CreateWorkoutExerciseDto {
    @IsNotEmptyObject({ nullable: false })
    readonly exercise: Exercise;
}
