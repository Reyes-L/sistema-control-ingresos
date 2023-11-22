import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, Products } from '../interfaces/order.interface';
import { Observable, filter, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public url: string = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    ) { }

  get orders():Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/orders`);
  }

  getProductById( id:string ){
    return this.http.get<Order>(`${this.url}/orders/${id}`);
  }

  onAddOrder( order:Order ){
    return this.http.post(`${this.url}/orders`, order);
  }

  onDeleteOrderById( id:string ){
    return this.http.delete(`${this.url}/orders/${id}`);
  }

  onDeleteProductOfOrderById( id:string, update:Order ){

    return this.http.patch(`${this.url}/orders/${id}`, update);
  }

  getSuggestions( query: string ): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.url}/orders?q=${ query }`);
  }

}
