import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AbstractControl, FormArray, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

import { TestFormComponent } from './test-form.component';
import { QuestionPreviewComponent } from '../question-preview/question-preview.component';
import { PreviewTestComponent } from '../preview-test/preview-test.component';
import { FormValidationMessagesComponent } from '../form-validation-messages/form-validation-messages.component';

describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;
  let testForm: FormGroup;
  let questions: FormArray;
  let toggleQuestionDownBtn;
  let toggleQuestionUpBtn;
  let selectedQuestionSpan
  let totalQuestionsSpan;
  let addQuestionButton;
  let addAnswerButton;
  let deleteQuestionButton;
  let question1;
  let question2;
  let answers;
  const id = ((question: AbstractControl) => question.get('id').value);
  const zeroIndex = ((x) => x - 1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestFormComponent,
        QuestionPreviewComponent,
        PreviewTestComponent,
        FormValidationMessagesComponent
      ],
      imports: [ FormsModule, ReactiveFormsModule, MaterialModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testForm = component.testForm;
    questions = testForm.get('multipleChoiceQuestions') as FormArray;
    addQuestionButton = fixture.nativeElement.querySelector('#add-question-btn');
  });

  describe('testForm', () => {

    it('should initialize with a testForm', () => {
      expect(component.testForm).toBeTruthy();
      expect(testForm).toBeTruthy();
      expect(testForm.status).toBe('INVALID');
    });

    it('should have a "name" input and required validation', () => {
      const name = testForm.get('name');
      expect(name).toBeTruthy();
      expect(name.status).toBe('INVALID');
      expect(name.errors).toEqual({required: true});
    });

    it('should have a "passingGrade" input and required validation', () => {
      const passingGrade = testForm.get('passingGrade');
      expect(passingGrade).toBeTruthy();
      expect(passingGrade.status).toBe('INVALID');
      expect(passingGrade.errors).toEqual({required: true});
    });

    it('should have a "published" input', () => {
      const published = testForm.get('published');
      expect(published).toBeTruthy();
    });

    it('should have a "questions" input and required validation', () => {
      expect(questions).toBeTruthy();
      expect(questions.status).toBe('INVALID');
      expect(questions.errors).toEqual({required: true});
    });

  });

  describe('questions', () => {

    it('should initialize with no questions within its array', () => {
      expect(questions.controls instanceof Array).toBe(true);
      expect(questions.controls.length).toBe(0);
    });

    it('should add many questions', () => {
      addQuestionButton.click();
      expect(questions.controls.length).toBe(1);

      addQuestionButton.click();
      addQuestionButton.click();
      expect(questions.controls.length).toBe(3);
    });

    it('should delete specific questions and retain numeric order in the "id" value', async(() => {

      addQuestionButton.click();
      addQuestionButton.click();
      fixture.detectChanges();

      question1 = questions.controls[0];
      question2 = questions.controls[1];
      question2.get('question').patchValue('Sample Question?');

      expect(id(question1)).toBe(1);
      expect(id(question2)).toBe(2);

      const toggleQuestionDown = fixture.nativeElement.querySelector('#keyboard-arrow-left');
      toggleQuestionDown.click();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        deleteQuestionButton = fixture.nativeElement.querySelector(`#delete-question-btn-${zeroIndex(id(question1))}`);
        deleteQuestionButton.click(id(question1));

        expect(questions.controls[0].get('question').value).toBe('Sample Question?');
        expect(questions.controls[0].get('id').value).toBe(1);
      });

    }));

    describe('with a questions added', () => {

      beforeEach(() => {
        addQuestionButton.click();
      });

      it('should have an "id" input with a value', () => {
        expect(questions.controls[0].get('id').value).toBeTruthy();
      });

      it('should have a "question" input with validation', () => {
        expect(questions.controls[0].get('question')).toBeTruthy();
        expect(questions.controls[0].get('question').errors).toEqual({required: true});
      });

      it('should have an "answers" input with validation', () => {
        expect(questions.controls[0].get('answers')).toBeTruthy();
        expect(questions.controls[0].get('answers').errors).toEqual({required: true});
      });

    });

  });

  describe('question toggle', () => {

    beforeEach( () => {

      toggleQuestionDownBtn = fixture.nativeElement.querySelector('#keyboard-arrow-left');
      toggleQuestionUpBtn = fixture.nativeElement.querySelector('#keyboard-arrow-right');
      selectedQuestionSpan = fixture.nativeElement.querySelector('#selected-question');
      totalQuestionsSpan = fixture.nativeElement.querySelector('#total-questions');

    })

    it('should initiate with selected question and total questions at 0', () => {
      expect(parseInt(selectedQuestionSpan.textContent, 10)).toBe(0);
      expect(parseInt(totalQuestionsSpan.textContent, 10)).toBe(0);
    });

    it('total questions should increase as questions increase', () => {
      addQuestionButton.click();
      addQuestionButton.click();
      fixture.detectChanges();

      expect(questions.controls.length).toBe(parseInt(totalQuestionsSpan.textContent, 10));
      expect(parseInt(totalQuestionsSpan.textContent, 10)).toBe(2);

      question2 = questions.controls[1];
      deleteQuestionButton = fixture.nativeElement.querySelector(`#delete-question-btn-${zeroIndex(id(question2))}`);
      deleteQuestionButton.click(id(question2));

      fixture.detectChanges();
      expect(questions.controls.length).toBe(parseInt(totalQuestionsSpan.textContent, 10));
      expect(parseInt(totalQuestionsSpan.textContent, 10)).toBe(1);
    });

    it('selected question should react as questions are added and deleted', async(() => {
      addQuestionButton.click();
      fixture.detectChanges();

      expect(parseInt(selectedQuestionSpan.textContent, 10)).toBe(1);

      addQuestionButton.click();
      addQuestionButton.click();
      fixture.detectChanges();

      toggleQuestionDownBtn.click();
      toggleQuestionDownBtn.click();

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        question1 = questions.controls[0];
        deleteQuestionButton = fixture.nativeElement.querySelector(`#delete-question-btn-${zeroIndex(id(question1))}`);
        deleteQuestionButton.click(id(question1));
        fixture.detectChanges();

        expect(parseInt(selectedQuestionSpan.textContent, 10)).toBe(1);

        addQuestionButton.click();
        fixture.detectChanges();
        expect(parseInt(selectedQuestionSpan.textContent, 10)).toBe(3)
      });

    }));

  });

  describe('answers', () => {

    beforeEach(() => {
       addQuestionButton.click();
       fixture.detectChanges();
       question1 = questions.controls[0] as FormGroup;
       answers = question1.get('answers');
     });

    it('should not be present upon initiation of a question', () => {
      expect(answers.controls instanceof Array).toBe(true);
      expect(answers.controls.length).toBe(0);
    });

    it('should add many answers', () => {
      addAnswerButton = fixture.nativeElement.querySelector(`#add-answer-btn-${zeroIndex(id(question1))}`);
      addAnswerButton.click();
      fixture.detectChanges();

      expect(answers.controls.length).toBe(1);

      addAnswerButton.click();
      addAnswerButton.click();
      expect(answers.controls.length).toBe(3);
    });

    it('should delete specific answer and retain numeric order in the "id" value',() => {

      addAnswerButton = fixture.nativeElement.querySelector(`#add-answer-btn-${zeroIndex(id(question1))}`);
      addAnswerButton.click();
      addAnswerButton.click()
      fixture.detectChanges();

      const answer1 = answers.controls[0];
      const answer2 = answers.controls[1];
      answer2.get('answer').patchValue('Sample Answer');

      expect(id(answer1)).toBe(1);
      expect(id(answer2)).toBe(2);

      const answer1DeleteBtn = fixture.nativeElement.querySelector(
        `#delete-answer-btn-${zeroIndex(id(question1))}-${zeroIndex(id(answer1))}`);
      answer1DeleteBtn.click();
      fixture.detectChanges();

      expect(answers.controls[0].get('answer').value).toBe('Sample Answer');
      expect(answers.controls[0].get('id').value).toBe(1);
    });

    describe('with answer added', () => {

      beforeEach(() => {
        addAnswerButton = fixture.nativeElement.querySelector(`#add-answer-btn-${zeroIndex(id(question1))}`);
        addAnswerButton.click();
        addAnswerButton.click();
        fixture.detectChanges();
      });

      it('answer to have and "id" input', () => {
        expect(answers.controls[0].get('id')).toBeTruthy()
      });

      it('answer to have "answer" input that with validation', () => {
        expect(answers.controls[0].get('answer')).toBeTruthy();
        expect(answers.controls[0].get('answer').errors).toEqual({required: true});
      });

      it('has an "isCorrect" input', () => {
        expect(answers.controls[0].get('isCorrect')).toBeTruthy();
      });

      it('should remove "single correct answer" error on test form when 1 answer is selected as correct', () => {
        const answer1 = answers.controls[0];
        const answer2 = answers.controls[1];

        expect(answers.errors).toEqual( {required: true});

        answer1.get('isCorrect').patchValue(true);
        fixture.detectChanges();
        expect(answers.errors).toBeFalsy();

        answer2.get('isCorrect').patchValue(true);
        expect(answers.errors).toEqual( {required: true});
      });

    });

  });


});
