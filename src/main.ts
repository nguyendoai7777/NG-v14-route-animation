import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot([
      {
        path: 'login',
        loadComponent: () => import('src/app/screens/login/login.component').then(c => c.LoginComponent),
        data: { state: 'login' }
      },
      {
        path: 'ios-picker',
        loadComponent: () => import('src/app/screens/ios-date-picker/ios-date-picker.component').then(c => c.IosDatePickerComponent),
        data: { state: 'ios-picker' }
      },
    ]), BrowserAnimationsModule)
  ]
}).then((_) => {

}).catch((err) => {
  console.log(err)
})
