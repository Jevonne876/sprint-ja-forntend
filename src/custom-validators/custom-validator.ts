import { AbstractControl } from '@angular/forms';


export function ValidateConfirmPassword(control: AbstractControl): { invalid: boolean } {
    if (control.get('password')?.value !== control.get('confirmPassword')?.value) {
        return { invalid: true };
    }
    else {
        return { invalid: false };
    }


}


