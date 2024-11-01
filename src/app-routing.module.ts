import { Module } from "@nestjs/common";
import { RouterModule, Routes } from "@nestjs/core";
import { MusclesModule } from './muscles/muscles.module';

const routes: Routes = [
    { path: 'muscles', module: MusclesModule }
];

@Module({
    imports: [
        RouterModule.register(routes),
        MusclesModule
    ]
})
export class AppRoutingModule { }
