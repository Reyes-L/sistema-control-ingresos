import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order, Person, Products } from '../../interfaces/order.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../../components/update-dialog/update-dialog.component';
import { ShowSnackbarService } from '../../services/show-snackbar.service';
import { FormBuilder } from '@angular/forms';
import { ValidatorFieldsService } from '../../services/validator-fields.service';

import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'pages-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'product', 'account', 'price', 'actions'];
  public dataProducts:Products[] = [];
  public dataPerson:Person = {id: '', name: '', address: '', mobile: ''};
  public param:string = '';

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar:ShowSnackbarService,
    private validatorFieldsService: ValidatorFieldsService,
    private fb: FormBuilder
    ){}
  ngOnInit(): void {
    this.getOrderByParams();
  }

  getOrderByParams(){
    this.activatedRoute.params.subscribe((params)=>{
      this.param = params['id'];
      this.ordersService.getProductById( params['id'] )
      .subscribe( e =>{
        this.dataProducts = e.products
        this.dataPerson = {id: this.param, name: e.name, address: e.address, mobile: e.mobile}
      })
    })
  }

  onDeleteProduct( index:string ):void{

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.dataProducts,
    });

    dialogRef.afterClosed().subscribe(result => {
      if( !result ) return;
      const elimate = this.dataProducts.splice(Number(index), 1);
      const productsRest = this.dataProducts;

      const dataFinal:Order =  {
        'id': this.param,
        'name': this.dataPerson.name,
        'address': this.dataPerson.address,
        'mobile': this.dataPerson.mobile,
        'products': productsRest
      }

      this.ordersService.onDeleteProductOfOrderById( this.param, dataFinal  ).subscribe();
      this.dataProducts = this.dataProducts.filter(e=> e.id !== elimate[0].id );

    });

  }

  onUpdateProduct( index: string ){

    const valueProduct:Products|undefined = structuredClone(this.dataProducts.at( Number(index)));

    const editProduct:Products|undefined = this.dataProducts.at( Number(index));

    const dialogRef = this.dialog.open(UpdateDialogComponent, {
    data: editProduct,
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if( !result ){
          this.dataProducts.at(Number(index))!.id =  valueProduct!.id;
          this.dataProducts.at(Number(index))!.product =  valueProduct!.product;
          this.dataProducts.at(Number(index))!.account =  Number(valueProduct!.account);
          this.dataProducts.at(Number(index))!.price =  Number(valueProduct!.price);
          return;
        }

        this.dataProducts.splice(Number(index), 1, {id: editProduct!.id, product: editProduct!.product, account: Number(editProduct!.account), price: Number(editProduct!.price),});

        const dataFinal:Order =  {
          'id': this.param,
          'name': this.dataPerson.name,
          'address': this.dataPerson.address,
          'mobile': this.dataPerson.mobile,
          'products': this.dataProducts
        }

        this.ordersService.onDeleteProductOfOrderById( this.param, dataFinal ).subscribe()
        this.snackbar.showSnackbarProduct(`Product ${valueProduct!.product} Updated!`);
    });
  }

  onAddNewProduct():void{
    const newProduct:string = '';
    const newAccount:number = 0;
    const newPrice:number = 0;

    const infoNewProduct = {
      id: uuidv4(),
      product: newProduct,
      account: newAccount,
      price: newPrice
    }

    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: infoNewProduct
    });

    dialogRef.afterClosed()
    .subscribe(result => {
      if( !result ) return;


      this.dataProducts.push({
          id: infoNewProduct.id,
          product: infoNewProduct.product,
          account: Number(infoNewProduct.account),
          price: Number(infoNewProduct.price)
        });

      const addProduct = {
        id: uuidv4(),
        name: this.dataPerson.name,
        address: this.dataPerson.address,
        mobile: this.dataPerson.mobile,
        products: this.dataProducts
      }

      this.ordersService.onDeleteProductOfOrderById(this.param, addProduct).subscribe();
      this.dataProducts = this.dataProducts.filter(e => e );
      this.snackbar.showSnackbarProduct(`Product ${infoNewProduct.product} Aggregated!`);
    });

  }


}
