import { Equipment } from "src/equipments/entities/equipment.entity";
import { Muscle } from "src/muscles/entities/muscle.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ orderBy: { name: 'ASC' } })
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => Muscle, (muscle: Muscle) => muscle.primaryExercises)
    @JoinTable({
        name: 'exercise_muscle_primary',
        joinColumn: { name: 'exercise_id' },
        inverseJoinColumn: { name: 'muscle_id' }
    })
    primaryMuscles: Muscle[];

    @ManyToMany(() => Muscle, (muscle: Muscle) => muscle.secondaryExercises)
    @JoinTable({
        name: 'exercise_muscle_secondary',
        joinColumn: { name: 'exercise_id' },
        inverseJoinColumn: { name: 'muscle_id' }
    })
    secondaryMuscles: Muscle[];

    @ManyToOne(() => Equipment, (equipment: Equipment) => equipment.exercises)
    @JoinColumn({ name: 'equipment_id' })
    equipment?: Equipment | null;
}
