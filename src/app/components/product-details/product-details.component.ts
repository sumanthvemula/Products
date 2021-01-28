import { Component, OnInit } from '@angular/core';
import {ProductDetailsService} from './product-details.service';
import {Product, ProductModel} from '../../common/models';
import { v4 as uuidv4 } from 'uuid';
import {BusyIndicatorService} from '../../common/services/busy-indicator.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public products: Product[] = [];

  constructor(private productDetailsService: ProductDetailsService,
              private busyIndicatorService: BusyIndicatorService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  /**
   * To update the product by using document id.
   * @param productId
   */
  public updateProduct(productId: number): void {
    const productInfo = this.products.find(each => each.productId === productId);
    if (productInfo) {
      this.busyIndicatorService.isBusy.next(true);
      this.productDetailsService.updateProduct(productInfo).subscribe(
        result => {
          this.busyIndicatorService.isBusy.next(false);
          // Display update successful Toaster or Banner
        }, error => {
          this.busyIndicatorService.isBusy.next(false);
          // Handle error to display Toasters or banners
          console.log('error obtained while updating record', error);
        }
      );
    }
  }

  /**
   * To delete the product using document id
   * @param docId
   */
  public deleteProduct(docId: number): void {
    this.busyIndicatorService.isBusy.next(true);
    this.productDetailsService.deleteProduct(docId).subscribe(
      result => {
        this.busyIndicatorService.isBusy.next(false);
        // Display delete successful Toaster or Banner
        const productIndex = this.products.findIndex(each => each._id === docId);
        if (productIndex !== -1) {
          this.products.splice(productIndex, 1);
        }
      }, error => {
        this.busyIndicatorService.isBusy.next(false);
        // Handle error to display Toasters or banners
        console.log('error obtained while deleting record', error);
      }
    );
  }

  /**
   * To add a new product in to the DB.
   */
  addProduct(): void {
    let newProductInfo = new ProductModel();
    newProductInfo = {...newProductInfo, productId: this.getRandomId(), price: 0, quantity: 0, productName: 'New Product', description: ''};
    this.busyIndicatorService.isBusy.next(true);
    this.productDetailsService.saveProduct(newProductInfo).subscribe(
      result => {
        this.busyIndicatorService.isBusy.next(false);
        // Display insert successful Toaster or Banner
        this.products.push(result);
      }, error => {
        this.busyIndicatorService.isBusy.next(false);
        // Handle error to display Toasters or banners
        console.log('error obtained while insert record', error);
      }
    );
  }

  /**
   * To get all products from the DB
   * @private
   */
  private getAllProducts(): void {
    this.busyIndicatorService.isBusy.next(true);
    this.productDetailsService.getAllProducts().subscribe(
      result => {
        this.busyIndicatorService.isBusy.next(false);
        this.products = result;
      }, error => {
        this.busyIndicatorService.isBusy.next(false);
        // Handle error to display Toasters or banners
        console.log('error obtained while fetching all records', error);
      }
    );
  }

  /**
   * To create a random product id.
   * @private
   */
  private getRandomId(): number {
    return uuidv4();
  }

}
