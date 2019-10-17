import {Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidationErrors, ValidatorFn} from '@angular/forms';
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
  questions: FormArray;
  answers: FormArray;
  @Output() previewTest = new EventEmitter<FormGroup>();
  selectedQuestion = 0;

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
      passingGrade: ['', Validators.required],
      published: [''],
      multipleChoiceQuestions: this.fb.array([]),
      freeResponseQuestions: this.fb.array([]),
    });
    this.testForm.setValidators(this.isOneChecked);
  }

  toggleQuestionUp(): void {
    this.multipleQuestionGroup.length === this.selectedQuestion ? this.selectedQuestion = 1 : this.selectedQuestion++;
  }

  toggleQuestionDown(): void {
    this.selectedQuestion === 1 || this.selectedQuestion === 0 ?
      this.selectedQuestion = this.multipleQuestionGroup.length : this.selectedQuestion--;
  }

  get questionsTotal() {
    return this.multipleQuestionGroup.length;
  }

  isSelectedQuestion(i): boolean {
    return i + 1 === this.selectedQuestion;
  }

  private onSubmit() {
    this.validate();
    if (this.testForm.valid) {
      this.previewTest.emit(this.testForm);
    }
  }

  private addMultipleChoiceQuestion() {
    this.multipleQuestionGroup.push(this.createMultiQuestionGroup());
    this.selectedQuestion = this.multipleQuestionGroup.length;
  }

  private deleteMultipleChoiceQuestion(index): void {
    this.multipleQuestionGroup.removeAt(index);
  }

  private createMultiQuestionGroup(numberOfQuestions = 1): FormGroup {
    const questionForm = this.fb.group({
      id: [''],
      question: ['', Validators.required],
      answers: this.fb.array([])
    });
    this.createQuestionId(questionForm)
    questionForm.setValidators(this.isOneChecked())
    return questionForm;
  }

  private createQuestionId(question: FormGroup): void {
    if (!question.value.id) {
      question.patchValue({
        id: this.multipleQuestionGroup.length + 1
      });
    }
  }

  private addAnswer(questionIndex, numberOfQuestion = 1): void {
    while (numberOfQuestion > 0) {
      this.getAnswers(questionIndex).push(this.createAnswersGroup(questionIndex));
      numberOfQuestion--;
    }
    console.log(this.multipleQuestionGroup)
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
    this.getAnswers(questionIndex).removeAt(answerIndex);
  }

  private get multipleQuestionGroup(): FormArray {
    return this.testForm.get('multipleChoiceQuestions') as FormArray;
  }

  private getAnswers(i): FormArray {
    const questions = this.multipleQuestionGroup;
    return questions.controls[i].get('answers') as FormArray;
  }

  private validateAQuestionExist(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      if (this.multipleQuestionGroup.value.length) {
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
