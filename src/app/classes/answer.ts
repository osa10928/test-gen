import {FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidationErrors, ValidatorFn} from '@angular/forms';
import { ParentFormGroup} from './parent.form-group';

export class Answer {
  form: FormGroup;
  fb: FormBuilder

  constructor() {
    this.form = this.fb.group({
      name: ['']
    });
  }
}
