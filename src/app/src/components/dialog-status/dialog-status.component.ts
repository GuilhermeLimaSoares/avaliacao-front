import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface DialogData {
  isSuccess: boolean;
  message: string;
}

@Component({
  selector: 'app-dialog-status',
  templateUrl: './dialog-status.component.html',
  styleUrls: ['./dialog-status.component.scss'],
})
export class DialogStatusComponent implements OnInit {
  message: string = '';
  isSuccess: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogStatusComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.message = this.data.message;
    this.isSuccess = this.data.isSuccess;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  backHome(): void {
    this.router.navigate(['/users']);
    this.onClose();
  }
}
