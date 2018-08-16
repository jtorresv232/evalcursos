import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpService } from '../../comun/http.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.css']
})
export class OpcionesComponent implements OnInit {
  public opciones:any = [];

  constructor(private _service: HttpService, public dialogRef: MatDialogRef<OpcionesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    this.data.pregunta;
    this._service.getOpciones(this.data.numero).subscribe(res => {
      this.opciones=res;
    });
    console.log(this.opciones.length)
  }

  public closeDialog(){
    this.dialogRef.close();
  }

  public cancel() {
    this.dialogRef.close();
  }

}
