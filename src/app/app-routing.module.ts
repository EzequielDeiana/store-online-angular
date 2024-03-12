import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ProductComponent } from './catalogue/product/product.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/catalogue', pathMatch: 'full'},
  {path: 'catalogue', component: CatalogueComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
