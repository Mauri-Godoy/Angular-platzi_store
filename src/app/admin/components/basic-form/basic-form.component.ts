import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(''),
    phone: new FormControl(''),
    color: new FormControl('#000'),
    date: new FormControl('2023-01-10'),
    number: new FormControl(''),
    category: new FormControl(''),
    tag: new FormControl(''),
    agree: new FormControl(false),
    gender: new FormControl(''),
    zone: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
    //Obtener estado de manera reactiva
    this.nameField.valueChanges.subscribe(value => console.log(value))
  }

  save(event) {
    console.log(this.form.value)
  }

  get nameField() {
    return this.form.get('name');
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
