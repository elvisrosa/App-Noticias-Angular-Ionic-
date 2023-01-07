import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import { Article } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class StorageServicioService {

  private _storage: Storage | null = null;
  private _localStorage: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.getLocalArticle;
  }

  async agregarORemoreverArti(article: Article) {
    //Devuelve true o false si existe o no el articulo
    const existeFavorito = this._localStorage.find(localstorage => localstorage.title === article.title);
    if (existeFavorito) {
      //Filtra el arreglo si los titulos son distintoss
      this._localStorage = this._localStorage.filter(storage => storage.title !== article.title);
    } else {
      //Agrega el article al arregl de _localStorage
      this._localStorage = [article, ...this._localStorage]
    }
    //los guarda
    this.storage.set('articulos', this._localStorage);

  }

  async cargarFavoritos() {
    try {
      const articulos = await this._storage?.get('articulos');
      this._localStorage = articulos || [];
    } catch (error) {
      console.log(error)
    }
  }

  get getLocalArticle() {
    return [...this._localStorage]
  }

  //Devuelve true o false si se encuentra en favoritos
  //para luego poder eliminarlos y cambiar el icono

  estaEnFavorito(articulo:Article){
    //Convierte a valor booleano
    return !!this._localStorage.find(storage => storage.title == articulo.title);
  }


}
