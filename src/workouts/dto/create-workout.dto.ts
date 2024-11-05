import { IsNotEmpty, IsString } from "class-validator";
import { WorkoutExercise } from "../entities/workout-exercise.entity";

export class CreateWorkoutDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    readonly workoutExercises: WorkoutExercise[];
}
