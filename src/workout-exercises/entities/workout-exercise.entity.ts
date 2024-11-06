import { Exercise } from "src/exercises/entities/exercise.entity";
import { Workout } from "src/workouts/entities/workout.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WorkoutExercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(
        () => Workout,
        (workout: Workout) => workout.workoutExercises,
        { nullable: false }
    )
    @JoinColumn({ name: 'workout_id' })
    workout: Workout;

    @ManyToOne(
        () => Exercise,
        (exercise: Exercise) => exercise.workoutExercises,
        { nullable: false }
    )
    @JoinColumn({ name: 'exercise_id' })
    exercise: Exercise;
}
