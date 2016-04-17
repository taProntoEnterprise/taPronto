import { Component, OnInit, Input } from 'angular2/core';
import { Router } from 'angular2/router';
import { AlertService } from '../services/alert.service';
import { Service } from '../models/service';
import { ServiceService } from '../services/service.service';
import { ServiceListComponent } from './service-list.component';

@Component({
    selector: 'serviceList',
    templateUrl: 'views/service.html',
    providers: [ServiceService],
	directives: [ServiceListComponent]
})

export class ServiceComponent implements OnInit {
	constructor(private _router: Router,
		private _alertService: AlertService,
		private _serviceService: ServiceService) { }

	public serviceList;

	goToRegisterService() {
		this._router.navigate(['AddService']);
	}
	
	ngOnInit() {
		this._serviceService.getServices().subscribe(
			services => this.serviceList = services,
			error => console.log(error));
	}
}