import { Component, OnInit, Input } from 'angular2/core';
import { Router } from 'angular2/router';
import { AlertService } from './alert.service';
import { Service } from './models/service';
import { ServiceService } from './service.service';
import { ServiceListComponent } from './service-list.component';



// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0,
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'serviceList', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/service.html',
    providers: [ServiceService],
	directives: [ServiceListComponent]
})

// Aqui eh a função em si do controller/diretiva
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