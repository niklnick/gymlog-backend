import { WorkoutExercise } from "src/workout-exercises/entities/workout-exercise.entity";
import { WorkoutLog } from "src/workout-logs/entities/workout-log.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ orderBy: { name: 'ASC' } })
export class Workout {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => WorkoutExercise, (workoutExercise: WorkoutExercise) => workoutExercise.workout)
    workoutExercises: WorkoutExercise[];

    @OneToMany(() => WorkoutLog, (workoutLog: WorkoutLog) => workoutLog.workout)
    logs: WorkoutLog[];
}
