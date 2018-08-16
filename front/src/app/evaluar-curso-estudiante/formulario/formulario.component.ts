import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../comun/http.service';
import { MyFilterPipe,MyFilterPipe2, MyFilterName, MyFilterCategory } from '../../comun/mypipe';
import {MatSnackBar} from '@angular/material';
import {Dialog} from '../popup-encuesta/popup-encuesta.component';
import 'rxjs/Rx';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router,ActivatedRoute} from '@angular/router';
import {EstudianteService} from '../../services/estudiante.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public asignacion:any;
  public preguntas:any=[];
  public displayPreguntas:any=['pregunta','1']
  public categorias:any=[];
  public pDone:boolean=false;
  public cDone:boolean=false;
  public calificaciones:any=[1,2,3,4,5];
  public respuestas=[];
  public respuesta_seleccionada:any;
  public calis:any=[];
  public cuestionario:any;
  public evaluada:any;
  public mispreguntas:any=[];


  constructor(private _service: HttpService, private _route:ActivatedRoute,private _router:Router, private studentService:EstudianteService) {}

  ngOnInit() {
    this._route.queryParams.subscribe(params=>{
      this.asignacion=JSON.parse(params['asignacion']);
      let cuestionario={"cuestionario":params['cuestionario']}
      this.cuestionario=cuestionario;
      this.evaluada=params['evaluada'];
      this._service.getPxC(cuestionario).subscribe(data => {

            this.preguntas=data;
            this.pDone=true;
            console.log(this.preguntas);
          }, err => {
          });
    });

    this._service.getCalificaciones().subscribe(data => {

          this.calis=data;
          console.log(this.calis);
        }, err => {
        });

    this._service.getCategorias().map(response=>response)
    .subscribe(res=>{
      this.categorias=res;
      this.cDone=true;
      console.log(this.categorias)
    },err=>{
      console.log(err);
    });
      }

  evaluar(){
    let encuesta;
    console.log("mi valor es "+ this.asignacion['materia']);
    let datos={
      evaluacion:1,
      semestre:20181,
      materia:this.asignacion.materia,
      grupo:this.asignacion.grupo,
      cedula:this.asignacion.docente,
      programa:this.studentService.student.programa
    }
    this._service.getEncuesta(datos).map(response=>response)
    .subscribe(res=>{
      encuesta=res[0];
      console.log(encuesta);
      //cambiar a evaluada
      let editada={};
      editada['codigo']=parseInt(this.evaluada);
      editada['indicador']='s';
      editada['codevaluacion']=encuesta.evaluacion;
      editada['asignacion']=this.asignacion.id;
      editada['estudiante']=this.studentService.student.cedula;
      console.log(editada);
      this._service.editEvaluadas(editada).map(response=>response)
      .subscribe(res=>{
        console.log(res);
      });
      //fin cambiar a evaluada
      let data={
        preguntas:this.mispreguntas,
        cuestionario:parseInt(this.cuestionario.cuestionario),
        calificaciones:this.respuestas,
        semestre:20181,
        programa:this.studentService.student.programa,
        encuesta:encuesta.codigo
      };
      console.log(data);
      this._service.setEncuesta(data).map(response=>response)
      .subscribe(resp=>{
        console.log(resp);
      });
    },err=>{
      console.log(err);
    });



    this._router.navigate(['/evaluar']);
  }

  seleccionada(preg,res){
    let respuesta={};
    let respuesta_name="calificacion"+(this.respuestas.length+1).toString();
    respuesta[respuesta_name]=res;
    this.respuestas.push(respuesta);
    console.log(this.respuestas);
    let pregunta_name="pregunta"+(this.mispreguntas.length+1).toString();
    let pregunta={};
    pregunta[pregunta_name]=preg.codigo;
    this.mispreguntas.push(pregunta);
    console.log(this.mispreguntas);
  }

  }
