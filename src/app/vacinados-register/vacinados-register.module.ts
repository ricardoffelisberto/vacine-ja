import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacinadosRegisterPageRoutingModule } from './vacinados-register-routing.module';

import { VacinadosRegisterPage } from './vacinados-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacinadosRegisterPageRoutingModule
  ],
  declarations: [VacinadosRegisterPage]
})
export class VacinadosRegisterPageModule {}
