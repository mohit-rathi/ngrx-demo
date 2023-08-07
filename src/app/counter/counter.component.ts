import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CounterActions from '../store/counter/counter.actions';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  count$!: Observable<number>;

  constructor(private store: Store<{ count: number }>) {}

  ngOnInit(): void {
    this.count$ = this.store.select('count');
  }

  public increment(): void {
    this.store.dispatch(CounterActions.increment());
  }

  public decrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }

  public reset(): void {
    this.store.dispatch(CounterActions.reset());
  }
}
