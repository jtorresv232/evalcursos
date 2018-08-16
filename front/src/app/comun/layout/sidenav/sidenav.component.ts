import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../../dataservice";

import { Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

myOption: string;
options:any=[];

show: boolean = false;
  class: string= "fa fa-angle-double-left";

  constructor(private _router: Router, private data: DataService) { }

  ngOnInit() {

    this.data.currentMessage.subscribe(message=> this.myOption=message);

    console.log(this._router.url);

    if(this.myOption=="admin"){
      this.options = [{
        nombre:"Asignaciones",
        url:"/asignaciones",
        icon:"view_list"
      },
      {
        nombre:"Cuestionarios",
        url:"/cuestionarios",
        icon:"dvr"
      },
      {
        nombre:"Preguntas",
        url:"/preguntas",
        icon:"help"
      },
      {
        nombre:"Resultados",
        url:"/resultados",
        icon:"assessment"
      }];
    } else if(this.myOption=="student"){
      this.options=[{
        nombre:"Evaluar Curso",
        url:"/evaluar",
        icon:"trending_up"
      }];
    }else if(this.myOption=="teacher"){
      this.options=[{
        nombre:"Evaluar Curso",
        url:"/docenteEvaluar",
        icon:"trending_up"
      }];
    }
    this.show=true;
    this.whenClick();
}

  whenClick(){
    this.show=!this.show;
    if(!this.show){
      document.getElementById("sidenav").style.width='5%';
      this.class="fa fa-angle-double-right";
    } else{
      document.getElementById("sidenav").style.width='15%';
      this.class="fa fa-angle-double-left";
    }

  }

/*  getWidth(){
  	if(this.show){
  		return "100%";
  	} else {
  		return "100%";
  	}
  }*/


  public getOption(opt){
    if(this._router.url.includes(opt.toLowerCase())){
      return 'selected'
    }else if(this._router.url=='/admin'){
      if(opt=='Preguntas'){
        return 'selected';
      }
    }else if(this._router.url=='/evaluar' || this._router.url.includes('formulario')){
      if(opt=='Evaluar Curso'){
        return 'selected';
      }
    }else if(this._router.url=='/docenteEvaluar'){
      if(opt=='Evaluar Curso'){
        return 'selected';
      }
    }
  }

  reDireccionar(path){
    if(path.includes('cuestionarios') || path.includes('asignaciones') || path.includes('preguntas') || path.includes('resultados')){
    this._router.navigate(['/admin'+path]);
  }else{
    this._router.navigate(['/evaluar'+path])
  }
  }


}
