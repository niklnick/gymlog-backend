import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';

const routes: Routes = [
    { path: 'exercises', module: ExercisesModule },
    { path: 'muscles', module: MusclesModule }
];

@Module({
    imports: [
        RouterModule.register(routes),
        ExercisesModule,
        MusclesModule
    ]
})
export class AppRoutingModule { }
