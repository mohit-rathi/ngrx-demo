import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from './product.model';

export const ProductActions = createActionGroup({
  source: 'ProductList Component',
  events: {
    loadProducts: emptyProps(),
    loadProductsSuccess: props<{ products: IProduct[] }>(),
    loadProductsError: emptyProps(),
    addProduct: props<{ product: IProduct }>(),
    addProductSuccess: props<{ product: IProduct }>(),
    addProductError: emptyProps(),
    updateProduct: props<{ id: number; product: IProduct }>(),
    updateProductSuccess: props<{ product: IProduct }>(),
    updateProductError: emptyProps(),
    deleteProduct: props<{ id: number }>(),
    deleteProductSuccess: props<{ id: number }>(),
    deleteProductError: emptyProps(),
  },
});
