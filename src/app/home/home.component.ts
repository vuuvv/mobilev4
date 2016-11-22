import { Component, OnInit, ViewContainerRef, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { trigger, state, style, transition, animate } from '@angular/core';

import { ConfirmComponent, DialogService, CarouselConfig } from '../../components';

import { Http } from '../shared';

function chunck<T>(arr: T[], n: number): T[][] {
  let ret: T[][] = [];
  for (let i=0,j=arr.length; i<j; i+=n) {
      ret.push(arr.slice(i,i+n));
  }
  return ret;
}

class Product {
  FirstImageUrl: string;
  Title: string;
  HMBAvailabilityPrice: number;
  sellNum?: number;
  select?: number;
}

class Products {
  hotProducts: Product[];
  newProducts: Product[];
}

@Component({
  templateUrl: './home.layout.html'
})
export class HomeLayoutComponent {}

@Component({
  templateUrl: 'home.html',
  styleUrls: ['./home.less']
})
export class HomeComponent implements OnInit {
  content: string;
  state: string = 'inactive';
  distance: number = 0;
  left: 0;

  carouselConfig: CarouselConfig;
  products: Products = {
    hotProducts: new Array(10),
    newProducts: new Array(10),
  };

  get translate3d() {
    return `translate3d(-${this.distance}px, 0px, 0px)`;
  }

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit () {
    this.route.params.forEach((params: Params) => {
      this.content = `Home ${+params['id']}`;
    });

    this.carouselConfig = {
      sliders: [
        'http://www.huijinet.com/ckfinder/userfiles/images/双11一触即发(1).jpg',
        'http://www.huijinet.com/ckfinder/userfiles/images/pc1.jpg',
        'http://www.huijinet.com/ckfinder/userfiles/images/pc2.jpg',
      ],
      showIndicator: true,
    }

    this.http.get<any>('/mo/home-products').subscribe((value) => {
      this.products = {
        hotProducts: value.hotProducts,
        newProducts: value.newProducts,
      };
    });
  }

  onPan(event) {
    this.distance = event.distance;
  }

  openDialogBox() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
}
