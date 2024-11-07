import { Workout } from "src/workouts/entities/workout.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkoutLogExercise } from "./workout-log-exercise.entity";

@Entity({ orderBy: { createDate: 'ASC' } })
export class WorkoutLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ name: 'create_date' })
    createDate: Date;

    @ManyToOne(() => Workout, (workout: Workout) => workout.logs)
    @JoinColumn({ name: 'workout_id' })
    workout: Workout;

    @OneToMany(
        () => WorkoutLogExercise,
        (workoutLogExercise: WorkoutLogExercise) => workoutLogExercise.workoutLog,
        { cascade: ['insert'] }
    )
    workoutLogExercises: WorkoutLogExercise[];
}
