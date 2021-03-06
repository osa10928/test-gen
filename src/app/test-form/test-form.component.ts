import {Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidationErrors, ValidatorFn, AbstractControl} from '@angular/forms';
import { MyErrorStateMatcher } from '../my-error-state-matcher';
import { trigger, state, style, animate, transition } from '@angular/animations';

import {MatDialog} from '@angular/material';
import {PreviewTestComponent} from '../preview-test/preview-test.component';


@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(500, style({ transform: 'translateX(0%'}))
      ]),
      transition(':leave', [
        style({display: 'none'}),
        animate(500, style({ transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class TestFormComponent implements OnInit {
  testForm: FormGroup;
  answers: FormArray;
  @Output() previewTest = new EventEmitter<FormGroup>();
  selectedQuestion = 0;
  errors = {};

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog) {
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.testForm = this.fb.group({
      name: ['', Validators.required],
      passingGrade: ['', Validators.required],
      published: [''],
      multipleChoiceQuestions: this.fb.array([], Validators.required)
    });
    this.testForm.setValidators(this.isOneChecked);
    //console.log(this.testForm);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PreviewTestComponent, {
      width: '400px',
      data: this.testForm.value
    });
  }

  toggleQuestionUp(): void {
    if (this.selectedQuestion  >= this.multipleQuestionGroup.length) {
      this.multipleQuestionGroup.length > 0 ? this.selectedQuestion = 1 : this.selectedQuestion = 0;
    } else {
      this.selectedQuestion++;
    };
  }

  toggleQuestionDown(): void {
    this.selectedQuestion === 1 || this.selectedQuestion === 0 ?
      this.selectedQuestion = this.multipleQuestionGroup.length : this.selectedQuestion--;
  }

  isSelectedQuestion(i): boolean {
    return i + 1 === this.selectedQuestion;
  }

  private onSubmit() {
    this.validate()
    if (this.testForm.valid) {
      console.log(this.testForm)
      //this.previewTest.emit(this.testForm);
    } else {
      this.getErrors();
    }
  }

  private addMultipleChoiceQuestion() {
    this.multipleQuestionGroup.push(this.createMultiQuestionGroup());
    this.selectedQuestion = this.multipleQuestionGroup.length;
    console.log(this.multipleQuestionGroup)
  }

  private deleteMultipleChoiceQuestion(index): void {
    this.reorderId(index, this.multipleQuestionGroup);
    this.multipleQuestionGroup.removeAt(index);
    if (this.selectedQuestion > 1) { this.selectedQuestion--; }
  }

  private createMultiQuestionGroup(numberOfQuestions = 1): FormGroup {
    const questionForm = this.fb.group({
      id: [''],
      question: ['', Validators.required],
      answers: this.fb.array([], Validators.required)
    });

    this.createQuestionId(questionForm)
    questionForm.setValidators(this.isOneChecked());
    return questionForm;
  }

  private createQuestionId(question: FormGroup): void {
    if (!question.value.id) {
      question.patchValue({
        id: this.multipleQuestionGroup.length + 1
      });
    }
  }

  private reorderId(index, formArray: FormArray): void {
    for (const question of formArray.controls) {
      if (index < question.get('id').value) { question.get('id').patchValue(question.get('id').value - 1); }
    }
  }

  private addAnswer(questionIndex, numberOfQuestion = 1): void {
    while (numberOfQuestion > 0) {
      this.getAnswers(questionIndex).push(this.createAnswersGroup(questionIndex));
      numberOfQuestion--;
    }
  }

  private createAnswersGroup(questionIndex): FormGroup {
    const answer = this.fb.group({
      id: [''],
      answer: ['', Validators.required],
      isCorrect: ['']
    });
    this.createAnswerId(answer, questionIndex);
    return answer;
  }

  createAnswerId(answer, questionIndex) {
    if (!answer.value.id) {
      answer.patchValue({
        id: this.getAnswers(questionIndex).length + 1
      });
    }
  }

  private deleteAnswer(questionIndex, answerIndex): void {
    this.reorderId(answerIndex, this.getAnswers(questionIndex));
    this.getAnswers(questionIndex).removeAt(answerIndex);
  }

  private get multipleQuestionGroup(): FormArray {
    return this.testForm.get('multipleChoiceQuestions') as FormArray;
  }

  private getAnswers(i): FormArray {
    const questions = this.multipleQuestionGroup;
    return questions.controls[i].get('answers') as FormArray;
  }

  private get questionsTotal() {
    return this.multipleQuestionGroup.length;
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
      if (count > 1) { group.get('answers').setErrors({required: true}); }
      if (count < 1) { group.get('answers').setErrors({required: true}); }
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

  private getErrors(): void {
    this.errors = this.cycleControlsForErrors(this.testForm, this.errors);
    for (const questionControl of this.multipleQuestionGroup.controls) {
      this.errors = this.cycleControlsForErrors(questionControl, this.errors);
    }
    console.log("hhhd")
    console.log(this.errors);
  }

  private cycleControlsForErrors(form, errors: object): object {
    Object.keys(form.controls).forEach(key => {
      const error = form.get(key).errors;
      if (error != null) { errors[key] = error; }
      if (key === 'answers') {
        for (const answerControls of form.get(key).controls) {
          errors = this.cycleControlsForErrors(answerControls, errors);
        }
      }
    });
    return errors;
  }

  private hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }


}
