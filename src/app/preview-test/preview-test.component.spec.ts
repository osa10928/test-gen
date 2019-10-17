import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { PreviewTestComponent } from './preview-test.component';

describe('PreviewTestComponent', () => {
  let component: PreviewTestComponent;
  let fixture: ComponentFixture<PreviewTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewTestComponent ],
      imports: [ MaterialModule ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
