import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/product';
import { ICart } from '../cart';
import { CatalogueService } from 'src/app/catalogue.service';
import { CartService } from 'src/app/cart.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: ICart[];
  cartsProducts: IProduct[] = [];
  selectedId: number;
  selectedProductId: number;

  ngOnInit(): void {
    this.getCartItems();
  }


  getCartItems(): void {
    this._cartService.getCartItems()
      .subscribe(
        cartItems => {
          this.carts = cartItems;
          this.getCartProducts(); // Llamar a getCartProducts después de obtener los elementos del carrito
        },
        error => {
          console.error('Error al obtener los elementos del carrito:', error);
        }
      );
  }
  
  getCartProducts(): void {
    const request = this.carts.map(cartItem => cartItem.product);
    forkJoin(request)
      .subscribe(products => {
        this.cartsProducts = products;
      });
  }

  selectedProduct(productId: number) {
    this.selectedProductId = productId;
  }

  constructor(private _catalogueService: CatalogueService, private _router: Router, private _activatedRoute: ActivatedRoute, private _cartService: CartService) { }

}
