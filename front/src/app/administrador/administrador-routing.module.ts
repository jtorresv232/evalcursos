import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from './admin/admin.component';
import { PreguntasComponent} from './preguntas/preguntas.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import {AsignacionesComponent } from './asignaciones/asignaciones.component';
import {ResultadosComponent} from './resultados/resultados.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';

const routes: Routes = [
{path: '', component: AdminComponent,
    children:[{path:'', component:PreguntasComponent}]},
{path: 'admin', component: AdminComponent,
    children:[{path:'', component:PreguntasComponent},
              {path:'preguntas', component:PreguntasComponent},
              {path:'asignaciones', component:AsignacionesComponent },
              {path:'cuestionarios', component:CuestionariosComponent },
              {path:'resultados', component:ResultadosComponent },
              {path:'crear-encuesta', component:CrearEncuestaComponent}
              ]}
            ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
export const routingComponents=[AdminComponent,PreguntasComponent,CuestionariosComponent, AsignacionesComponent, CrearEncuestaComponent]
