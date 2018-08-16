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
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  public arrayAsignaciones:any=[];
  public filt:string="";
  public docente:any;
  public materia:any;
  public dialogRef: MatDialogRef<DialogEditAsig>;
  public aDone: boolean=false;
  public filts=[];
  public categorias=['Materia','Programa','Facultad','Tipo de docente', 'Cuestionario']
  public nombre="";
  public text;
  public length;
  public pageSizeOptions;
  public totalPreguntas:any=[];
  public categorias_preguntas:any=[];
  public mostrar: boolean=false;
  public mypregunta:any="";
  public categoria:any="";

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

    this._service.getCategorias().map(response=>response)
    .subscribe(res=>{
      this.categorias_preguntas=res;
    },err=>{
      console.log(err);
    });

    this._service.getPreguntas().map(response=>response)
    .subscribe(res=>{
      this.totalPreguntas=res;
    },err=>{
      console.log(err);
    });
  }

  public getTexto(asig){

      this.materia=asig.materia__nombre;
      this.docente=asig.docente__nombre;
      return ('['+asig.materia.toString()+'-'+asig.grupo.toString()+'] '+this.materia+' con: '+this.docente)
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

  public show(){
    this.mostrar=true;
    console.log(this.mostrar);
  }

  public notShow(){
    this.mostrar=false;
    console.log(this.mostrar);
  }

  public setmostrar(){
    if(this.mostrar){
      return 'mostrar';
    }else{
      return 'nomostrar';
    }
  }

  }
