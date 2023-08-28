import {provideAnimations} from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {routes} from './app/app-routing.module'
import { environment } from "./environments/environment"
import { enableProdMode } from "@angular/core"

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent,{
  providers: [ 
   provideAnimations(),
   provideRouter(routes)
     
 ]
 
})
 .catch(err => console.error(err));
