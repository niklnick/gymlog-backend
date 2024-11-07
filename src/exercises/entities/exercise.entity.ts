import { Muscle } from "src/muscles/entities/muscle.entity";
import { WorkoutExercise } from "src/workout-exercises/entities/workout-exercise.entity";
import { WorkoutLogExercise } from "src/workout-logs/entities/workout-log-exercise.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ orderBy: { name: 'ASC' } })
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Muscle, (muscle: Muscle) => muscle.exercises)
    @JoinTable({
        name: 'exercise_muscle',
        joinColumn: { name: 'exercise_id' },
        inverseJoinColumn: { name: 'muscle_id' }
    })
    muscles: Muscle[];

    @OneToMany(() => WorkoutExercise, (workoutExercise: WorkoutExercise) => workoutExercise.exercise)
    workoutExercises: WorkoutExercise[];

    @OneToMany(() => WorkoutLogExercise, (workoutLogExercise: WorkoutLogExercise) => workoutLogExercise.exercise)
    workoutLogExercises: WorkoutLogExercise[];
}
