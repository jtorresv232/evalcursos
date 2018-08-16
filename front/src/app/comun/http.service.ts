import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  //private url: string="http://localhost:8000/";
  private url: string="http://localhost:8084/encuesta/services/";

  constructor(private http: HttpClient) { }


  getAsignaciones():Observable<any>{
    return this.http.get(this.url+'asignaciones/')
  }

  getCalificaciones():Observable<any>{
    return this.http.get(this.url+'calificaciones/')
  }

  getAsigData():Observable<any>{
    return this.http.get(this.url+'asigDatos/')
  }

  getDocenteByCedula(cedula):Observable<any>{
    return this.http.get(this.url+'docentes/'+cedula.toString()+'/')
  }

  getMateriaByCodigo(codigo):Observable<any>{
    return this.http.get(this.url+'materias/'+codigo.toString()+'/')
  }

  getDocentes():Observable<any>{
    return this.http.get(this.url+'docentes/')
  }

  getMaterias():Observable<any>{
    return this.http.get(this.url+'materias/')
  }

  getEvaluadas():Observable<any>{
    return this.http.get(this.url+'materias_evaluadas/')
  }

  getPxC(data:any){
    return this.http.get(this.url + 'preguntaXEncuesta?identificacion='+ data)
  }



  setEncuesta(data:any){
    return this.http.post(this.url+'setEncuestas/',data)
  }

  getEncuesta(data:any){
    return this.http.post(this.url+'encuestaxasig/',data)
  }

  getCuestionarios():Observable<any>{
    return this.http.get(this.url+'encuestas/')
  }

  getPreguntas():Observable<any>{
    return this.http.get(this.url+'preguntas/')
  }

  getCategorias():Observable<any>{
    return this.http.get(this.url+'temas/')
  }

  getPuntos():Observable<any>{
    return this.http.get(this.url + 'puntos/')
  }

  getProgramas():Observable<any>{
    return this.http.get(this.url+'programas/')
  }

  getFacultades():Observable<any>{
    return this.http.get(this.url+'facultades/')
  }

  addPxC(data:any){
    return this.http.post(this.url + 'preguntaXEncuesta/', data)
  }

  addSeccion(data:any){
    return this.http.post(this.url + 'secciones/', data);
  }

  addPregunta(data:any){
    return this.http.post(this.url + 'preguntas/', data)
  }

  addOpciones(data:any){
    return this.http.post(this.url + 'opciones/', data)
  }

  getOpciones(data:any){
    return this.http.get(this.url + 'opciones?opcion='+ data)
  }

  addCuestionario(data:any){
    return this.http.post(this.url+ 'encuestas/', data)
  }

  editAsignacion(data:any){
    return this.http.put(this.url + 'asignaciones/', data)
  }

  editEvaluadas(data:any):Observable<any>{
    return this.http.put(this.url+'setEvaluada/', data)
  }

  deletePregunta(elem){
    return this.http.delete(this.url + 'preguntas/'+elem.codigo+'/')
  }

  getEstudiante(email, password){
    return this.http.get(this.url+'studs/'+email+'/'+password+'/')
  }

  getDocente(email, password){
    return this.http.get(this.url+'docentes/'+email+'/'+password+'/')
  }

  getCoordinador(email, password){
    return this.http.get(this.url+'coordinadores/'+email+'/'+password+'/')
  }

  getAsigxEstudiante(cedula){
    return this.http.get(this.url+'asignaciones/'+cedula.toString()+'/')
  }

  getAsigxDocente(cedula){
    return this.http.get(this.url+'asignacionesD/'+cedula.toString()+'/')
  }

}
