import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinadoresRegisterPage } from './vacinadores-register.page';

const routes: Routes = [
  {
    path: '',
    component: VacinadoresRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacinadoresRegisterPageRoutingModule {}
