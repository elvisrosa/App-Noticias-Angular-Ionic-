import { Component, Input, OnInit } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Style } from '@capacitor/status-bar';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Article } from 'src/app/interfaces';
import { StorageServicioService } from '../../servicios/storage-servicio.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss'],
})
export class ArticuloComponent implements OnInit {


  @Input() articulos: Article;
  @Input() index: number;

  constructor(private actionCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private platform: Platform,
    private _stotageService:StorageServicioService
    ) { }

  ngOnInit() {}


  async onOpenArticle() {

    const articuloFavorito= this._stotageService.estaEnFavorito(this.articulos);
    
    const normalBtn: ActionSheetButton[] = [
      
      {
        text: articuloFavorito ? 'Remover favorito' : 'Favorito',
        icon: articuloFavorito ? 'heart' :'heart-outline',
        cssClass: articuloFavorito ? 'rojo' : '',
        handler: () => this.agregarFavorito()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      }
    ]

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.campartir()
    };

    if (this.platform.is('capacitor')) {
      normalBtn.unshift(shareBtn);
    }



    const actionSheet = await this.actionCtrl.create({
      header: 'Acciones',
      buttons: normalBtn
    }


    )
    await actionSheet.present();

  }

  campartir() {
    //Dssestructaracion
    const { title, source, url } = this.articulos;
    this.socialSharing.share(
      title,
      source.name,
      '',
      url
    );
  }

  agregarFavorito() {
      this._stotageService.agregarORemoreverArti(this.articulos);
  }

  abrirNoticia() {
    if (this.platform.is('ios') || this.platform.is('android')) {

    }
    window.open(this.articulos.url, '_blank')
  }
}
