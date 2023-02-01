import { ngModuleJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm()
  }

  ngOnInit(): void {
    //Obtener estado de manera reactiva
    // this.agreeField.valueChanges.subscribe(value => console.log("Cambios en agree: " + value))
    this.form.valueChanges.subscribe(value => console.log("Cambios de formulario: " + JSON.stringify(value)))

  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?)$/)]],
        last: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}\s?)$/)]]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000'],
      date: ['2023-01-10'],
      number: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: [''],
      tag: [''],
      agree: [false, Validators.requiredTrue],
      gender: [''],
      zone: [''],
    })
  }

  save(event) {
    if (this.form.invalid)
      this.form.markAllAsTouched();
    else
      console.log(this.form.value);
  }

  get nameField() {
    return this.form.get('fullName.name');
  }

  set setNameField(value) {
    this.nameField.setValue(value);
  }

  get lastField() {
    return this.form.get('fullName').get('last');
  }

  get emailField() {
    return this.form.get('email');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get numberField() {
    return this.form.get('number');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get zoneField() {
    return this.form.get('zone');
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid
  }

  get isNameFieldInvalid() {
    return (this.nameField.touched || this.nameField.dirty) && this.nameField.invalid
  }

}
