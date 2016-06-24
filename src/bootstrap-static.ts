//custom bootstrap function w/o the compiler
import {ApplicationRef, ComponentRef, PLATFORM_DIRECTIVES, PLATFORM_PIPES, ReflectiveInjector, Type, coreBootstrap, enableProdMode} from '@angular/core';
import {BROWSER_APP_PROVIDERS, browserPlatform} from '@angular/platform-browser';

enableProdMode()
export function createCustomBootstrapper(customProviders?:any[]){
  let providers = [
    BROWSER_APP_PROVIDERS,
    customProviders ? customProviders : []
  ];

  var appInjector = ReflectiveInjector.resolveAndCreate(providers, browserPlatform().injector);

  return function bootstrap(componentFactory) {
    return coreBootstrap(componentFactory, appInjector);
  }

}
