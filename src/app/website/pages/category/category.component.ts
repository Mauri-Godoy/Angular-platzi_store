import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  template: `<app-products [productId]="productId"  [products]="products"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId: string | null = null;
  products: Product[] = [];
  productId: string | null = null;

  limit = 10;
  offset = 0;

  constructor(private route: ActivatedRoute,
    private productsService: ProductsService) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if (this.categoryId)
            return this.productsService.getByCategorY(this.categoryId, this.limit, this.offset);

          return []
        })
      )
      .subscribe(data => {
        this.products = data;
      })

    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
  }

}
