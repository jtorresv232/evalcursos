import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-pop-up-add-cuestionario',
  templateUrl: './pop-up-add-cuestionario.component.html',
  styleUrls: ['./pop-up-add-cuestionario.component.css']
})
export class DialogAddC implements OnInit {

  public nombre:string;

  constructor(public dialogRef: MatDialogRef<DialogAddC>) { }

  ngOnInit() {
  }

  public closeDialog() {
    let data = {
      nombre:this.nombre
    }
    this.dialogRef.close(data);
  }

  public cancel() {

    this.dialogRef.close();
  }

}
