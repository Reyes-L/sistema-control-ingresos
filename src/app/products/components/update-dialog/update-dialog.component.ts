import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Products } from '../../interfaces/order.interface';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  // public infoFormUpdate: Products = {
  //   id:'', product:'', account: 0, price: 0
  // };

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Products,
  ) {}
  ngOnInit(): void {
    // this.data = this.infoFormUpdate;
  }

  // getInfoUpdate(): Products{

  // }


  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void{
    this.dialogRef.close(true);
  }


}
