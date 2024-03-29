import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { IProduct } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  products: IProduct[];

  constructor(private _catalogueService: CatalogueService, private _router:Router) { }

  ngOnInit(): void {
    this.getCatalogue();
  }

  getCatalogue(){
    this._catalogueService.getProductsPromise()
      .then(products => {this.products = products})
      .catch(err => {console.error(err);})
  }

  redirectToProduct(id: number){
    this._router.navigate(['product', id]);
  }

}