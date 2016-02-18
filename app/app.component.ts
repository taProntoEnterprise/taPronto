import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { UsuarioService } from './usuario.service';
import { ListaUsuarioComponent } from './lista-usuario.component';
import { AdminUsuarioComponent } from './admin-usuario.component';
import { AddUsuarioComponent } from './add-usuario.component';

@Component({
  selector: 'my-app',
  templateUrl: 'views/home.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    UsuarioService
  ]
})

// Router config da vida, onde coloca as views e o path de cada uma dela
@RouteConfig([
  {
    path: '/',  // path que aparece na URL
    name: 'Usuarios', // Nome oficial da rota, utilizado por anchor ou route.go, navigate, etc
    component: ListaUsuarioComponent, // Componente a ser utilizado, o route-outlet sera substituido por esse componente
    useAsDefault: true // intuitivo 
    },
    {
      path: '/usuario/:login',
    name: 'Usuario',
    component: AdminUsuarioComponent,
  },
  {
      path: '/usuario/addUsuario',
    name: 'AddUsuario',
    component: AddUsuarioComponent,
  }
])

export class AppComponent {

}