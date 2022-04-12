import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinadosPage } from './vacinados.page';

const routes: Routes = [
  {
    path: '',
    component: VacinadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacinadosPageRoutingModule {}
