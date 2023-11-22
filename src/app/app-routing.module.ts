import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ]
  },
  {
    path: 'products',
    loadChildren: ()=>import('./products/products.module').then(m=>m.ProductsModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: "products",
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: "products",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
