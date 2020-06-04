import { Component, AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ResponsiveService } from '@craftsjs/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnDestroy {

  unsubscribeAll = new Subject<any>();

  constructor(
    private readonly responsiveService: ResponsiveService
  ) { }

  ngAfterViewInit(): void {
    this.responsiveService.resize$.pipe(
      takeUntil(this.unsubscribeAll)
    )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
