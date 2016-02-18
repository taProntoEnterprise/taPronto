import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
	
@Component({
	selector: 'add-usuario',
  	templateUrl: 'views/addUsuario.html',
})


export class AddUsuarioComponent{
	constructor(
		private http: Http) {
	}

    private _usuariosUrl = 'http://localhost:3000/users/addUser';

	voltar() {
		window.history.back();
	}

	public novoUsuario = {
		username: "",
		password: ""
	}

	addUsuario () {
		let body = JSON.stringify(this.novoUsuario);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		this.http.post(this._usuariosUrl, body, options)
			.map(res => <Object>res.json().data)
			.do(info => this.voltar())
			.catch(this.handleError)
			.subscribe(res => console.log(res));
	}

 	private handleError (error: Response) {
	   console.error(error);
	   return Observable.throw(error.json().error || 'Server error');
	}
}