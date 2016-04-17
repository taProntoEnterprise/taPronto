import { Component, OnInit } from 'angular2/core';
import { LOGGED_USER } from './user.service';
import { Router } from 'angular2/router';
import { ProviderService } from './provider.service';
import { AlertService } from './alert.service';
import { Provider } from './models/provider';

@Component({
    selector: 'profile', 
    templateUrl: 'views/profile.html',
    providers: [ProviderService]
})

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
		this._alertService.addSuccessAlert("Dados do fornecedor cadastrados com sucesso.");
	}

	saveProvider() {
		if(this.hasProvider()){
			this.updateProvider();
		} else {
			this.registerProvider();
		}
	}

	registerProvider() {
		this.provider.phones = this.extractValuesFromList(this.phones);
		this.provider.emails = this.extractValuesFromList(this.emails);
		this.provider.addresses = this.extractValuesFromList(this.addresses);
		if(this.provider.phones.length <= 0){
			this._alertService.addErrorAlert("O fornecedor precisa ter ao menos um telefone de contato.");
		} else if(this.provider.emails.length <= 0){
			this._alertService.addErrorAlert("O fornecedor precisa ter ao menos um email.");
		} else {
			this._providerService.registerProvider(this.provider).subscribe(
				provider => this.afterRegister(provider),
				error => this.alertaErro(error))
		}
	}

	updateProvider() {
		this.provider.phones = this.extractValuesFromList(this.phones);
		this.provider.emails = this.extractValuesFromList(this.emails);
		this.provider.addresses = this.extractValuesFromList(this.addresses);
		if (this.provider.phones.length <= 0) {
			this._alertService.addErrorAlert("O fornecedor precisa ter ao menos um telefone de contato.");
		} else if(this.provider.emails.length <= 0){
			this._alertService.addErrorAlert("O fornecedor precisa ter ao menos um email.");
		} else {
			this._providerService.updateProvider(this.provider).subscribe(
				provider => this.afterRegister(provider),
				error => this.alertaErro(error))
		}
	}
	
	afterGetProvider(provider) {
		if(provider !== null){
			this.provider = provider;
			this.phones = this.getValuesFromList(provider.phones);
			this.emails = this.getValuesFromList(provider.emails);
			this.addresses = this.getValuesFromList(provider.addresses);
		}
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
			this.addNewPhone();
			this.addNewEmail();
		}
	}

	hasProvider() {
		return LOGGED_USER.provider !== undefined;
	}
}
