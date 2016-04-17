import { Component, Input, Output, EventEmitter} from 'angular2/core';
import { AlertService } from '../services/alert.service';
import { Service } from '../models/service';

@Component({
    selector: 'serviceList', 
    templateUrl: 'views/serviceList.html'
})

export class ServiceListComponent {
  constructor(private _alertService: AlertService) {}

  @Output() onSelectedService = new EventEmitter<Object>();

  @Input() serviceList; 

 	serviceClick(service) {
		  this.onSelectedService.emit(service);
	}
}