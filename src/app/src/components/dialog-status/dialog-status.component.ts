import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
export interface DialogData {
  status: string;
  message: string;
}

@Component({
  selector: 'app-dialog-status',
  templateUrl: './dialog-status.component.html',
  styleUrls: ['./dialog-status.component.scss'],
})
export class DialogStatusComponent implements OnInit {
  message: string = '';
  status: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogStatusComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.message = this.data.message;
    this.status = this.data.status;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  backHome(): void {
    this.router.navigate(['/users']);
    this.onClose();
  }
}
