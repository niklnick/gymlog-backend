import { Exercise } from "src/exercises/entities/exercise.entity";
import { Set } from "src/workout-exercises/entities/workout-exercise.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { WorkoutLog } from "./workout-log.entity";

@Entity({ orderBy: { position: 'ASC' } })
export class WorkoutLogExercise {
    @PrimaryColumn({ name: 'workout_log_id' })
    workoutLogId: string;

    @PrimaryColumn({ name: 'exercise_id' })
    exerciseId: string;

    @Column({ generated: 'increment' })
    position: number;

    @Column('json')
    sets: Set[];

    @ManyToOne(() => WorkoutLog, (workoutLog: WorkoutLog) => workoutLog.workoutLogExercises, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'workout_log_id' })
    workoutLog: WorkoutLog;

    @ManyToOne(() => Exercise, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exercise_id' })
    exercise: Exercise;
}
