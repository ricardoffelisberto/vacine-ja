import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacinadoresRegisterPageRoutingModule } from './vacinadores-register-routing.module';

import { VacinadoresRegisterPage } from './vacinadores-register.page';

import { NgxMaskModule, MaskPipe } from 'ngx-mask'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VacinadoresRegisterPageRoutingModule,
    NgxMaskModule.forChild()
  ],
  declarations: [VacinadoresRegisterPage],
  providers: [
    MaskPipe
  ]
})
export class VacinadoresRegisterPageModule {}
