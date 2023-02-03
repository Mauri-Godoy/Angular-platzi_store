import { AbstractControl } from '@angular/forms';
import { CategoriesService } from '../core/services/categories.service';
import { map } from 'rxjs/operators';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return { price_invalid: true };
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;

    if (containsNumber(value))
      return null; // si no hay error se retorna null

    // se retorna el nombre del error
    return { invalid_password: true }
  }

  //A diferencia de las otras validaciones, acá se está recibiendo como parámetro el formulario
  static matchPasswords(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password === confirmPassword) return null;

    return { match_password: true }
  }

  //validación asíncrona
  static validateCategory(service: CategoriesService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.checkCategory(value).pipe(
        map((response: any) => {
          return response.isAvailable ? null : { not_available: true }
        })
      )
    }
  }
}


function containsNumber(value: string) {
  return value.split('').find(v => isNumber(v)) !== undefined;
}

function isNumber(value: string) {
  return !isNaN(parseInt(value, 10))
}
