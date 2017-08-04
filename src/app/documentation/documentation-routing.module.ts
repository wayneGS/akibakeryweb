import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { IndexComponent } from './index/index.component';
import { WorksComponent } from './works/works.component';

const routes: Routes = [
  { path: 'documentation' , component: IndexComponent},
  { path: 'documentation/index' , component: IndexComponent},
  { path: 'documentation/works' , component: WorksComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DocumentationRoutingModule { }
