import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { MyValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  progressBarValue: number | null = null;
  categoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage,
    private route: ActivatedRoute) {
    this.buildForm();

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = params.id;
      if (this.categoryId)
        this.getCategory();
    })
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)],
      //Saco la validación asíncrona porque el endpoint devuelve un 404
      /* MyValidators.validateCategory(this.categoriesService)*/],
      image: ['', Validators.required]
    })
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid)
      this.categoryId ? this.updateCategory() : this.createCategory()
    else this.form.markAllAsTouched();
  }

  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data).subscribe(response => {
      console.log('Categoría creada: ', response)
      this.router.navigate(['./admin/categories'])
    })
  }

  private updateCategory() {
    const data = this.form.value;
    this.categoriesService.updateCategory(this.categoryId, data).subscribe(response => {
      console.log('Categoría creada: ', response)
      this.router.navigate(['./admin/categories'])
    })
  }

  private getCategory() {
    this.categoriesService.getCategory(this.categoryId).subscribe(response => {
      console.log(response)
      this.form.patchValue(response)
    })
  }

  uploadFile(event) {
    const image = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);
    this.imageField.setValue(null)
    this.progressBarValue = 1;

    task.percentageChanges().subscribe(value => this.progressBarValue = value);

    task.snapshotChanges()
      .pipe(finalize(() => {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe(url => {
          console.log(url)
          this.progressBarValue = null;
          this.imageField.setValue(url)
        })
      })).subscribe()
  }
}
