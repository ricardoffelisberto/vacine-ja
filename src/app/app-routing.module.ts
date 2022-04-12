import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'vacinadores',
    loadChildren: () => import('./vacinadores/vacinadores.module').then( m => m.VacinadoresPageModule)
  },
  {
    path: 'vacinas',
    loadChildren: () => import('./vacinas/vacinas.module').then( m => m.VacinasPageModule)
  },
  {
    path: 'vacinados',
    loadChildren: () => import('./vacinados/vacinados.module').then( m => m.VacinadosPageModule)
  },  {
    path: 'vacinas-register',
    loadChildren: () => import('./vacinas-register/vacinas-register.module').then( m => m.VacinasRegisterPageModule)
  },
  {
    path: 'vacinados-register',
    loadChildren: () => import('./vacinados-register/vacinados-register.module').then( m => m.VacinadosRegisterPageModule)
  },
  {
    path: 'vacinadores-register',
    loadChildren: () => import('./vacinadores-register/vacinadores-register.module').then( m => m.VacinadoresRegisterPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
