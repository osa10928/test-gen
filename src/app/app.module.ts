import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { TestFormComponent } from './test-form/test-form.component';
import { PreviewTestComponent } from './preview-test/preview-test.component';
import { TestTileComponent } from './test-tile/test-tile.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';
import { FormValidationMessagesComponent } from './form-validation-messages/form-validation-messages.component';


@NgModule({
  declarations: [
    AppComponent,
    TestFormComponent,
    PreviewTestComponent,
    TestTileComponent,
    QuestionPreviewComponent,
    FormValidationMessagesComponent
  ],
  entryComponents: [
    PreviewTestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
