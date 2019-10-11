import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  createPreview(formInfo) {

  }

}
