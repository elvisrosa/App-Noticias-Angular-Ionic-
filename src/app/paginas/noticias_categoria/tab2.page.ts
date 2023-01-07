import { Component, OnInit } from '@angular/core';
import { ServicionoticiasService } from '../../servicios/servicionoticias.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  categorias:string[]=[
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  opcionseleccionada = this.categorias[0];
  noticiaPorCategoria:Article[]=[];
  
  constructor(private servicio: ServicionoticiasService) {}

  ngOnInit() {
    this.servicio.obtenerPorCategoria(this.opcionseleccionada).subscribe(resp=>{
      this.noticiaPorCategoria=[...resp] 
    })   
  }

  segmentChanged(eve:any){
    this.opcionseleccionada=eve.detail.value;
    this.servicio.obtenerPorCategoria(this.opcionseleccionada).subscribe(resp=>{
      this.noticiaPorCategoria=[...resp]
    }) 
  }

  loadData(eve:any){
    this.servicio.obtenerPorCategoria(this.opcionseleccionada, true).subscribe(arts=>{
       if(arts.length===this.noticiaPorCategoria.length){
        eve.target.disabled=true;
        return;
       }
      
      this.noticiaPorCategoria=arts;
      eve.target.complete();
    })
  }
}
