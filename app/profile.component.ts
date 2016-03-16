import {Component, OnInit} from 'angular2/core';
import {LOGGED_USER} from './user.service';
import {ProviderService} from './provider.service';
import {AlertService} from './alert.service';


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
		private _alertService: AlertService) { }
	public user = LOGGED_USER;


	public provider = {
		"phones" : ["phone"],
		"addresses" : ["address"],
		"emails" : ["email"]
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

	registerProvider(){
		this._providerService.registerProvider(this.provider).subscribe(
			provider => this.provider = provider,
			error => this.alertaErro(error))
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
		this.getProvider();
	}
}