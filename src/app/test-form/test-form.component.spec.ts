import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

import { TestFormComponent } from './test-form.component';
import { QuestionPreviewComponent } from '../question-preview/question-preview.component';
import { PreviewTestComponent } from '../preview-test/preview-test.component';
import { FormValidationMessagesComponent } from '../form-validation-messages/form-validation-messages.component';

describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
