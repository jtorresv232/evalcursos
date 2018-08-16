import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpService } from '../../comun/http.service';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.css']
})
export class CrearEncuestaComponent implements OnInit {

  puntos:any=[];
  temas:any=[];
  encuestaForm: FormGroup;
  todasPreguntas:any=[];


  constructor( private _service: HttpService) { }

  ngOnInit() {
    this._service.getCategorias().subscribe(data => {
      this.temas = data;
    });
    this._service.getPuntos().subscribe( data => {
      this.puntos = data;
    });
    this._service.getPreguntas().subscribe( data => {
      this.todasPreguntas = data;
    });
    this.encuestaForm = new FormBuilder().group({
      punto :['',[Validators.required]],
      identificacion:['',[Validators.required]],
      fechaInicio:['',[]],
      fechaFin:['',[]],
      modificable:[false,[]],
      sql:['',[]],
      nombre:['',[]],
      encabezado:['',[]],
      logeo:[false,[]],
      secreta:[false,[]],
      estructura:['',[]],
      preguntas: new FormBuilder().array([])

    });
  }

  get preguntas(): FormArray {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  crearPreguntasFormGroup(): FormGroup {
    const form = new FormBuilder().group({
      pregunta:['',Validators.required],
      orden:['',[]],
      esSeccion:[false,[]],
      seccion:['',[]],
      obligatoria:[false,[]]
    });
    return form;
  }

  agregarPregunta(){
    this.preguntas.push(this.crearPreguntasFormGroup());
  }

  crearEncuesta(encuesta){
    let datos={
      punto: encuesta.get('punto').value,
      identificacion: encuesta.get('identificacion').value,
      fechaInicio: encuesta.get('fechaInicio').value,
      fechaTerminacion: encuesta.get('fechaFin').value,
      modificable:(encuesta.get('modificable').value)? 'SI':'NO',
      sql_personasAplica:encuesta.get('sql').value,
      nombreEncuesta:encuesta.get('nombre').value,
      encabezado:encuesta.get('encabezado').value,
      requiereLogeo:(encuesta.get('logeo').value)? 'SI':'NO',
      secreta:(encuesta.get('secreta').value)? 'S':'N',
      estructuraMetadato:encuesta.get('estructura').value,
    }
    console.log(this.puntos);
    console.log(datos);
    this._service.addCuestionario(datos).subscribe(res => {
      console.log(res);
    });
  }

  agregarPreguntas(preguntas,encuesta){
    for(let pregunta of preguntas){
      console.log(pregunta);
      let datos = {
        punto:encuesta.get('punto').value,
        identificacion:encuesta.get('identificacion').value,
        numero:pregunta.get('pregunta').value,
        orden:pregunta.get('orden').value,
        obligatoriedad:(pregunta.get('obligatoria').value)? 'OBLIGATORIA':'OPCIONAL'
      }
      this._service.addPxC(datos).subscribe(res => {

      });
      if(pregunta.get('seccion') && pregunta.get('seccion').value != ''){
        console.log('Entreeeeeeeeeeeeeeeeee');
        let dat = {
          punto:encuesta.get('punto').value,
          identificacion:encuesta.get('identificacion').value,
          texto: pregunta.get('seccion').value,
          preguntaDondeArranca: pregunta.get('pregunta').value
        }
        this._service.addSeccion(dat).subscribe(res => {
          console.log(res);
        });
      }
        }
  }

}
