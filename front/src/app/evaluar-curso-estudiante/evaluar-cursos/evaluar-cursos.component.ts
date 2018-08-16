import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../comun/http.service';
import { MyFilterPipe,MyFilterPipe2, MyFilterName } from '../../comun/mypipe';
import {MatSnackBar} from '@angular/material';
import {Dialog} from '../popup-encuesta/popup-encuesta.component';
import 'rxjs/Rx';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Router, NavigationExtras} from '@angular/router';
import {EstudianteService} from '../../services/estudiante.service';



@Component({
  selector: 'app-evaluar-cursos',
  templateUrl: './evaluar-cursos.component.html',
  styleUrls: ['./evaluar-cursos.component.css']
})
export class EvaluarCursosComponent implements OnInit {


  public dialogRef: MatDialogRef<Dialog>;
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

  constructor(private _service: HttpService, public snackBar: MatSnackBar, public dialog: MatDialog, private _router:Router, private studentService:EstudianteService) { }

  ngOnInit() {

    /*this._service.getAsignaciones().map(response=>response)
    .subscribe(res=>{
      this.arrayAsignaciones=res;
    },err=>{
      console.log(err);
    });*/

    this._service.getAsigxEstudiante(this.studentService.student.cedula).map(response=>response)
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
    if(date>=fechaInicial && date <= fechaFinal && this.getStyle(asignacion.id)!='evaluada'){
      return true;
    }else{
      return false;
    }
  }

  reDireccionar(asignacion,cuestionario){
    let evaluada=this.arrayEvaluadas.find(x => x.asignacion == asignacion.id).codigo;
    console.log(evaluada);
    let navigationExtras:NavigationExtras={
      queryParams:{
        "asignacion":JSON.stringify(asignacion),
        "cuestionario":cuestionario,
        "evaluada":evaluada
      }
    }
    this._router.navigate(['/evaluar/formulario'], navigationExtras);
  }


  /*public aMateria(){
    if(this.materiaSelected>0){
    this.opcion="materia";
    this.grupoSelected=0;
    this.profesorSelected=0;
    this.materiaSelected=0;
  }
  }

  public validarAGrupo(){
    if(this.materiaSelected==0){
      this.snackBar.open('Debe seleccionar una materia primero','', {
      duration: 1000});
    }
  }

  public validarAProfesor(){
    if(this.grupoSelected==0){
      this.snackBar.open('Debe seleccionar una materia y un grupo primero','', {
      duration: 1000});
    }
  }

  public validarAFormulario(){
    if(this.formu==""){
      this.snackBar.open('Debe seleccionar una materia, un grupo y un profesor primero','', {
      duration: 1000});
    }
  }


  public aGrupo(){
    if(this.grupoSelected>0){
    this.opcion="grupo";
    this.profesorSelected=0;
    this.grupoSelected=0;
    this.formu="";
  }
  console.log(this.arrayGrupos);
  }

  public aProfesor(){
    if(this.grupoSelected>0){
    this.opcion="profesor";
    this.profesorSelected=0;
    this.formu="";
  }
  console.log(this.arrayGrupos);
  }


  public validarForm(formul){
    if(this.formu=='Formulario Tabla'){
      this.opcion='pregunta'
    }else if(this.formu=='Formulario Pop-up'){
      this.openDialog();
    }
  }*/

  public openDialog(){
    this.dialogRef = this.dialog.open(Dialog);
    this.dialogRef.afterClosed().subscribe((result)=>{
      console.log(result);
    });
  }

}
