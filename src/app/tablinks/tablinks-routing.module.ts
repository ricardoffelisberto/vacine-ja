import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: '',
    component: TablinksPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'vacinas',
        loadChildren: () => import('../vacinas/vacinas.module').then(m => m.VacinasPageModule)
      },
      {
        path: 'vacinadores',
        loadChildren: () => import('../vacinadores/vacinadores.module').then(m => m.VacinadoresPageModule)
      },
      {
        path: 'vacinados',
        loadChildren: () => import('../vacinados/vacinados.module').then(m => m.VacinadosPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
