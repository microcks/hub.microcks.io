/*
 * Licensed to Laurent Broudoux (the "Author") under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership. Author licenses this
 * file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home/home.page';
import { PackagePageComponent } from './pages/package/package.page';
import { APIVersionPageComponent } from './pages/package/apiVersion/apiVersion.page';
import { DocumentationPageComponent } from './pages/doc/doc.page';


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
  },
  {
    path: "doc/:page",
    component: DocumentationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
