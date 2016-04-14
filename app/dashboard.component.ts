import { Component, OnInit} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import { ServiceComponent } from './service.component';
import { OrderComponent } from './order.component';
import { AddOrderComponent } from './add-order.component';
import { ProfileComponent } from './profile.component';
import { HelpComponent } from './help.component';
import { AddServiceComponent } from './add-service.component'
import { NgClass } from 'angular2/common';
import { AlertService } from './alert.service'
import { User } from './models/user';
import { UserService, LOGGED_USER } from './user.service';

@Component({
  selector: "dashboard",
  templateUrl: 'views/dashboard.html',
  directives: [ROUTER_DIRECTIVES, NgClass]
})

// Router config da vida, onde coloca as views e o path de cada uma dela

@RouteConfig([
    {
      path: '/service',  
      name: 'Service', 
      component: ServiceComponent,
      useAsDefault: true
    },  
    {
      path: '/addService',
      name: 'AddService',
      component: AddServiceComponent
    }, 
    {
      path: '/order',
      name: 'Order', 
      component: OrderComponent
    },
    {
      path: '/addOrder',
      name: 'AddOrder',
      component: AddOrderComponent
    }, 
    {
      path: '/profile',  
      name: 'Profile', 
      component: ProfileComponent
    },
    {
      path: '/help',  
      name: 'Help', 
      component: HelpComponent
    }
])

export class DashboardComponent implements OnInit{
  constructor(private _router: Router,
    private _alertService: AlertService) {}

  public currentRoute = "Service";

  public isOn(route : string){
    return route == this.currentRoute;
  }

  public goTo(route : string){
    if(route == 'Inicio' || route == "Help"){
      this._alertService.addErrorAlert("Não implementado.")
    } else {
      if(this.hasProvider()){
        this._router.navigate([route]);
        this.currentRoute = route;
      } else {
       this._alertService.addErrorAlert("O cadastro de fornecedor é necessario para continuar.")
      }
    }
  }

  ngOnInit() {
    if (!this.hasProvider()){
      this.currentRoute = "Profile";
      this._router.navigate(["Profile"]);
    }
  }

  hasProvider() {
    return LOGGED_USER.provider !== undefined;
  }
} 