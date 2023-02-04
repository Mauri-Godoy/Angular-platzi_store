import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category',
  template: `<app-category-form (create)="createCategory($event)" (update)="updateCategory($event)"
  [category]="category"></app-category-form>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  //Smart component: se encarga de toda la parte lógica y el dumb la parte de interacción
  category: Category;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) this.getCategory(params.id);
    })
  }

  createCategory(data) {
    this.categoriesService.createCategory(data).subscribe(response => {
      console.log('Categoría creada: ', response)
      this.router.navigate(['./admin/categories'])
    })
  }

  updateCategory(data) {
    this.categoriesService.updateCategory(this.category.id, data).subscribe(response => {
      console.log('Categoría creada: ', response)
      this.router.navigate(['./admin/categories'])
    })
  }

  private getCategory(id: string) {
    this.categoriesService.getCategory(id).subscribe(response =>
      this.category = response
    )
  }
}
