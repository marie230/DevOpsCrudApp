import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  formControl = new FormControl('', [
    Validators.required
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      '';
  }

  submit() {
    // empty stuff
  }
}
