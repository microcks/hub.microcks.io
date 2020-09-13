import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home.page';
import { PackagePageComponent } from './pages/package/package.page';
import { APIVersionPageComponent } from './pages/package/apiVersion/apiVersion.page';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: "package/:packageId",
    component: PackagePageComponent
  },
  {
    path: "package/:packageId/api/:apiVersionId",
    component: APIVersionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
