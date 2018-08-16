import { NgModule, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {ComunModule} from '../comun/comun.module';
import { AdministradorRoutingModule, routingComponents } from './administrador-routing.module';
import { AdminComponent } from './admin/admin.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { AsignacionesComponent } from './asignaciones/asignaciones.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { DialogAddP } from './pop-up-add-pregunta/pop-up-add-pregunta.component';
import { DialogEditAsig } from './pop-up-edit-asignacion/pop-up-edit-asignacion.component';
import { DialogAddC } from './pop-up-add-cuestionario/pop-up-add-cuestionario.component';
import { ResultadosComponent } from './resultados/resultados.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { CrearEncuestaComponent } from './crear-encuesta/crear-encuesta.component';


@NgModule({
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    BrowserModule,
    ComunModule
  ],
  declarations: [AdminComponent, PreguntasComponent,
     AsignacionesComponent, routingComponents, CuestionariosComponent,
     DialogAddP,
     DialogEditAsig,
     DialogAddC,
     ResultadosComponent,
     OpcionesComponent,
     CrearEncuestaComponent
   ],
  schemas: [ NO_ERRORS_SCHEMA ],
  entryComponents:[DialogAddP, DialogEditAsig, DialogAddC, OpcionesComponent]

})
export class AdministradorModule { }
