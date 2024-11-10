import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { Equipment } from "src/equipments/entities/equipment.entity";
import { Muscle } from "src/muscles/entities/muscle.entity";

export class CreateExerciseDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsArray()
    readonly primaryMuscles: Muscle[];

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    readonly secondaryMuscles?: Muscle[];

    @IsOptional()
    @IsObject()
    readonly equipment?: Equipment | null;
}
