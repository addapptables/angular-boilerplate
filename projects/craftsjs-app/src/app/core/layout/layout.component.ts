import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PerfectScrollbarDirective } from '@craftsjs/perfect-scrollbar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  @ViewChild(PerfectScrollbarDirective)
  perfectScrollbarDirective: PerfectScrollbarDirective;

}
