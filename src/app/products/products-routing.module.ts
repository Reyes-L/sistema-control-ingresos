import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { FullViewOrderComponent } from './pages/full-view-order/full-view-order.component';
import { UpdateOrderComponent } from './pages/update-order/update-order.component';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchOrderComponent } from './pages/search-order/search-order.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'full-view-order', component: FullViewOrderComponent,},
      {path: 'new-order', component: NewOrderComponent,},
      {path: 'search-order', component: SearchOrderComponent,},
      {path: 'view-order/:id', component: ViewOrderComponent,},
      {path: 'update-order', component: UpdateOrderComponent,},
      {path: '**', redirectTo: 'full-view-order',},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
