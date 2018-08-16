import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../comun/http.service';
import { MyFilterPipe,MyFilterPipe2, MyFilterName } from '../../comun/mypipe';
import {MatSnackBar} from '@angular/material';
import 'rxjs/Rx';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Router, NavigationExtras} from '@angular/router';
import {DocenteService} from '../../services/docente.service';

@Component({
  selector: 'app-evaldocente',
  templateUrl: './evaldocente.component.html',
  styleUrls: ['./evaldocente.component.css']
})
export class EvaldocenteComponent implements OnInit {

  public arrayAsignaciones:any=[];
  public arrayMaterias: any=[];
  public arrayGrupos:any=[];
  public arrayDocentes:any=[];
  public arrayEvaluadas:any=[];
  public filt:string="";
  public formu:string="";
  public cedula=1026150499;
  public docente:any;
  public materia:any;
  public dDone: boolean=false;
  public mDone: boolean=false;

  constructor(private _service: HttpService, public snackBar: MatSnackBar, private _router:Router, private teacherService:DocenteService) { }

  ngOnInit() {
    this._service.getAsigxDocente(this.teacherService.teacher.cedula).map(response=>response)
    .subscribe(res=>{
      this.arrayAsignaciones=res;
    },err=>{
      console.log(err);
    });

    this._service.getEvaluadas().map(response=>response)
    .subscribe(res=>{
      this.arrayEvaluadas=res;
    },err=>{
      console.log(err);
    });

    this._service.getDocentes().map(response=>response)
    .subscribe(res=>{
      this.arrayDocentes=res;
      this.dDone=true;
    },err=>{
      console.log(err);
    });

    this._service.getMaterias().map(response=>response)
    .subscribe(res=>{
      this.arrayMaterias=res;
      this.mDone=true;
    },err=>{
      console.log(err);
    });

  }

  public display(texto:string){
    console.log(texto);
  }

  public getTexto(codigo,grupo,cedula){



      this.materia=this.arrayMaterias.find(x => x.codigo == codigo);
      this.docente=this.arrayDocentes.find(x => x.cedula == cedula);


      return ('['+this.materia.codigo.toString()+'-'+grupo.toString()+'] '+this.materia.nombre+' con: '+this.docente.nombre);
  }

  public getStyle(asignacion){

    if(this.arrayEvaluadas.find(x => x.asignacion == asignacion).indicador=='s'){
      return 'evaluada';
    }else{
      return 'noevaluada';
    }
  }

  public validarFecha(asignacion){
    let date= new Date();
    let fechaFinal=new Date(asignacion.fechaFinal);
    let fechaInicial=new Date(asignacion.fechaInicial);
    if(date>=fechaInicial && date <= fechaFinal){
      return true;
    }else{
      return false;
    }
  }

  reDireccionar(asignacion,cuestionario){
    let navigationExtras:NavigationExtras={
      queryParams:{
        "asignacion":asignacion,
        "cuestionario":cuestionario
      }
    }
    this._router.navigate(['/evaluar/formulario'], navigationExtras);
  }

}
