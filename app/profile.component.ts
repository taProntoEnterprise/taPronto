import {Component, OnInit} from 'angular2/core';
import {LOGGED_USER} from './user.service';
import { Router } from 'angular2/router';
import {ProviderService} from './provider.service';
import {AlertService} from './alert.service';
import { Provider } from './provider';


// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0,
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'profile', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/profile.html',
    providers: [ProviderService]
})

// Aqui eh a função em si do controller/diretiva
export class ProfileComponent implements OnInit {
	constructor(private _providerService: ProviderService,
		private _alertService: AlertService,
		private _router : Router) { }
	public user = LOGGED_USER;


	public provider = {
		"phones" : [],
		"addresses" : [],
		"emails" : []
	}

	addNewPhone() {
		this.provider.phones.push("");
	}

	addNewAddress() {
		this.provider.addresses.push("");
	}

	addNewEmail() {
		this.provider.emails.push("");
	}

	afterRegister(provider){
		this.provider = provider;
		LOGGED_USER.provider = provider._id;
 		this._router.navigate(["Service"]);
		this._alertService.addSucessAlert("Dados do fornecedor cadastrados com sucesso.");
	}

	registerProvider() {
		if(this.provider.phones.length <= 0){
			this._alertService.addErrorAlert("O fornecedor precisa ter ao menos um telefone de contato.");
		} else {
			this._providerService.registerProvider(this.provider).subscribe(
				provider => this.afterRegister(provider),
				error => this.alertaErro(error))
		}
	}

	getProvider(){
		this._providerService.getServices().subscribe(
			provider => this.provider = provider,
			error => this.alertaErro(error))
	}

	alertaErro(error){
		this._alertService.addErrorAlert(error.message);
	}

	ngOnInit() {
		if(LOGGED_USER.id !== undefined){
			this.getProvider();
		}
	}

	hasProvider() {
		return LOGGED_USER.provider !== undefined;
	}
}