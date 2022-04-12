import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinadosRegisterPage } from './vacinados-register.page';

const routes: Routes = [
  {
    path: '',
    component: VacinadosRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacinadosRegisterPageRoutingModule {}
