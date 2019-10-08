import {FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Answer } from './answer';
import { ParentFormGroup } from './parent.form-group';

export class Question {
  form: FormGroup;
  fb: FormBuilder;

  constructor() {
    this.form = this.fb.group({
      name: [''],
      answers: [this.fb.array([this.createAnswers()])]
    });
  }

  createAnswers(): FormGroup {
    const answers = new Answer();
    return answers.form;
  }
}
