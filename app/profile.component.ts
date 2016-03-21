import {Component, OnInit} from 'angular2/core';
import {LOGGED_USER} from './user.service';
import { Router } from 'angular2/router';
import {ProviderService} from './provider.service';
import {AlertService} from './alert.service';
import { Provider } from './models/provider';


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

	public phones = [];
	public addresses = [];
	public emails = [];
	
	public provider : Provider = {
		"name" : "",
		phones: [],
		documentType: "",
		documentNumber: "",
		addresses: [],
		emails: [],
		description :  ""
	}
	
	extractValuesFromList(list) {
		var newList = [];
		for (var i=0; i < list.length; i++) {
			if (list[i].value !== undefined && list[i].value.trim() !== "") {
				newList.push(list[i].value);
			}
		}
		return newList;
	}
	
	getValuesFromList(list) {
		var newList = [];
		if (list !== undefined) {
			for (var i=0; i < list.length; i++) {
				newList.push({value:list[i]});
			}
		}
		return newList;
	}

	addNewPhone() {
		this.phones.push({});
	}

	addNewAddress() {
		this.addresses.push({});
	}

	addNewEmail() {
		this.emails.push({});
	}

	afterRegister(provider){
		this.provider = provider;
		LOGGED_USER.provider = provider._id;
 		this._router.navigate(["Service"]);
		this._alertService.addSuccessAlert("Dados do fornecedor cadastrados com sucesso.");
	}

	registerProvider() {
		this.provider.phones = this.extractValuesFromList(this.phones);
		this.provider.emails = this.extractValuesFromList(this.emails);
		this.provider.addresses = this.extractValuesFromList(this.addresses);
		if(this.provider.phones.length <= 0){
			this._alertService.addErrorAlert("O fornecedor precisa ter ao menos um telefone de contato.");
		} else {
			this._providerService.registerProvider(this.provider).subscribe(
				provider => this.afterRegister(provider),
				error => this.alertaErro(error))
		}
	}
	
	afterGetProvider(provider) {
		this.provider = provider;
		this.phones = this.getValuesFromList(provider.phones);
		this.emails = this.getValuesFromList(provider.emails);
		this.addresses = this.getValuesFromList(provider.addresses);
	}

	getProvider(){
		this._providerService.getServices().subscribe(
			provider =>this.afterGetProvider(provider),
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