import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { QuestionPreviewComponent } from './question-preview.component';

describe('QuestionPreviewComponent', () => {
  let component: QuestionPreviewComponent;
  let fixture: ComponentFixture<QuestionPreviewComponent>;
  let questionStub: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionPreviewComponent ],
      imports: [ MaterialModule, FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPreviewComponent);
    component = fixture.componentInstance;
    component.question = questionStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
