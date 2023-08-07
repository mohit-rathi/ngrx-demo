import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductActions } from '../store/products/product.actions';

// interfaces
import { IProduct } from '../store/products/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public productForm!: FormGroup;

  public productList$!: Observable<IProduct[]>;

  public categoryList: string[] = [
    'Electronics',
    'Furniture',
    'Healthcare',
    'Fashion',
  ];

  public editProduct: IProduct | undefined;

  constructor(
    private store: Store<{ products: IProduct[] }>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.productList$ = this.store.select('products');
    this.store.dispatch(ProductActions.loadproducts());
  }

  public initializeForm(): void {
    this.productForm = this.fb.group({
      name: this.fb.control(this.editProduct?.name ?? null, [
        Validators.required,
      ]),
      category: this.fb.control(this.editProduct?.category ?? null, [
        Validators.required,
      ]),
      price: this.fb.control(this.editProduct?.price ?? null, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  public addProduct(): void {
    const product: IProduct = {
      name: this.productForm.value.name,
      category: this.productForm.value.category,
      price: this.productForm.value.price,
    };
    this.store.dispatch(ProductActions.addproduct({ product }));
    this.productForm.reset();
  }

  public updateProduct(): void {
    const id: number = this.editProduct?.id!;
    const product: IProduct = {
      name: this.productForm.value.name,
      category: this.productForm.value.category,
      price: this.productForm.value.price,
    };
    this.store.dispatch(ProductActions.updateproduct({ id, product }));
    this.onCancel();
  }

  public deleteProduct(id: number): void {
    this.onCancel();
    if (confirm('Are you sure you want to delete this product?')) {
      this.store.dispatch(ProductActions.deleteproduct({ id }));
    }
  }

  public onEdit(product: IProduct): void {
    this.editProduct = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
    };
    this.initializeForm();
  }

  public onCancel(): void {
    this.editProduct = undefined;
    this.initializeForm();
  }
}
