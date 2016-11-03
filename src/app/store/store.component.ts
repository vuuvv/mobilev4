import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store, Platform, StoresInfo, StoreService, AuthorizeService, Http } from '../shared';
import { DialogService, OverlayService } from '../../components';

import { Observable } from 'rxjs/Observable';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class StoreLayoutComponent { }

@Component({
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.less'],
})
export class StoreComponent implements OnInit {
  stores: Store[];
  platforms: Platform[];

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private authorizeService: AuthorizeService,
    private http: Http,
    private overlayService: OverlayService,
    private dialogService: DialogService) {
  }

  ngOnInit() {
    this.getData();
    this.route.queryParams.forEach((params: Params) => {
      let error = params['error'];
      if (error) {
        if (error === '0') {
          this.overlayService.toast();
        } else if (error === '10011') {
          this.dialogService.confirm(
            `店铺[${params['storecode']}]已被用户[${params['username']}(${params['usercode']})]，是否确定要绑定到本用户[${this.authorizeService.user.user.UserCode}]上`,
            '确认绑定'
          ).ok((comp) => {
            comp.close();
            this.http.get(`/mo/store/create/confirm/${params['storeid']}`).subscribe(() => {
              this.overlayService.toast();
              this.getData();
            })
          });
        } else {
          this.dialogService.alert(error, '授权错误');
        }
      }
    })
  }

  getData() {
    this.storeService.getData().subscribe((value: StoresInfo) => {
      this.stores = value.stores;
      this.platforms = value.platforms;
    });
  }

  getPlatformChinaName(name: string): string {
    let platform = this.platforms.find((value) => {
      return value.Name === name;
    })
    if (platform) {
      return platform.ChinaName;
    }
    return name;
  }

  delete(id: string) {
    this.dialogService.confirm("确定删除该店铺吗？", "删除店铺").ok((comp) => {
      this.http.post(`/mo/store/delete/${id}`).subscribe(() => {
        this.overlayService.toast();
        this.getData();
      })
      comp.close();
    })
  }
}