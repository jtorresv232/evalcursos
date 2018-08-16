import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../comun/http.service';
import { MyFilterPipe,MyFilterPipe2, MyFilterName, MyFilterCategory, Filters, Filtros } from '../../comun/mypipe';
import {MatSnackBar} from '@angular/material';
import 'rxjs/Rx';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Router, NavigationExtras} from '@angular/router';
import { DialogEditAsig } from '../pop-up-edit-asignacion/pop-up-edit-asignacion.component';
import {DatePipe} from '@angular/common';
import {DataService} from '../../dataservice';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {PageEvent} from '@angular/material';


@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent implements OnInit {
  public arrayAsignaciones:any=[];
  public arrayCuestionarios:any=[];
  public arrayEvaluadas:any=[];
  public filt:string="";
  public docente:any;
  public materia:any;
  public dialogRef: MatDialogRef<DialogEditAsig>;
  public aDone: boolean=false;
  public qDone: boolean=false;
  public filts=[];
  public categorias=['Materia','Programa','Facultad','Tipo de docente', 'Cuestionario']
  public nombre="";
  public text;
  public length;
  public pageSizeOptions;

  //para los chips(botones emergentes) de los filtros
  separatorKeysCodes = [ENTER, COMMA];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  /////////////////////////////////

  constructor(private _service:HttpService, public dialog: MatDialog, private data: DataService) { }

  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnInit() {
    this.pageEvent={pageIndex: 0, pageSize: 5, length: this.arrayAsignaciones.length};
    console.log(this.pageEvent);
    this.data.changeMessage('admin');
    this.length=0;
    this._service.getAsigData().map(response=>response)
    .subscribe(res=>{
      this.arrayAsignaciones=res;
      this.aDone=true;
    },err=>{
      console.log(err);
    });

    this._service.getEvaluadas().map(response=>response)
    .subscribe(res=>{
      this.arrayEvaluadas=res;
    },err=>{
      console.log(err);
    });

    this._service.getCuestionarios().map(response=>response)
    .subscribe(res=>{
      this.arrayCuestionarios=res;
      this.qDone=true;
    },err=>{
      console.log(err);
    });
  }

  public getTexto(asig){
      let fechaI=asig.fechaInicial;
      let fechaF=asig.fechaFinal;
      let cuestionario=asig.cuestionario;
      this.materia=asig.materia__nombre;
      this.docente=asig.docente__nombre;
      if(fechaI && fechaF && cuestionario){
      return ('['+asig.materia.toString()+'-'+asig.grupo.toString()+'] '+this.materia+' con: '+this.docente+' '+'['+(fechaI).toString() + ' -- ' + (fechaF).toString()+'- C:'+cuestionario +']')
    }else if(fechaI && fechaF && !cuestionario){
      return ('['+asig.materia.toString()+'-'+asig.grupo.toString()+'] '+this.materia+' con: '+this.docente+' '+'['+(fechaI).toString() + ' -- ' + (fechaF).toString()+']')
    }else if(cuestionario && !fechaI && !fechaF){
      return ('['+asig.materia.toString()+'-'+asig.grupo.toString()+'] '+this.materia+' con: '+this.docente+'-C:'+cuestionario);
    }else{
      return ('['+asig.materia.toString()+'-'+asig.grupo.toString()+'] '+this.materia+' con: '+this.docente);
    }
  }

  public getStyle(asignacion){
    let date= new Date();
    let asigDateF=new Date(asignacion.fechaFinal);
    let asigDateI=new Date(asignacion.fechaInicial);
    if(date>asigDateF){
      return 'evaluada';
    }else{
      return 'noevaluada';
    }
  }

  public editarTodos(asignaciones){
    let asigs=asignaciones;
    asigs= new Filtros().transform(asignaciones,this.filts,this.arrayCuestionarios); //filtramos dentro del componente para editar solo los que aparecen en el filtro
    console.log(asigs);
    this.dialogRef = this.dialog.open(DialogEditAsig,{
      data:this.arrayCuestionarios
    });
    this.dialogRef.afterClosed().subscribe((result)=>{
      console.log(result);
      for(let asig of asigs){
        if(result){
          if(result.fechaFinal && result.fechaInicial && result.cuestionario){
            let fechaI=new DatePipe('en-US').transform(result.fechaInicial, 'yyyy-MM-dd');
            let fechaF=new DatePipe('en-US').transform(result.fechaFinal, 'yyyy-MM-dd');
            let datos={
              fechaInicial:fechaI,
              fechaFinal:fechaF,
              cuestionario:result.cuestionario,
              id:asig.id,
              semestre:asig.semestre,
              materia:asig.materia,
              grupo:asig.grupo,
              docente:asig.docente
            };
            console.log(datos);
          this._service.editAsignacion(datos).subscribe(data => {
              asig.fechaFinal=data['fechaFinal'];
              asig.fechaInicial=data['fechaInicial'];
              asig.cuestionario=data['cuestionario'];
              }, err => {
                console.log(err);
              });
          }else if(result.fechaFinal && result.fechaInicial && !result.cuestionario){
            let fechaI=new DatePipe('en-US').transform(result.fechaInicial, 'yyyy-MM-dd');
            let fechaF=new DatePipe('en-US').transform(result.fechaFinal, 'yyyy-MM-dd');
            let datos={
              fechaInicial:fechaI,
              fechaFinal:fechaF,
              id:asig.id,
              semestre:asig.semestre,
              materia:asig.materia,
              grupo:asig.grupo,
              docente:asig.docente,
              cuestionario:result.cuestionario
            };
            console.log(datos);
          this._service.editAsignacion(datos).subscribe(data => {
              asig.fechaFinal=data['fechaFinal'];
              asig.fechaInicial=data['fechaInicial'];
              }, err => {
                console.log(err);
              });
          }else if(!result.fechaFinal && !result.fechaInicial && result.cuestionario){
            let datos={
              fechaInicial:asig.fechaInicial,
              fechaFinal:asig.fechaFinal,
              cuestionario:result.cuestionario,
              id:asig.id,
              semestre:asig.semestre,
              materia:asig.materia,
              grupo:asig.grupo,
              docente:asig.docente
            };
            console.log(datos);
          this._service.editAsignacion(datos).subscribe(data => {
              asig.cuestionario=data['cuestionario'];
              }, err => {
                console.log(err);
              });
          }
        }
      }
    });

  }

  public openDialog(asig){
    this.dialogRef = this.dialog.open(DialogEditAsig,{
      data: this.arrayCuestionarios
    });
    this.dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        console.log(result);
        if(result.fechaFinal && result.fechaInicial && result.cuestionario){
          let fechaI=new DatePipe('en-US').transform(result.fechaInicial, 'yyyy-MM-dd');
          let fechaF=new DatePipe('en-US').transform(result.fechaFinal, 'yyyy-MM-dd');
          let datos={
            fechaInicial:fechaI,
            fechaFinal:fechaF,
            cuestionario:result.cuestionario,
            id:asig.id,
            semestre:asig.semestre,
            materia:asig.materia,
            grupo:asig.grupo,
            docente:asig.docente
          };
          console.log(datos);
        this._service.editAsignacion(datos).subscribe(data => {
            asig.fechaFinal=data['fechaFinal'];
            asig.fechaInicial=data['fechaInicial'];
            asig.cuestionario=data['cuestionario'];
            }, err => {
              console.log(err);
            });
        }else if(result.fechaFinal && result.fechaInicial && !result.cuestionario){
          let fechaI=new DatePipe('en-US').transform(result.fechaInicial, 'yyyy-MM-dd');
          let fechaF=new DatePipe('en-US').transform(result.fechaFinal, 'yyyy-MM-dd');
          let datos={
            fechaInicial:fechaI,
            fechaFinal:fechaF,
            id:asig.id,
            semestre:asig.semestre,
            materia:asig.materia,
            grupo:asig.grupo,
            docente:asig.docente,
            cuestionario:result.cuestionario
          };
          console.log(datos);
        this._service.editAsignacion(datos).subscribe(data => {
            asig.fechaFinal=data['fechaFinal'];
            asig.fechaInicial=data['fechaInicial'];
            }, err => {
              console.log(err);
            });
        }else if(!result.fechaFinal && !result.fechaInicial && result.cuestionario){
          let fechaI=new DatePipe('en-US').transform(result.fechaInicial, 'yyyy-MM-dd');
          let fechaF=new DatePipe('en-US').transform(result.fechaFinal, 'yyyy-MM-dd');
          let datos={
            fechaInicial:null,
            fechaFinal:null,
            cuestionario:result.cuestionario,
            id:asig.id,
            semestre:asig.semestre,
            materia:asig.materia,
            grupo:asig.grupo,
            docente:asig.docente
          };
          console.log(datos);
        this._service.editAsignacion(datos).subscribe(data => {
            asig.cuestionario=data['cuestionario'];
            asig.fechaFinal=data['fechaFinal'];
            asig.fechaInicial=data['fechaInicial'];
            }, err => {
              console.log(err);
            });
        }else if(!result.fechaFinal && !result.fechaInicial && !result.cuestionario){
          let fechaI=new DatePipe('en-US').transform(result.fechaInicial, 'yyyy-MM-dd');
          let fechaF=new DatePipe('en-US').transform(result.fechaFinal, 'yyyy-MM-dd');
          let datos={
            fechaInicial:null,
            fechaFinal:null,
            cuestionario:asig.cuestionario,
            id:asig.id,
            semestre:asig.semestre,
            materia:asig.materia,
            grupo:asig.grupo,
            docente:asig.docente
          };
          console.log(datos);
        this._service.editAsignacion(datos).subscribe(data => {
            asig.fechaFinal=data['fechaFinal'];
            asig.fechaInicial=data['fechaInicial'];
            }, err => {
              console.log(err);
            });
        }
      }
    });
  }


  add(): void {

    let obj={
      nombre:this.nombre.toString(),
      text:this.text.toString(),
      indicador:this.nombre.toString()[0]
    }

    this.filts.push(obj);
  }

  remove(filt: any): void {
    let index = this.filts.indexOf(filt);

    if (index >= 0) {
      this.filts.splice(index, 1);
    }
  }//filter thing


  setLength(len:any){
    this.length=len;
  }

}
