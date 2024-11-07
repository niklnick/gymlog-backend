import { IsArray, IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { Workout } from "src/workouts/entities/workout.entity";
import { WorkoutLogExercise } from "../entities/workout-log-exercise.entity";

export class CreateWorkoutLogDto {
    @IsNotEmptyObject({ nullable: false })
    workout: Workout;

    @IsNotEmpty()
    @IsArray()
    workoutLogExercises: WorkoutLogExercise[];
}
