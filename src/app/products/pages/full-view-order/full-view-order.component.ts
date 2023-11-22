import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Order, Products } from '../../interfaces/order.interface';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pages-full-view-order',
  templateUrl: './full-view-order.component.html',
  styleUrls: ['./full-view-order.component.css']
})
export class FullViewOrderComponent implements OnInit {

  displayedColumns: string[] = ['index', 'product', 'account', 'price'];

  public totalProduct:number = 0;
  public totalPrice:number = 0;

  public dataSource:Products[] = [];

  public orders:Order[] = [];
  route: any;
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private dialog:MatDialog,
    ){}

  ngOnInit(): void {
    this.ordersService.orders.subscribe( (data:Order[]) =>{
      this.orders = data;
    });
  }

  getProductById( id:string ){
    this.ordersService.getProductById(id)
    .subscribe( (data) => {
      this.router.navigate(['../view-order', {id: data.id}]);
    });
  }

  onDeleteOrder( id:string ){

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.orders
    });

    dialogRef.afterClosed().subscribe( result => {
      if( !result ) return;

      this.ordersService.onDeleteOrderById(id)
      .subscribe(()=>{
        this.orders = this.orders.filter(order => order.id !== id);
      })
    });
  }

}
