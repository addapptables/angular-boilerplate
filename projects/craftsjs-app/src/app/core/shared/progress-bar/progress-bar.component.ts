import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  visible$: Observable<boolean>;

  sub = new Subscription();

  constructor(private readonly _progressBarService: ProgressBarService) { }

  ngOnInit() {
    this.visible$ = this._progressBarService.visible;
  }
}
