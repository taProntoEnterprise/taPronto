import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { LoginComponent } from './login.component';

@Component({
  selector: 'my-app',
  templateUrl: 'views/home.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS
  ]
})

// Router config da vida, onde coloca as views e o path de cada uma dela
@RouteConfig([
  {
    path: '/',  // path que aparece na URL
    name: 'User', // Nome oficial da rota, utilizado por anchor ou route.go, navigate, etc
    component: LoginComponent, // Componente a ser utilizado, o route-outlet sera substituido por esse componente
    useAsDefault: true // intuitivo 
    }
])

export class AppComponent {

}