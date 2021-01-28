import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product, ProductModel} from '../../common/models';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private httpClient: HttpClient) { }

  /**
   * To get all the products from the DB.
   */
  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/v1/product');
  }

  /**
   * To save a new product in to the DB.
   * @param productsInfo
   */
  saveProduct(productsInfo: ProductModel): Observable<Product> {
    return this.httpClient.post<Product>('/api/v1/product/save', productsInfo);
  }

  /**
   * To update a product info in the DB.
   * @param product
   */
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>('/api/v1/product/update/', product);
  }

  /**
   * To delete a product using docId.
   * @param docId
   */
  deleteProduct(docId: number): Observable<any> {
    return this.httpClient.delete('/api/v1/product/delete/' + docId);
  }
}
