import {Component, Input, OnInit} from '@angular/core';
import {ValidationMessenger} from './validation-messenger';

@Component({
  selector: 'app-form-validation-messages',
  templateUrl: './form-validation-messages.component.html',
  styleUrls: ['./form-validation-messages.component.css']
})
export class FormValidationMessagesComponent implements OnInit {

  @Input() errors: { [key: string]: { [key: string]: boolean } };

  constructor(public messenger: ValidationMessenger) {

  }

  ngOnInit(): void {
  }

  getKeys(object) {
    if (object) {
      return Object.keys(object);
    }
    return [];
  }

  getMessage(label, errors, key) {
    console.log(errors, key, label)
    return this.messenger.getMessageForError(errors, key, label);
  }

}
