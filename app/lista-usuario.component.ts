import {Component, OnInit} from 'angular2/core';
import {Usuario} from './usuario';
import {DetalhesUsuarioComponent} from './detalhes-usuario.component';
import {UsuarioService} from './usuario.service';

// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0, 
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'lista-usuario', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/usuario.html', // template html
	directives: [DetalhesUsuarioComponent], // Aqui vc pode adicionar outros componentes, aka diretivas ao seu componente
})

// Aqui eh a função em si do controller/diretiva
export class ListaUsuarioComponent implements OnInit { 
	// Quando vc quer injetar algo vc utiliza essa notação abaixo
	constructor(private _usuarioService: UsuarioService) { }

	public produto = 'TaPronto?';

	public usuarioSelecionado: Usuario;
	public usuarios;

	onSelect(usuario: Usuario) { 
		this.usuarioSelecionado = usuario;
	};

	getUsuarios() {
		// Isso é tratamento de promise, bastante similar a linguagem funcional, lambda expressions
		this._usuarioService.getUsuarios().then(usuarios => this.usuarios = usuarios);
	};

	// Isso funciona feito o main de um controller, vc nao pode (eles pedem para não) chamar metodos
	// na declaracao do componente, por isso vc implementa esse metodo aqui e la em cima coloca esse componente
	// para implementar OnInit
	ngOnInit() {
		this.getUsuarios();
	};
}