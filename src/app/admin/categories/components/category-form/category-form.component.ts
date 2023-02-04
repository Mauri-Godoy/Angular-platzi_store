import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  //Smart vs dumb components: es un patrón para dividir responsabilidades

  //dumb component: Su responsabilidad es manejar la interacción con el formulario y comunicar esas acciones al
  //smart component

  //El componente queda mucho mas desacoplado

  form: FormGroup;
  progressBarValue: number | null = null;

  //Flag para solucionar que el input de categoría sea un setter
  isNew: boolean = true;

  //dumb component: Se maneja a través de inputs y outputs
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  @Input() set category(data: Category) {  //Input como setter: para saber el momento exacto donde entra la información
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    //Los servicios no se pueden inyectar en el dumbComponent, en este caso es una excepción para hacer la validación asíncrona
    private categoriesService: CategoriesService) {
    this.buildForm();
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
      this.isNew ? this.create.emit(this.form.value) : this.update.emit(this.form.value)
    else this.form.markAllAsTouched();
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
