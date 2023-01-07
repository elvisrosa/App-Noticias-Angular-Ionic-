import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, NewResponse } from '../interfaces';
import { articulosPorCategoriayPagina } from '../interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;



@Injectable({
  providedIn: 'root'
})
export class ServicionoticiasService {

  private articlesByCategoryAndPage: articulosPorCategoriayPagina = {};

  constructor(private http:HttpClient) { }

  
  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: { 
        apiKey: apiKey,
        country: 'us',
      }
    })
  }

  obtenerNoticias():Observable<Article[]>{

    return this.obtenerPorCategoria('business');

    //return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`)
    //return this.executeQuery<NewResponse>(`/top-headlines?country=us&category=business`).pipe(
    //  map(({articles})=>articles)
    //)
    
    /*http.get<NewResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
      params:{
        apiKey
      }
    }).pipe(
      map(({articles})=>articles)
    )
    */
  }

  obtenerPorCategoria(categoria:string, loadmore:boolean=false):Observable<Article[]>{
    /*return this.http.get<NewResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=${categoria}`, {
      params:{
        apiKey
      }
    }).pipe(
      map(({articles})=>articles)
    )*/

    if ( loadmore ) {
      return this.getArticlesByCategory( categoria );
    }

    if ( this.articlesByCategoryAndPage[categoria] ) {
      return of(this.articlesByCategoryAndPage[categoria].articulos);
    }

    return this.getArticlesByCategory(categoria);
    
  }


  private getArticlesByCategory( category: string ): Observable<Article[]> {
    if ( Object.keys( this.articlesByCategoryAndPage ).includes(category) ) {
      // Ya existe
      // this.articlesByCategoryAndPage[category].page += 0;
    } else {
      // No existe
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articulos: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewResponse>(`/top-headlines?category=${ category }&page=${ page }`)
    .pipe(
      map( ({ articles }) => {

        if ( articles.length === 0 ) return this.articlesByCategoryAndPage[category].articulos;

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articulos: [ ...this.articlesByCategoryAndPage[category].articulos, ...articles ]
        }

        return this.articlesByCategoryAndPage[category].articulos;
      })
    );
  

  }

}
