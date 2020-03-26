import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadSession } from '@craftsjs/boilerplate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'craftsjs-app';

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadSession());
  }

}
