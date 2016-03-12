import {Person} from './person';
//Funciona como um declaracao de tipo, não pode conter métodos, apenas tipagem
export interface User {
	username: string;
  	password: string;
	person: Person;
} 