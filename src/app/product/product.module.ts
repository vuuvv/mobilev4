import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CoreModule, OverlayModule, PageModule, DialogModule, CarouselModule, InfiniteScrollModule } from '../../components';
import { SharedModule, AuthorizeGuard } from '../shared';

import { ProductListItem } from './product-list-item';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { SearchComponent } from './search.component';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: 'product',
    canActivate: [AuthorizeGuard],
    canActivateChild: [AuthorizeGuard],
    children: [
      {
        path: '',
        component: ProductComponent,
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'selected',
        component: ProductComponent,
      },
      {
        path: 'insale',
        component: ProductComponent,
      },
      {
        path: 'detail',
        component: ProductDetailComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    CoreModule,
    OverlayModule,
    PageModule,
    DialogModule,
    InfiniteScrollModule,
    CarouselModule,

    SharedModule,

    RouterModule.forChild(routes),
  ],
  declarations: [
    ProductComponent,
    ProductListItem,
    ProductDetailComponent,
    SearchComponent,
    CategoryComponent,
  ],
  providers: [
  ],
})
export class ProductModule {}