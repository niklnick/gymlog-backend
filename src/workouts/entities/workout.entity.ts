import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutExercise } from "./workout-exercise.entity";

@Entity()
export class Workout {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @OneToMany(
        () => WorkoutExercise,
        (workoutExercise: WorkoutExercise) => workoutExercise.workout,
        { cascade: true }
    )
    workoutExercises: WorkoutExercise[];
}
