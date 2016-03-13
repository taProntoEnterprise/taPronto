import {Component} from 'angular2/core';


// Funciona como declaracao do controller/diretiva, tudo é diretiva no angular 2.0,
// por isso é chamado de componente agora, um componente pode ter outros componentes
// e acessarem 'certas' coisas deles. Bem vago.
@Component({
    selector: 'help', // nome utilizado no HTML para importar a diretiva
    templateUrl: 'views/help.html'
})

// Aqui eh a função em si do controller/diretiva
export class HelpComponent {
}