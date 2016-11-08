import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Http, Area, AreaType, AuthorizeService } from '../shared';
import { OverlayService } from '../../components';

@Component({
  templateUrl: './area.component.html',
})
export class AreaComponent implements OnInit {
  private type: AreaType = 'province';
  private parent: string;
  private isService: boolean;
  private areas: Area[] = [];
  private current: Area;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private authorizeService: AuthorizeService,
    private overlayService: OverlayService) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.type = params['type'] || 'province';
      this.parent = params['parent'] || null;
      this.isService = !!params['service'];

      let data = {};
      if (this.parent) {
        data['a'] = this.parent;
      }

      this.http.get<Area[]>('/area', data).subscribe((value: Area[]) => {
        this.areas = value;
        this.current = this.getCurrent();
      })
    })
  }

  getCurrent(): Area {
    let code = this.isService ? this.authorizeService.user.user.ServiceAreaCode : this.authorizeService.user.user.AreaCode;

    switch (this.type) {
      case 'city':
        code = Area.city(code);
        break;
      case 'county':
        break;
      case 'province':
      default:
        code = Area.province(code);
        break;
    }

    console.log(code);
    return this.areas.find(value => value.Code === code);
  }

  action(area: Area, changed: boolean = true) {
    let type = 'province';
    if (this.type === 'province') {
      type = 'city';
    } else if (this.type === 'city') {
      type = 'county';
    }

    if (area.Count === 0) {
      if (changed) {
        this.http.post('area/edit', { areacode: area.Code, service: this.isService }).concatMap(() => {
          return this.authorizeService.update();
        }).subscribe(() => {
          this.router.navigate(['/home/user/setting']);
        })
      } else {
        this.router.navigate(['/home/user/setting']);
      }
    } else {
      let data = {type: type, parent: area.Code};
      if (this.isService) {
        data['service'] = this.isService;
      }
      this.router.navigate(['/home/user/area', data]);
    }
  }
}