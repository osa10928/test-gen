import {Injectable}                        from '@angular/core';
import {ValidatorResult, ValidatorResults} from './validate';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessenger {

  keyMap = {
    name: 'A Test NAME',
    passingGrade: 'A PASSING GRADE',
    multipleChoiceQuestions: 'A QUESTION',
    question: 'The QUESTION input',
    answer: 'An ANSWER',
    answers: 'A CORRECT ANSWER'
  }


  messages: { [key: string]: (result: ValidatorResult, key: string, label?: string) => string } = {
    required : (result: { [key: string]: any } | boolean, key: string, label: string = '') => {
      return `${this.keyMap[label] || label} is required`;
    },
    pattern  : (result: ValidatorResult, key: string, label: string = '') => {
      return `${this.keyMap[label] || label} must be in a valid format`;
    },
    email    : (result: ValidatorResult, key: string, label: string = '') => {
      return `${this.keyMap[label] || label} must be a valid email address`;
    }};

  getMessageForError(result: ValidatorResults, key: string, label: string = '') {
    label = label.length > 0 ? label : key;
    if (typeof this.messages[key] === 'function') {
      return this.messages[key](result[key], key, label);
    }
    switch (typeof result[key]) {
      case 'string':
        return <string> result[key];
      default:
        return `Validation failed: ${label}`;
    }
  }
}
