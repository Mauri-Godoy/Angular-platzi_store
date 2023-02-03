import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service'
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  progressBarValue: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage) {
    this.buildForm();

  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
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
    this.form.valid ? this.createCategory()
      : this.form.markAllAsTouched();
  }

  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data).subscribe(response => {
      console.log('Categoría creada: ', response)
      this.router.navigate(['./admin/categories'])
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
