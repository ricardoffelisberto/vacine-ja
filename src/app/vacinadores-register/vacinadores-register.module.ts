import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacinadoresRegisterPageRoutingModule } from './vacinadores-register-routing.module';

import { VacinadoresRegisterPage } from './vacinadores-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacinadoresRegisterPageRoutingModule
  ],
  declarations: [VacinadoresRegisterPage]
})
export class VacinadoresRegisterPageModule {}
