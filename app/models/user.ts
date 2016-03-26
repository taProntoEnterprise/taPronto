import {Person} from './person';
import {Provider} from './provider';
//Funciona como um declaracao de tipo, não pode conter métodos, apenas tipagem
export interface User {
	id: string;
	username: string;
	person: Person;
	provider: Provider;
} 