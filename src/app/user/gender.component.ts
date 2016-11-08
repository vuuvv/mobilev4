import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Http, AuthorizeService } from '../shared';

import { OverlayService } from '../../components';

@Component({
  templateUrl: './gender.component.html',
})
export class GenderComponent {
  private genders: string[] = ['male', 'female'];

  constructor(
    private http: Http,
    private router: Router,
    private authorizeService: AuthorizeService,
    private overlayService: OverlayService) {
  }

  submit(gender: string) {
    this.http.post(`mo/profile/gender/${gender}`).concatMap(() => {
      return this.authorizeService.update();
    }).subscribe(() => {
      this.overlayService.toast();
      this.router.navigate(['/home/user/setting']);
    })
  }
}