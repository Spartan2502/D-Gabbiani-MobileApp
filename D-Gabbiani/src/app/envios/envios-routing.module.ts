import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviosPage } from './envios.page';

const routes: Routes = [
  {
    path: '',
    component: EnviosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviosPageRoutingModule {}
