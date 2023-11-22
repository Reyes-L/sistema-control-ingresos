import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorFieldsService } from '../../services/validator-fields.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { UpdateDialogComponent } from '../../components/update-dialog/update-dialog.component';
import { OrdersService } from '../../services/orders.service';

import {v4 as uuidv4} from 'uuid';
import { Products } from '../../interfaces/order.interface';
import { ShowSnackbarService } from '../../services/show-snackbar.service';


@Component({
  selector: 'pages-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  public newProduct:FormControl = new FormControl('', Validators.required);
  public newAccount: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.validatorFieldsService.pattersNumber)]);
  public newPrice: FormControl = new FormControl('', [Validators.required, Validators.pattern(this.validatorFieldsService.pattersNumber)]);

  public myForm: FormGroup = this.fb.group({
    id:  [uuidv4(), Validators.required],
    name: ['', Validators.required],
    address: ['', Validators.required],
    mobile: ['', Validators.required],
    products: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private validatorFieldsService: ValidatorFieldsService,
    private dialog:MatDialog,
    private ordersService: OrdersService,
    private snackbar: ShowSnackbarService
    ){}

  ngOnInit(): void {
  }

  get products(){
    return this.myForm.get('products') as FormArray;
  }

  onAddNewProduct():void{
    if( !this.newProduct.valid || !this.newAccount.valid || !this.newPrice.valid){
      this.newProduct.markAllAsTouched();
      this.newAccount.markAllAsTouched();
      this.newPrice.markAllAsTouched();
      return;
    };

    const newProduct = this.newProduct.value;
    const newAccount = this.newAccount.value;
    const newPrice = this.newPrice.value;

    this.products.push( this.fb.control(
      {
        id: uuidv4(),
        product: newProduct,
        account: newAccount,
        price: newPrice,
      }, Validators.required) );

    this.snackbar.showSnackbarProduct(`Product ${this.newProduct.value} aggregate!`);

    this.resetCamps();
  }

  onDeleteProduct( index:number ):void{
    const product:Products = this.products.at(index).value;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.products.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      if( !result ) return;

      this.snackbar.showSnackbarProduct(`Product ${ product.product } deleted!`);
      this.products.removeAt(index);
    });

  }

  onUpdateProduct( index:number ){
    const valueProduct:Products = {...this.products.at( index ).value};
    const editProduct:Products = this.products.at( index ).value;

    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: editProduct,
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if( !result ){
        this.products.at(index).setValue( valueProduct );
        return;
      }

      this.products.at( index ).setValue( editProduct );
      this.snackbar.showSnackbarProduct(`Product ${valueProduct.product} Updated!`);
    });
  }

  resetCamps():void{
    this.newProduct.reset();
    this.newAccount.reset();
    this.newPrice.reset();
  }

  onSubmit():void{
    if( !this.myForm.valid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.ordersService.onAddOrder(this.myForm.value).subscribe();

    this.snackbar.showSnackbarOrder(`Order of ${this.myForm.controls['name'].value} created!`);
    (this.myForm.controls['products'] as FormArray) = this.fb.array([]);
    this.resetCamps();
    this.myForm.reset();
  }


}
