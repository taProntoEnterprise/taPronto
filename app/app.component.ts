import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { UsuarioService } from './usuario.service';
import { ListaUsuarioComponent } from './lista-usuario.component';
import { AdminUsuarioComponent } from './admin-usuario.component';

@Component({
  selector: 'my-app',
  templateUrl: 'views/home.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    UsuarioService
  ]
})

@RouteConfig([
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: ListaUsuarioComponent,
    useAsDefault: true
    },
    {
    path: '/usuario/:login',
    name: 'Usuario',
    component: AdminUsuarioComponent,
  },
])

export class AppComponent {

}