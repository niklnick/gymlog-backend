import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { WorkoutsModule } from './workouts/workouts.module';

const routes: Routes = [
    { path: 'exercises', module: ExercisesModule },
    { path: 'muscles', module: MusclesModule },
    { path: 'workouts', module: WorkoutsModule }
];

@Module({
    imports: [
        RouterModule.register(routes),
        ExercisesModule,
        MusclesModule,
        WorkoutsModule
    ]
})
export class AppRoutingModule { }
