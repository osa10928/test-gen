import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../material/material.module';

import { TestTileComponent } from './test-tile.component';

describe('TestTileComponent', () => {
  let component: TestTileComponent;
  let fixture: ComponentFixture<TestTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTileComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
