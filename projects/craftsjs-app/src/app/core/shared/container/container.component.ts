import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  host: {
    class: 'container-fluid'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent { }
