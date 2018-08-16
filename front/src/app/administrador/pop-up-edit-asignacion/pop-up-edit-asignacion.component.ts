import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-pop-up-edit-asignacion',
  templateUrl: './pop-up-edit-asignacion.component.html',
  styleUrls: ['./pop-up-edit-asignacion.component.css']
})
export class DialogEditAsig implements OnInit {

  public fechaInicial:any;
  public fechaFinal:any;
  public cuestionarios:any=[];
  public cuestionario:any;
  public startDate = new Date(2018, 0, 1);


  constructor(public dialogRef: MatDialogRef<DialogEditAsig>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.cuestionarios=this.data;
  }

  public getFechaI(event){
    this.fechaInicial=event;
  }

  public closeDialog() {
    let data = {
      fechaFinal:this.fechaFinal,
      fechaInicial:this.fechaInicial,
      cuestionario:this.cuestionario
    }
    this.dialogRef.close(data);
  }

  public cancel() {

    this.dialogRef.close();
  }

}
