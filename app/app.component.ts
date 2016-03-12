import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { LoginComponent } from './login.component';
import { AddUserComponent } from './add-user.component';
import { Alert } from 'ng2-bootstrap/ng2-bootstrap';
import { AlertService } from './alert.service';

@Component({
  selector: 'my-app',
  templateUrl: 'views/home.html',
  directives: [ROUTER_DIRECTIVES, Alert],
  providers: [
    ROUTER_PROVIDERS,AlertService
  ]
})

// Router config da vida, onde coloca as views e o path de cada uma dela
@RouteConfig([
  {
    path: '/',  // path que aparece na URL
    name: 'User', // Nome oficial da rota, utilizado por anchor ou route.go, navigate, etc
    component: LoginComponent, // Componente a ser utilizado, o route-outlet sera substituido por esse componente
    useAsDefault: true // intuitivo 
  },
  {
    path: '/user',  // path que aparece na URL
    name: 'AddUser', // Nome oficial da rota, utilizado por anchor ou route.go, navigate, etc
    component: AddUserComponent // Componente a ser utilizado, o route-outlet sera substituido por esse componente
  }
])

export class AppComponent {
  constructor(private _alertService: AlertService) { }

  public alerts = this._alertService.alerts;
  public service = this._alertService;

  closeAlert(i: number) {
    this._alertService.alerts.splice(i, 1);
  }
}