import { TestBed, async } from '@angular/core/testing';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TestTileComponent } from './test-tile/test-tile.component';
import { TestFormComponent } from './test-form/test-form.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';
import { FormValidationMessagesComponent } from './form-validation-messages/form-validation-messages.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestTileComponent,
        TestFormComponent,
        QuestionPreviewComponent,
        FormValidationMessagesComponent
      ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FormGen'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('FormGen');
  });
});
