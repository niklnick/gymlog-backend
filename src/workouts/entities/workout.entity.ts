import { WorkoutExercise } from "src/workout-exercises/entities/workout-exercise.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ orderBy: { name: 'ASC' } })
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
