import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacinadosRegisterPageRoutingModule } from './vacinados-register-routing.module';

import { VacinadosRegisterPage } from './vacinados-register.page';

import { NgxMaskModule, MaskPipe } from 'ngx-mask'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VacinadosRegisterPageRoutingModule,
    NgxMaskModule.forChild()
  ],
  declarations: [VacinadosRegisterPage],
  providers: [
    MaskPipe
  ]
})
export class VacinadosRegisterPageModule {}
