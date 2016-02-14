import {Component, OnInit} from 'angular2/core';
import {Usuario} from './usuario';
import {DetalhesUsuarioComponent} from './detalhes-usuario.component';
import {UsuarioService} from './usuario.service';

@Component({
    selector: 'lista-usuario',
    templateUrl: 'views/usuario.html',
	directives: [DetalhesUsuarioComponent],
})

export class ListaUsuarioComponent implements OnInit { 
	constructor(private _usuarioService: UsuarioService) { }

	public produto = 'TaPronto?';

	public usuarioSelecionado: Usuario;
	public usuarios;

	onSelect(usuario: Usuario) { 
		this.usuarioSelecionado = usuario;
	};

	getUsuarios() {
		this._usuarioService.getUsuarios().then(usuarios => this.usuarios = usuarios);
	};

	ngOnInit() {
		this.getUsuarios();
	};
}