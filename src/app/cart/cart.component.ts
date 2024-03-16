import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { IProduct } from '../product';
import { ICart } from '../cart';
import { IUser } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: ICart;
  carts: any[];
  cartProducts: IProduct[] = [];
  currentUser: IUser;
  userCart: any;
  cartItems: ICart[] = [];

  constructor(private _cartService: CartService, private _userService: UserService ,private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getCartItems();
  }

  getCurrentUser(): void {
    this._userService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
        console.log('Current user:', this.currentUser);
        // Una vez que obtengas el usuario actual, puedes llamar a getCartForUser
        // para obtener el carrito específico del usuario.
        if (this.currentUser) {
          // Por ejemplo, asumiendo que el ID del carrito específico es 1,
          // puedes llamar a getCartForUser con el ID del usuario y el ID del carrito.
          this.getCartForUser(this.currentUser.id, 1);
        }
      },
      error => {
        console.error('Error fetching current user:', error);
      }
    );
  }

  getCartForUser(userId: number, cartId: number): void {
    this._cartService.getCartForUser(userId, cartId).subscribe(
      cart => {
        this.userCart = cart;
        console.log('User cart:', this.userCart);
        this.cartProducts = this.userCart.products; // Asigna los productos del carrito específico a cartProducts
      },
      error => {
        console.error('Error fetching user cart:', error);
      }
    );
  }

  getCart(userId: number): void {
    this._cartService.getCart(userId)
      .subscribe(
        cart => {
          this.cart = cart; // Almacena el carrito en la variable de componente
          if (cart && cart.products) {
            this.getCartProducts(cart.products); // Obtiene los productos del carrito si existen
          } else {
            console.error('El carrito no contiene la lista de productos.');
          }
        },
        error => {
          console.error('Error al obtener el carrito:', error);
        }
      );
  }

  getCartItems(): void {
    const userId = 4; // Cambiar al ID de usuario correcto
    this._cartService.getCartItems(userId).subscribe(
      cartItems => {
        this.cartItems = cartItems;
        console.log('Cart items:', this.cartItems);
        // Obtener detalles de los productos en el carrito
        this.getCartProductsDetails(this.cartItems);
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }


  getCartProducts(products: { productId: number; quantity: number; }[]): void {
    const productIds = products.map(product => product.productId);
    this._cartService.getProductsDetails(productIds).subscribe(
      detailedProducts => {
        this.cartProducts = detailedProducts;
        console.log('Productos en el carrito:', this.cartProducts);
      },
      error => {
        console.error('Error fetching cart products:', error);
      }
    );
  }

  getCartProductsDetails(products: any[]): void {
    const productIds = [].concat(...products.map((cartItem: any) => cartItem.products.map((product: any) => product.productId)));
    console.log('Product IDs:', productIds);
    this._cartService.getProductsDetails(productIds).subscribe(
      detailedProducts => {
        this.cartProducts = detailedProducts;
        console.log('Detalles de productos en el carrito:', this.cartProducts);
      },
      error => {
        console.error('Error fetching cart product details:', error);
      }
    );
  }


  redirectToProduct(productId: number): void {
    this.router.navigate(['product', productId]);
  }
}