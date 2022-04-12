import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacinadosPageRoutingModule } from './vacinados-routing.module';

import { VacinadosPage } from './vacinados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacinadosPageRoutingModule
  ],
  declarations: [VacinadosPage]
})
export class VacinadosPageModule {}
