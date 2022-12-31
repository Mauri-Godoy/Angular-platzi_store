import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

import { CreateProductDto, Product, UpdateProductDto } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetails: boolean = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    category: {},
    description: '',
    title: ''
  };

  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowDetails(id: string) {
    this.statusDetail = 'loading'
    this.productsService.getById(id).subscribe(res => {
      this.productChosen = res;
      this.showProductDetails = true;
      this.statusDetail = 'success';
      console.log(res)
    }, response => {
      console.log(response.error.message)
      this.statusDetail = 'error';
    }
    )
  }

  toggleProductDetails() {
    this.showProductDetails = false;
  }

  createProduct(): void {
    const body: CreateProductDto = {
      title: 'Nuevo producto',
      price: 100,
      description: 'Descripción del producto',
      images: ['https://static.platzi.com/media/avatars/avatars/aristotekean_4e6a790e-3581-4c38-ae32-7e419e2d77cc.png'],
      categoryId: 1
    };

    this.productsService.create(body)
      .subscribe((p: Product) => {
        console.log('create', p);
        // Guardamos el nuevo producto, en el Array de productos junto con los otros.
        this.products.unshift(p);
      });
  }

  updateProduct() {
    const body = {
      title: 'Nuevo titulo',
      price: 100,
      description: 'Nueva descripción del producto',
      images: ['https://static.platzi.com/media/avatars/avatars/aristotekean_4e6a790e-3581-4c38-ae32-7e419e2d77cc.png'],
      categoryId: 1
    };

    const id = this.productChosen.id;

    this.productsService.update(id, body).subscribe(response => {
      console.log(response);
      const index = this.products.findIndex(item => item.id === id);

      this.products[index] = response;
      this.productChosen = response;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const index = this.products.findIndex(item => item.id === id);
      this.products.splice(index, 1);
      this.showProductDetails = false;
    })
  }

  loadMore() {
    console.log(this.limit, this.offset, "params ----------------------------------------")
    this.productsService.getAllProducts(this.limit, this.offset)
      .subscribe((data: any) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
  }

  readAndUpdate(id: string) {

    this.productsService.getById(id).pipe(
      switchMap((product) => {
        return this.productsService.update(product.id, { title: 'change' });
      })
    ).subscribe(data => {

    });
    zip(
      this.productsService.getById(id),
      this.productsService.update(id, { title: 'change' })
    ).subscribe(response => {
      const read = response[0];
      console.log("read " + read)
      const update = response[1];
      console.log("update " + update)
    })
  }
}
