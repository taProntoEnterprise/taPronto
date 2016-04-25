import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './components/app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import { AlertService } from './services/alert.service';
import {UserService} from './services/user.service';
import 'rxjs/Rx';

var appPromise = bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, AlertService, UserService]);