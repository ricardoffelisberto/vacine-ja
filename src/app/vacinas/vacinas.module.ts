import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacinasPageRoutingModule } from './vacinas-routing.module';

import { VacinasPage } from './vacinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacinasPageRoutingModule
  ],
  declarations: [VacinasPage]
})
export class VacinasPageModule {}
