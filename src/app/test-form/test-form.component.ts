import {Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidationErrors, ValidatorFn} from '@angular/forms';
import { MyErrorStateMatcher } from '../my-error-state-matcher';
import { Question } from '../classes/question';
import {MatDialog} from '@angular/material';
import {PreviewTestComponent} from '../preview-test/preview-test.component';


@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  testForm: FormGroup;
  questions: FormArray;
  answers: FormArray;
  @Output() previewTest = new EventEmitter<FormGroup>();

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog) {
  }

  matcher = new MyErrorStateMatcher();

  openDialog(): void {
    const dialogRef = this.dialog.open(PreviewTestComponent, {
      width: '400px',
      data: this.testForm.value
    });
  }

  ngOnInit() {
    this.testForm = this.fb.group({
      name: ['', Validators.required],
      includePassingGrade: [''],
      passingGrade: [''],
      multipleChoiceQuestions: this.fb.array([this.createMultiQuestionGroup()]),
      freeResponseQuestions: this.fb.array([])
    });
    this.testForm.setValidators([this.validatePassingGrade(), this.validateAQuestionExist()]);
  }

  private onSubmit() {
    this.validate();
    this.isOneChecked();
    if (this.testForm.valid) {
      this.previewTest.emit(this.testForm);
    }
  }

  private addMultipleChoiceQuestion() {
    this.multipleQuestionGroup.push(this.createMultiQuestionGroup());
  }

  private deleteMultipleChoiceQuestion(index): void {
    this.multipleQuestionGroup.removeAt(index);
  }

  private addFreeResponseQuestion() {
    this.freeResponseQuestionGroup.push(this.createFreeResponseGroup());
  }

  private createMultiQuestionGroup(): FormGroup {
    const questionForm = this.fb.group({
      id: [''],
      question: ['', Validators.required],
      answers: this.fb.array([])
    });
    questionForm.setValidators(this.isOneChecked())
    return questionForm;
  }

  private createFreeResponseGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      question: ['', Validators.required],
    });
  }

  private createAnswersGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      answer: ['', Validators.required],
      isCorrect: ['']
    });
  }

  private addAnswer(i): void {
    this.getAnswers(i).push(this.createAnswersGroup());
  }

  private deleteAnswer(questionIndex, answerIndex): void {
    this.getAnswers(questionIndex).removeAt(answerIndex);
  }

  private get multipleQuestionGroup(): FormArray {
    return this.testForm.get('multipleChoiceQuestions') as FormArray;
  }

  private get freeResponseQuestionGroup(): FormArray {
    return this.testForm.get('freeResponseQuestions') as FormArray;
  }

  private getQuestions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  private getAnswers(i): FormArray {
    const questions = this.multipleQuestionGroup;
    return questions.controls[i].get('answers') as FormArray;
  }

  private validatePassingGrade(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (this.testForm.get('includePassingGrade').value && !this.testForm.get('passingGrade').value) {
        this.testForm.get('passingGrade').setErrors({includeGrade: true});
      } else {
        this.testForm.get('passingGrade').setErrors(null);
      }
      return;
    };
  }

  private validateAQuestionExist(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (this.multipleQuestionGroup.value.length || this.freeResponseQuestionGroup.value.length) {
        this.multipleQuestionGroup.setErrors(null);
        return;
      }
      this.multipleQuestionGroup.setErrors({includeQuestion: true});
      return;
    };
  }

  private isOneChecked(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      let count = 0;
      // @ts-ignore
      const answers = group.get('answers').controls;
      for (const answer of answers) {
        // tslint:disable-next-line:no-unused-expression
        this.isChecked(answer) ? count++ : null;
      }
      if (count > 1) { group.get('answers').setErrors({multiple: true}); }
      if (count < 1) { group.get('answers').setErrors({none: true}); }
      return;
    };
  }

  private isChecked(answer): boolean {
    return answer.controls.isCorrect.value;
  }

  private validate() {
    this.testForm.updateValueAndValidity();
    this.testForm.markAllAsTouched();
  }


}
