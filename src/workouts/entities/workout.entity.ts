import { Exercise } from "src/exercises/entities/exercise.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Workout {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Exercise, (exercise: Exercise) => exercise.workouts)
    @JoinTable({
        name: 'workout_exercise',
        joinColumn: { name: 'workout_id' },
        inverseJoinColumn: { name: 'exercise_id' }
    })
    exercises: Exercise[];
}
