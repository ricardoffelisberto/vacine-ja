import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacinadoresPage } from './vacinadores.page';

const routes: Routes = [
  {
    path: '',
    component: VacinadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacinadoresPageRoutingModule {}
