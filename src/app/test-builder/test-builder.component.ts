import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-test-builder',
  templateUrl: './test-builder.component.html',
  styleUrls: ['./test-builder.component.css']
})
export class TestBuilderComponent implements OnInit {

  buildTest = false;
  buildSurvey = false;
  testForm: FormGroup;
  previewForm: object;

  constructor() { }

  ngOnInit() {
  }

}
