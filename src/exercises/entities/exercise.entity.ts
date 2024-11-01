import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;
}
