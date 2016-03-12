import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import { AlertService } from './alert.service';
import 'rxjs/Rx';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, AlertService]);