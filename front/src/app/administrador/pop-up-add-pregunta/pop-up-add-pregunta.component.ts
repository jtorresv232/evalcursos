import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpService } from '../../comun/http.service';


@Component({
  selector: 'app-pop-up-add-pregunta',
  templateUrl: './pop-up-add-pregunta.component.html',
  styleUrls: ['./pop-up-add-pregunta.component.css']
})
export class DialogAddP implements OnInit {

  public cat:any;
  public texto:string;
  public categories:any=[];
  public preguntasForm : FormGroup;

  constructor(private _service: HttpService, public dialogRef: MatDialogRef<DialogAddP>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.categories=this.data;
    this.preguntasForm = new FormBuilder().group({
      pregunta:['', Validators.required],
      tipo:['', Validators.required],
      otro:[false,[]],
      tema:['', Validators.required],
      unica:[false,[]],
      tipodato:['',Validators.required],
      opciones: new FormBuilder().array([])
    });
  }

  agregarOpcion(): void{
    this.opciones.push(this.crearOpcionesFormGroup());
  }
  
  get opciones(): FormArray {
    return this.preguntasForm.get('opciones') as FormArray;
  }

  crearOpcionesFormGroup(): FormGroup {
    const form = new FormBuilder().group({
      texto:['',Validators.required],
      mixta:[false,Validators.required]
    });
    return form;
  }

  public closeDialog() {
    let datos = {
      tema:parseInt(this.preguntasForm.get('tema').value[0]),
      pregunta:this.preguntasForm.get('pregunta').value,
      opcion_unica : !(this.preguntasForm.get('unica').value)? 'N' : 'S',
      opcion_otro : !(this.preguntasForm.get('otro').value)? 'N' : 'S',
      tipo : this.preguntasForm.get('tipo').value[0],
      tipodato : this.preguntasForm.get('tipodato').value[0]
    }

    this._service.addPregunta(datos).subscribe(data => {

      for(let i = 0; i < this.opciones.length; i++){
        let opdata = {
          numero: data['numero'],
          texto: this.opciones.get(i.toString()).get('texto').value,
          mixta: (this.opciones.get(i.toString()).get('mixta').value)? 'SI': 'NO'
        }
        console.log(opdata);  
        this._service.addOpciones(opdata).subscribe( res => {
          console.log(res);
          this.dialogRef.close(data);
        });
      }
    }, err => {
    });
    
  }

  public cancel() {

    this.dialogRef.close();
  }

}
