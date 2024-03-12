import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/product';
import { CatalogueService } from 'src/app/catalogue.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: IProduct;
  rating: object;

  constructor( private _catalogueService:CatalogueService, private _router:Router, private _activatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    const idParam = this._activatedRoute.snapshot.paramMap.get('id');
    if(idParam !== null){
      const id = +idParam;
      this.getProduct(id);
    }
  }

  getProduct(id: number){
    this._catalogueService.getProduct(id)
    .then(product => {
      this.product = product;
      console.log(this.product);
    })
    .catch(err => console.error(err));
  }

}
