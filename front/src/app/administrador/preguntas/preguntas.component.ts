import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {HttpService} from '../../comun/http.service';
import { MyFilterPipe,MyFilterPipe2, MyFilterName, MyFilterCategory, Filters } from '../../comun/mypipe';
import {MatSnackBar} from '@angular/material';
import 'rxjs/Rx';
import {MatDialog, MatDialogRef} from '@angular/material';
import { Router, NavigationExtras} from '@angular/router';
import { DialogAddP } from '../pop-up-add-pregunta/pop-up-add-pregunta.component';
import { OpcionesComponent } from '../opciones/opciones.component';
import {DataService} from '../../dataservice';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  public dialogRef: MatDialogRef<DialogAddP>;
  public dialogOpciones: MatDialogRef<OpcionesComponent>
  public message: string="Preguntas";
  @Output() messageEvent:any;
  public misPreguntas:any=[];
  public misCategorias:any=[];
  public pDone:boolean= false;
  public cDone:boolean=false;
  public filts=[];
  public vari="hola";
  public nombre="pregunta";
  public text;
  constructor(private _service: HttpService, public dialog: MatDialog, private data:DataService) { }

  ngOnInit() {
    this.data.changeMessage('admin');

    this._service.getCategorias().map(response=>response)
    .subscribe(res=>{
      this.misCategorias=res;
      this.cDone=true;
    },err=>{
      console.log(err);
    });

    this._service.getPreguntas().map(response=>response)
    .subscribe(res=>{
      this.misPreguntas=res;
      this.pDone=true;
    },err=>{
      console.log(err);
    });
  }

  public delete(pregunta){
    var pos= this.misPreguntas.indexOf(this.misPreguntas.filter(i=>{
        return i.codigo==pregunta.codigo;
      })[0]);

      this._service.deletePregunta(pregunta).subscribe(res => {
        console.log(res);
        this.misPreguntas.splice(pos, 1);
      },err=>{
        console.log(err);
      });
  }

  public openDialog(){
    this.dialogRef = this.dialog.open(DialogAddP,{
      data: this.misCategorias
    });
    this.dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.misPreguntas.push(result);            
          
        }else{
          console.log('no hay nada que guardar');
        }
      
    });
  }

  public openDialogOpciones(pregunta : any){
    this.dialogOpciones = this.dialog.open(OpcionesComponent,{
      data: pregunta
    });
    this.dialogOpciones.afterClosed();
  }


  source:any;
/**
   * CHECKS IF ONE ELEMENT LIES BEFORE THE OTHER
  */
 isbefore(a, b) {
  if (a.parentNode == b.parentNode) {
    for (var cur = a; cur; cur = cur.previousSibling) {
      if (cur === b) {
        return true;
      }
    }
  }
  return false;
}
/**
 * LIST ITEM DRAP ENTERED
*/
dragenter($event) {
  if (this.isbefore(this.source, $event.currentTarget)) {
    $event.currentTarget.parentNode.insertBefore(this.source, $event.currentTarget); // insert before
  }
  else {
    $event.currentTarget.parentNode.insertBefore(this.source, $event.currentTarget.nextSibling); //insert after
  }
}


/**
 * LIST ITEM DRAG STARTED
 */
dragstart($event) {
  this.source = $event.currentTarget;
  $event.dataTransfer.effectAllowed = 'move';
}

}
