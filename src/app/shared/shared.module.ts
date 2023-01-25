import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { ImgComponent } from './components/img/img.component';
import { ProductsComponent } from './components/products/products.component';
import { WebsiteRoutingModule } from '../website/website-routing.module';
import { SwiperModule } from 'swiper/angular';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    ReversePipe,
    TimeAgoPipe,
    ProductsComponent,
    ImgComponent,
    ProductComponent,
    HighlightDirective,
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule
  ],
  exports: [
    ReversePipe,
    TimeAgoPipe,
    ProductsComponent,
    ImgComponent,
    ProductComponent,
    HighlightDirective,
  ]
})
export class SharedModule { }
