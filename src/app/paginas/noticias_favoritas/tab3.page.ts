import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageServicioService } from '../../servicios/storage-servicio.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private _servicioStotage:StorageServicioService) {}

  get articulos():Article[]{
    return this._servicioStotage.getLocalArticle; 
    }

}
