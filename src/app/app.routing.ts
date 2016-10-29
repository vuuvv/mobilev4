import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeLayoutComponent } from './home/home.component';

const appRoutes: Routes = [];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
