import { Component, OnInit } from '@angular/core';

import { Product } from '../shared';
import { CarouselConfig } from '../../components';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
})
export class ProductDetailComponent implements OnInit {
  private product: Product = new Product();

  ngOnInit() {
    this.product.spu = "HJN^Y00005YY";
    this.product.image = 'https://si.geilicdn.com/vshop1477557706486-65949692.jpg?w=750&h=750';
    this.product.title = '【完税进口】包邮日本象印焖烧杯360ml不锈钢真空（中文标贴） ★拍前必读★ 1、身份信息：完税进口，无须提供身份证信息； 2、物流发货：全国包邮，付款成功后，3个工作日内发货哦～！ 3、售后范围：爆裂';
    this.product.detail = this.product.title;
    this.product.price = 500;
    this.product.images = [
      'https://si.geilicdn.com/vshop1477557706486-65949692.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557706612-7947054.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557706710-58743791.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557706798-33462936.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557706895-62268114.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557706989-61359644.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707104-89747648.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707205-48254531.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707299-46029436.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707392-38308243.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707492-2158062.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707584-63529933.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707673-2567257.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707768-4351801.jpg?w=800&h=800',
      'https://si.geilicdn.com/vshop1477557707871-86509342.jpg?w=800&h=800"',
    ];
    this.product.skus = [
      {sku: "HJN^Y00005YY01", spec: "浅蓝色", price: 500, weight: 350},
      {sku: "HJN^Y00005YY01", spec: "浅蓝色", price: 500, weight: 350},
      {sku: "HJN^Y00005YY01", spec: "浅蓝色", price: 500, weight: 350},
      {sku: "HJN^Y00005YY01", spec: "浅蓝色", price: 500, weight: 350},
      {sku: "HJN^Y00005YY01", spec: "浅蓝色", price: 500, weight: 350},
      {sku: "HJN^Y00005YY01", spec: "浅蓝色", price: 500, weight: 350},
    ]
  }
}