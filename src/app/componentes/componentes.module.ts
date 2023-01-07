import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticulosComponent } from './articulos/articulos.component';
import { ArticuloComponent } from './articulo/articulo.component';



@NgModule({
    declarations: [ArticulosComponent, ArticuloComponent],
    exports: [ArticulosComponent],
    imports: [
        CommonModule,
        IonicModule]
})
export class ComponentesModule { }
