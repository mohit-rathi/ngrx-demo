import { createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { IProduct } from './product.model';

export const initialState: IProduct[] = [];

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadproductssuccess, (state, action) => [
    ...action.products,
  ]),
  on(ProductActions.addproductsuccess, (state, action) => [
    ...state,
    {
      id: action.product.id,
      name: action.product.name,
      category: action.product.category,
      price: action.product.price,
    },
  ]),
  on(ProductActions.updateproductsuccess, (state, action) => {
    const updatedProduct: IProduct = {
      id: action.product.id,
      name: action.product.name,
      category: action.product.category,
      price: action.product.price,
    };
    const updatedProducts = [...state];
    const index = updatedProducts.findIndex((p) => p.id === updatedProduct.id);
    updatedProducts[index] = updatedProduct;
    return [...updatedProducts];
  }),
  on(ProductActions.deleteproductsuccess, (state, action) =>
    state.filter((p) => p.id !== action.id)
  )
);
