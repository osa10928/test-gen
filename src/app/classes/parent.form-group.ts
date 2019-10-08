import {AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormGroup, ValidatorFn} from '@angular/forms';

export class ParentFormGroup extends FormGroup {

  constructor(private controlConfig: {
    [key: string]: AbstractControl;
    // tslint:disable-next-line:max-line-length
  },          validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
    super(controlConfig, validatorOrOpts, asyncValidator);
    for (const key of Object.keys(controlConfig)) {
      if (controlConfig.hasOwnProperty(key) && this.get(key)) {
        this.get(key).setParent(this);
      }
    }
  }

  public addControl(name: string, control: AbstractControl): void {
    super.addControl(name, control);
    control.setParent(this);
  }

}
