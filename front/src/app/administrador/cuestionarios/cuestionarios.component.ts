import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {HttpService} from '../../comun/http.service';
import { MyFilterPipe,MyFilterPipe2, MyFilterName, MyFilterCategory } from '../../comun/mypipe';
import {MatSnackBar} from '@angular/material';
import 'rxjs/Rx';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Router, NavigationExtras} from '@angular/router';
import {DataService} from '../../dataservice';
import { DialogAddC } from '../pop-up-add-cuestionario/pop-up-add-cuestionario.component';


@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {

  public dialogRef: MatDialogRef<DialogAddC>;
  public cuestionarios:any=[];
  public panelOpenState: boolean = false;
  public qDone:boolean=false;
  public preguntas:any=[];
  public displayPreguntas:any=['codigo','texto'];
  public totalPreguntas:any=[];
  public categorias:any=[];
  public categoria:any="";
  public mycuest:any="";
  public mypregunta:any="";

  constructor(private _service:HttpService,public dialog: MatDialog, private data:DataService,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.data.changeMessage('admin');

    this._service.getCuestionarios().map(response=>response)
    .subscribe(res=>{
      this.cuestionarios=res;
    },err=>{
      console.log(err);
    });

    this._service.getCategorias().map(response=>response)
    .subscribe(res=>{
      this.categorias=res;
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

  public getPreguntas(identificacion){
    this.qDone=false;
    this._service.getPxC(identificacion).subscribe(data => {

          this.preguntas=data;
          this.qDone=true;
        }, err => {
        });
  }

  public agregar(mycuest){

    let datos={
      "pregunta": this.mypregunta,
      "cuestionario": this.mycuest
    }


    this._service.addPxC(datos).subscribe(data => {

          //this.preguntas.push(data);
          this.getPreguntas(mycuest);
        this.cdr.detectChanges();
        }, err => {
        });

  }


  public openDialog(){
    this.dialogRef = this.dialog.open(DialogAddC);
    this.dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        if(result.nombre){
          let datos = {
            nombre:result.nombre,
            estudiante:true
          }
        this._service.addCuestionario(datos).subscribe(data => {

              this.cuestionarios.push(data);
            }, err => {
            });
        }else{
          console.log('no hay nada que guardar');
        }
      }
    });
  }

}
