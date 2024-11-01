import { Exercise } from "src/exercises/entities/exercise.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Muscle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Exercise, (exercise: Exercise) => exercise.muscles)
    exercises: Exercise[];
}
