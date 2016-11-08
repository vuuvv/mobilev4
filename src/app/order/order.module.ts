import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizeGuard } from '../shared';

const routing: Routes = [
  {
    path: 'order',
    canActivateChild: [AuthorizeGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
      }
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routing),
  ],
  declarations: [
  ]
})
export class OrderModule {
}