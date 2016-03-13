import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import { ServiceComponent } from './service-list.component';
import { OrderComponent } from './order.component';
import { ProfileComponent } from './profile.component';
import { HelpComponent } from './help.component';
import { NgClass } from 'angular2/common';

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
      component: ServiceComponent
    },
    {
      path: '/order',  
      name: 'Order', 
      component: OrderComponent,
      useAsDefault: true
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

export class DashboardComponent {
  constructor(public _router: Router) {}
 
  public currentRoute = "Order";

  public isOn(route : string){
    return route == this.currentRoute;
  }

  public goTo(route : string){
    this._router.navigate([route]);
  }

} 