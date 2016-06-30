import {coreBootstrap, ReflectiveInjector, enableProdMode} from '@angular/core';
import {browserPlatform, BROWSER_APP_PROVIDERS} from '@angular/platform-browser';
import {AppNgFactory} from './components/app.ngfactory';
import {provideStore} from '@ngrx/store'
import {users} from './reducers'

enableProdMode()

const appInjector =
    ReflectiveInjector.resolveAndCreate(BROWSER_APP_PROVIDERS.concat(provideStore({users})), browserPlatform().injector);
coreBootstrap(AppNgFactory, appInjector);
