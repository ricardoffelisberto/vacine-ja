import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacinasRegisterPageRoutingModule } from './vacinas-register-routing.module';

import { VacinasRegisterPage } from './vacinas-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacinasRegisterPageRoutingModule
  ],
  declarations: [VacinasRegisterPage]
})
export class VacinasRegisterPageModule {}
