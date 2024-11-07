import { Exercise } from "src/exercises/entities/exercise.entity";
import { Workout } from "src/workouts/entities/workout.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

export interface Set {
    readonly reps: number;
    readonly weightsKg: number;
}

@Entity()
export class WorkoutExercise {
    @PrimaryColumn({ name: 'workout_id' })
    workoutId: string;

    @PrimaryColumn({ name: 'exercise_id' })
    exerciseId: string;

    @ManyToOne(() => Workout, (workout: Workout) => workout.workoutExercises)
    @JoinColumn({ name: 'workout_id' })
    workout: Workout;

    @ManyToOne(() => Exercise, (exercise: Exercise) => exercise.workoutExercises)
    @JoinColumn({ name: 'exercise_id' })
    exercise: Exercise;

    @Column('jsonb')
    sets: Set[];
}
