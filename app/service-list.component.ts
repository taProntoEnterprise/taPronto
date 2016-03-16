import {Component, OnInit} from 'angular2/core';
import { Service } from './service';
import { Router } from 'angular2/router';
import { AlertService } from './alert.service';
import { ServiceService } from './service.service';
 

// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0,
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'service', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/serviceList.html',
    providers: [ ServiceService ]
})

// Aqui eh a função em si do controller/diretiva
export class ServiceComponent implements OnInit {
  constructor(private _router: Router,
	     private _alertService: AlertService,
		 private _serviceService:  ServiceService) {}

	public serviceList;
		
	goToRegisterService() {
		this._router.navigate(['AddService']);
	}

	showFilterOptions() {
		this._alertService.addErrorAlert("Não implementado.")
	}
	
	ngOnInit() {
		this._serviceService.getServices().subscribe(
			services => this.serviceList = services,
			error => console.log(error));
	}
}


// MOCK de Services, apagar qnd service.service tiver pronto <-- hihi, service service, hihi
var SERVICES = [{
				name: "Formatar Computador",
				description: "Apenas clicar no botaozinho do windows10 de formatar e esperar. PS: cobrar caro"
			},
			{
				name: "Desinstalar BAIDU",
				description: "No minimo 3 meses para entrega, fazer antes backup do computador e dos outros que estiverem " +
				"proximo ao recinto na hora do exorcismo"
			},
			{
			name: "Converter Angular 2.0 em Angular de gente normal",
			description: "Requer paladino lvl 90 full holy. Tempo de entrega indeterminado"
			}
		];	
 