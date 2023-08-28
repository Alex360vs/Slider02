import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';




export const routes: Routes = [

  {path:'', 
   loadComponent:()=> import('./app.component').then(m => m.AppComponent)
  }
  ];