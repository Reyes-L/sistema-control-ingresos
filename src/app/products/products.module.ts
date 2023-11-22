import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { UpdateOrderComponent } from './pages/update-order/update-order.component';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { FullViewOrderComponent } from './pages/full-view-order/full-view-order.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { SearchOrderComponent } from './pages/search-order/search-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmLogoutComponent } from './components/confirm-logout/confirm-logout.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';


@NgModule({
  declarations: [
    NewOrderComponent,
    UpdateOrderComponent,
    ViewOrderComponent,
    FullViewOrderComponent,
    LayoutPageComponent,
    SearchOrderComponent,
    ConfirmDialogComponent,
    ConfirmLogoutComponent,
    UpdateDialogComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
