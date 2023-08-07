import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { ProductActions } from './product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadproducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadproductssuccess({ products })),
          catchError(() => of(ProductActions.loadproductserror()))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addproduct),
      switchMap(({ product }) =>
        this.productService.addProduct(product).pipe(
          map((product) => ProductActions.addproductsuccess({ product })),
          catchError(() => of(ProductActions.addproducterror()))
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateproduct),
      switchMap(({ id, product }) =>
        this.productService.updateProduct(id, product).pipe(
          map((product) => ProductActions.updateproductsuccess({ product })),
          catchError(() => of(ProductActions.updateproducterror()))
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteproduct),
      switchMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => ProductActions.deleteproductsuccess({ id })),
          catchError(() => of(ProductActions.deleteproducterror()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
