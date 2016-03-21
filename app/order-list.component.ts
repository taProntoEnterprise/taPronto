import { Component, OnInit, Input } from 'angular2/core';
import { Router } from 'angular2/router';
import { AlertService } from './alert.service';
import { Order } from './models/order';


// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0,
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'order', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/orderList.html'
})

// Aqui eh a função em si do controller/diretiva
export class OrderListComponent {
 	constructor(private _router: Router,
	     private _alertService: AlertService) {}

	  public orderClick = function orderClick(service) {
  		this._alertService.addErrorAlert("Não implementado.")
	}

	@Input() set clickFunction(clickFunction){
		this.orderClick = clickFunction || this.orderClick;
	}

	public orderList;

	goToRegisterOrder() {
		this._router.navigate(['AddOrder']);
	}

	ngOnInit() {
	//	this._serviceService.getServices().subscribe(
	//		services => this.serviceList = services,
	//		error => console.log(error));
	}

}