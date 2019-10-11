import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-preview-test',
  templateUrl: './preview-test.component.html',
  styleUrls: ['./preview-test.component.css']
})
export class PreviewTestComponent implements OnInit {

  //@Input() test: object;

  constructor(
    public dialogRef: MatDialogRef<PreviewTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
