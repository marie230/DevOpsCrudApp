import { Component, Inject, OnInit } from '@angular/core';
import { Hero } from '../../shared/models/hero';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  formControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Hero) {
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
