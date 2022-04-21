import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacinadoresRegisterPageRoutingModule } from './vacinadores-register-routing.module';

import { VacinadoresRegisterPage } from './vacinadores-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VacinadoresRegisterPageRoutingModule
  ],
  declarations: [VacinadoresRegisterPage]
})
export class VacinadoresRegisterPageModule {}
