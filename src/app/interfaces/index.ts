export interface NewResponse {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    source:      Source;
    author?:      string;
    title:       string;
    description?: string;
    url:         string;
    urlToImage?:  string;
    publishedAt: string;
    content?:     string;
}

export interface Source {
    id:   null | string;
    name: string;
}

export interface articulosPorCategoriayPagina{
    [key:string]:{
        page:number,
        articulos:Article[]
    }
}
