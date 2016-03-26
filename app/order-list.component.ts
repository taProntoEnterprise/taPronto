import { Component, Input, Output, EventEmitter} from 'angular2/core';
import { AlertService } from './alert.service';
import { Order } from './models/order';

@Component({
    selector: 'orderList', 
    templateUrl: 'views/orderList.html'
})

export class OrderListComponent {
  constructor(private _alertService: AlertService) {}

  @Output() onSelectedOrder = new EventEmitter<Object>();

  @Input() orderList; 

 	orderClick(order) {
		  this.onSelectedOrder.emit(order);
	}
}