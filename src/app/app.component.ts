import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BusyIndicatorService} from './common/services/busy-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Product-UI';
  busyIndicatorSubscription: Subscription;
  showBusyIndicator = false;
  constructor(private busyIndicatorService: BusyIndicatorService) {}

  ngOnInit(): void {
    this.busyIndicatorSubscription = this.busyIndicatorService.isBusy.subscribe(
      next => this.showBusyIndicator = next
    );
  }

  ngOnDestroy(): void {
    this.busyIndicatorSubscription.unsubscribe();
  }
}
