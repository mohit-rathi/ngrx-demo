import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { CounterComponent } from './counter/counter.component';
import { BookListComponent } from './book-list/book-list.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'counter',
    pathMatch: 'full',
  },
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'books',
    component: BookListComponent,
  },
  {
    path: 'products',
    component: ProductListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
