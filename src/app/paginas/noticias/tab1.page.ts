import { Component, OnInit } from '@angular/core';
import { ServicionoticiasService } from '../../servicios/servicionoticias.service';
import { NewResponse } from '../../interfaces';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias:Article[]=[];
  
  constructor(private servicio: ServicionoticiasService) {}
  ngOnInit() {
    
    this.servicio.obtenerNoticias().subscribe(articles=>{
      this.noticias.push(...articles);
      console.log(this.noticias)
  })

  }

  loadData(eve:any){
    this.servicio.obtenerPorCategoria('business', true).subscribe(arts=>{
       if(arts.length===this.noticias.length){
        eve.target.disabled=true;
        return;
       }
      
      this.noticias=arts;
      eve.target.complete();
    })
  }
}
