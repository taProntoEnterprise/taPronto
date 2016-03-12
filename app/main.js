System.register(['angular2/platform/browser', 'angular2/http', './app.component', 'angular2/router', './alert.service', 'rxjs/Rx'], function(exports_1) {
    var browser_1, http_1, app_component_1, router_1, alert_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS, alert_service_1.AlertService]);
        }
    }
});
//# sourceMappingURL=main.js.map