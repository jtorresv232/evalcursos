import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
	{path: '', redirectTo:'/login', pathMatch:'full'},
	{path: 'evaluar', redirectTo:'/evaluar', pathMatch:'full'},
	{path: 'admin', redirectTo:'/admin', pathMatch:'full'},
	{path: 'docenteEvaluar', redirectTo:'/docenteEvaluar', pathMatch:'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class StatsRoutingModule {}
export const routingComponents =[
]
