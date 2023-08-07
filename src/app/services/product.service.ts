import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

import { environment as env } from 'src/environments/environment.development';

// interfaces
import { IProduct } from '../store/products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  public getProducts() {
    return this._http.get<IProduct[]>(env.apiBaseUrl).pipe(delay(3000));
  }

  public addProduct(product: IProduct) {
    return this._http.post<IProduct>(env.apiBaseUrl, product).pipe(delay(2000));
  }

  public updateProduct(id: number, product: IProduct) {
    return this._http
      .put<IProduct>(`${env.apiBaseUrl}/${id}`, product)
      .pipe(delay(2000));
  }

  public deleteProduct(id: number) {
    return this._http.delete(`${env.apiBaseUrl}/${id}`).pipe(delay(2000));
  }
}
