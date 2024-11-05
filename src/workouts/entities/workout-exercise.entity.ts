import { Exclude } from "class-transformer";
import { Exercise } from "src/exercises/entities/exercise.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Workout } from "./workout.entity";

@Entity()
export class WorkoutExercise {
    @Exclude()
    @PrimaryColumn({ name: 'workout_id' })
    workoutId: string;

    @Exclude()
    @PrimaryColumn({ name: 'exercise_id' })
    exerciseIs: string;

    @ManyToOne(() => Workout, (workout: Workout) => workout.workoutExercises)
    @JoinColumn({ name: 'workout_id' })
    workout: Workout;

    @ManyToOne(() => Exercise, (exercise: Exercise) => exercise.workoutExercises)
    @JoinColumn({ name: 'exercise_id' })
    exercise: Exercise;

    @Column()
    sets: number;

    @Column()
    reps: number;

    @Column()
    weights_kg: number;
}
