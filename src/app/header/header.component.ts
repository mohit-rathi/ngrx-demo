import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public title = 'NgRx Demo';

  public navList = [
    {
      title: 'Counter',
      link: '/counter',
    },
    {
      title: 'Books',
      link: '/books',
    },
    {
      title: 'Products',
      link: '/products',
    },
  ];
}
