import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  nameField = new FormControl('')
  emailField = new FormControl('')
  phoneField = new FormControl('')
  colorField = new FormControl('#000')
  dateField = new FormControl('2023-01-10')
  numberField = new FormControl('')
  categoryField = new FormControl('')
  tagField = new FormControl('')

  constructor() { }

  ngOnInit(): void {
    //Obtener estado de manera reactiva
    this.nameField.valueChanges.subscribe(value => console.log(value))
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

}
