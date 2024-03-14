import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/product';
import { ICart } from 'src/app/cart';
import { CatalogueService } from 'src/app/catalogue.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: IProduct;

  constructor(private _catalogueService: CatalogueService, private _router: Router, private _activatedRoute: ActivatedRoute, private _cartService: CartService) { }

  ngOnInit(): void {
    const idParam = this._activatedRoute.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const id = +idParam;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this._catalogueService.getProduct(id)
      .subscribe(
        product => {
          this.product = product;
          console.log('Product retrieved:', this.product);
        },
        error => {
          console.error('Error fetching product:', error);
        }
      );
  }

  addToCart(product: IProduct, quantity: number): void {
    const cartItem: ICart = {
      id: product.id, // Usar el ID del producto
      product: product,
      quantity: quantity
    };
    this._cartService.addToCart(cartItem)
      .subscribe(
        response => {
          console.log('Producto agregado al carrito:', response);
        },
        error => {
          console.error('Error al agregar producto al carrito:', error);
        }
      );
  }
}