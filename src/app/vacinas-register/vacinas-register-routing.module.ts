import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinasRegisterPage } from './vacinas-register.page';

const routes: Routes = [
  {
    path: '',
    component: VacinasRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacinasRegisterPageRoutingModule {}
