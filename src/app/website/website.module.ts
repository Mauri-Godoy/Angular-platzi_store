import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { WebsiteRoutingModule } from './website-routing.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ImgComponent } from './components/img/img.component';
import { ProductsComponent } from './components/products/products.component';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    NavComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    HomeComponent,
    CategoryComponent,
    MyCartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule
  ]
})
export class WebsiteModule { }
