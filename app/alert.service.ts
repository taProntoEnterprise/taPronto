import {Injectable} from 'angular2/core';


// Velho e bom service do Angular
@Injectable() // <-- Fucking necessarios esses parenteses, foi dito umas 3 vzs para sempre colocar eles, entao deve ser importante
export class AlertService {

	public alerts : Array<Object> = [];

	public addSucessAlert(msg : string){
		this.addAlert('success', msg);
	}

	public addErrorAlert(msg : string){ 
		this.addAlert('danger', msg);
	}

	private addAlert(type : string, msg : string){
		this.alerts.push({
			type: type,
			msg: msg
		});
	}
} 