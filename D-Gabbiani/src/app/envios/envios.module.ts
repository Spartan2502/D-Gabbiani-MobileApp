import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviosPageRoutingModule } from './envios-routing.module';

import { EnviosPage } from './envios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviosPageRoutingModule
  ],
  declarations: [EnviosPage]
})
export class EnviosPageModule {}
