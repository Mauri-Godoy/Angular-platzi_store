import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [{
  path: "",
  component: LayoutComponent,
  children: [
    {
      path: "",
      redirectTo: "/home",
      pathMatch: "full"
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'category',
      loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
      data: {
        preload: true
      }
    },
    {
      path: 'product/:id',
      component: ProductDetailComponent
    }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
