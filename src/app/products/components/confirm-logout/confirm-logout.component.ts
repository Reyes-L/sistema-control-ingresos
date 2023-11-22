import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Products } from '../../interfaces/order.interface';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.css']
})
export class ConfirmLogoutComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmLogoutComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: Products,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void{
    this.dialogRef.close(true);
  }
}
