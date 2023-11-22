import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../interfaces/order.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'pages-search-order',
  templateUrl: './search-order.component.html',
  styleUrls: ['./search-order.component.css']
})
export class SearchOrderComponent implements OnInit {
  public searchInput = new FormControl('');
  public orders: Order[] = [];
  public selectedOrder?:Order ;

  constructor(private ordersService: OrdersService){}

  ngOnInit(): void {
  }

  searchOrder(){
    const value:string = this.searchInput.value || '';
    this.ordersService.getSuggestions(value)
    .subscribe(order => this.orders = order);
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ):void {
    if( !event.option.value ){
      this.selectedOrder = undefined;
      return;
    }

    const order:Order = event.option.value;
    this.searchInput.setValue( order.name );
    this.selectedOrder = order;
  }
}
