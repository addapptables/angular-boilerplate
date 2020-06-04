import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  private _visible: BehaviorSubject<boolean>;

  get visible(): Observable<boolean> {
    return this._visible.asObservable();
  }

  constructor(private readonly _router: Router) {
    this._init();
  }

  private _init() {
    this._visible = new BehaviorSubject(false);
    this._router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this._visible.next(true);
      });

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel))
      .subscribe(() => {
        this._visible.next(false);
      });
  }
}
