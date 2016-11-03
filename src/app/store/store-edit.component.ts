import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Store, Http } from '../shared';
import { OverlayService } from '../../components';

@Component({
  templateUrl: './store-edit.component.html',
})
export class StoreEditComponent implements OnInit {
  private store: Store = new Store();

  constructor(
    private http: Http,
    private router: Router,
    private overlayService: OverlayService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.getStore(id);
    })
  }

  getStore(id: string) {
    this.http.get<Store>(`/mo/store/get/${id}`).subscribe(
      (store: Store) => {
        this.store = store;
      },
      (err) => {
        this.router.navigate(['/store']);
      }
    );
  }

  submit() {
    this.http.post(`/mo/store/edit`, this.store).subscribe(
      () => {
        this.overlayService.toast();
      },
      (err) => {},
      () => {
        this.router.navigate(['/store']);
      }
    );
  }
}