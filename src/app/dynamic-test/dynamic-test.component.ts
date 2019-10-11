import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidationErrors, ValidatorFn} from '@angular/forms';
import { MyErrorStateMatcher } from '../my-error-state-matcher';
import { Question } from '../classes/question';

@Component({
  selector: 'app-dynamic-test',
  templateUrl: './dynamic-test.component.html',
  styleUrls: ['./dynamic-test.component.css']
})
export class DynamicTestComponent implements OnInit {
  testForm: FormGroup;
  questions: FormArray;
  answers: FormArray;

  constructor(private fb: FormBuilder) {
  }

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.testForm = this.fb.group({
      name: ['', Validators.required],
      passingGrade: ['', Validators.required],
      isPublished: '',
      questions: this.fb.array([this.createQuestionsGroup()], Validators.required)
    });

  }

  private createQuestionsGroup(): FormGroup {
    const questionForm = this.fb.group({
      id: '',
      question: ['', Validators.required],
      answers: this.fb.array([this.createAnswersGroup()], Validators.required)
    });
    questionForm.setValidators(this.isOneChecked())
    return questionForm;
  }

  private createAnswersGroup(): FormGroup {
    return this.fb.group ({
      id: '',
      answer: ['', Validators.required],
      isCorrect: ''
    });
  }

  private addQuestion(): void {
    this.getQuestions().push(this.createQuestionsGroup());
  }

  private deleteQuestion(index): void {
    this.getQuestions().removeAt(index);
  }

  private addAnswer(i): void {
    this.getAnswers(i).push(this.createAnswersGroup());
  }

  private deleteAnswer(index): void {
    this.getAnswers(index).removeAt(index)
  }

  private onSubmit() {
    this.validate();
    this.isOneChecked();
    if (this.testForm.valid) {
      console.log(this.testForm.value);
    }
  }

  private getQuestions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  private getAnswers(i): FormArray {
    const questions = this.getQuestions();
    return questions.controls[i].get('answers') as FormArray;
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

  isChecked(answer): boolean {
    //  console.log(answer.controls.isCorrect.value)
    return answer.controls.isCorrect.value;
  }

  private validate() {
    this.testForm.updateValueAndValidity();
    this.testForm.markAllAsTouched();
  }


}
