import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { StatsRoutingModule, routingComponents} from './routing.module';
import { ComunModule } from './comun/comun.module';
import {EvaluarCursoEstudianteRoutingModule} from './evaluar-curso-estudiante/evaluar-curso-estudiante-routing.module';
import {EvaluarCursoEstudianteModule} from './evaluar-curso-estudiante/evaluar-curso-estudiante.module';
import {LoginModule} from './login/login.module';
import {LoginRoutingModule} from './login/login-routing.module';
import {AdministradorModule} from './administrador/administrador.module';
import {AdministradorRoutingModule } from './administrador/administrador-routing.module';
import {DocenteModule} from './docente/docente.module';
import {DocenteRoutingModule} from './docente/docente-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    LoginModule,
    LoginRoutingModule,
    AdministradorModule,
    AdministradorRoutingModule,
    EvaluarCursoEstudianteModule,
    EvaluarCursoEstudianteRoutingModule,
    DocenteModule,
    DocenteRoutingModule,
    StatsRoutingModule,
    ComunModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
