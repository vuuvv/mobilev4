import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Store, Order, OrderItem, OrderService, UserService, AuthorizeService } from '../shared';
import { DialogService, OverlayService } from '../../components';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
})
export class OrdersComponent {
  private state: string;
  private keywords: string;

  private orders: Order[] = [];
  private page: number = 1;
  private pageSize: number = 10;

  private selectedOrders = {};

  private loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private authorizeService: AuthorizeService,
    private overlayService: OverlayService,
    private dialogService: DialogService,
    private orderService: OrderService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.state = params['state'];
      this.orders = [];
      this.page = 1;
      this.getOrderList();
    })
  }

  getOrderList() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.orderService.getOrderList(this.state, this.keywords, this.page, this.pageSize).subscribe((value: Order[]) => {
      this.orders = this.orders.concat(value);
      this.loading = false;
      this.page++;
    });
  }

  select(i: number) {
    this.selectedOrders[i] = this.orders[i];
  }

  unselect(i: number) {
    delete this.selectedOrders[i];
  }

  selectAll(event) {
    if (event.target.checked) {
      this.orders.filter((value) => {
        return this.state != 'unpay' || !this.orderService.cannotPay(value);
      }).forEach((value) => value.$$Checked = true);
    } else {
      this.orders.forEach((value) => value.$$Checked = false);
    }
  }

  totalCount(): number {
    if (!this.orders) {
      return 0;
    }
    return this.orders.filter((value) => value.$$Checked).length;
  }

  totalPrice() {
    if (!this.orders) {
      return 0;
    }
    return this.orders.filter((value) => value.$$Checked).reduce((a, b) => {
      return a + this.orderService.totalFee(b);
    }, 0);
  }

  totalFreight() {
    if (!this.orders) {
      return 0;
    }
    return this.orders.filter((value) => value.$$Checked).reduce((a, b) => {
      return a + b.AllFreight;
    }, 0);
  }

  pay() {
    if (!this.totalCount()) {
      this.dialogService.alert('请选择需要付款的订单');
      return;
    }
    this.userService.balance().map((balance: number) => {
      let fee = this.totalPrice();
      let total = this.totalCount();
      let i = 0;
      if (balance < fee) {
        this.dialogService.confirm(`您的余额: ¥${balance}, 您需要支付: ¥${fee}, 需充值: ¥${(fee - balance).toFixed(2)}, 是否去充值`, '余额不足').ok((comp) => {
          comp.close();
          this.router.navigate(['/account/deposit', {amount: (fee - balance).toFixed(2)}]);
        })
      } else {
        this.dialogService.confirm(`本次订单提交需支付: ¥${fee}元, 您的余额为:￥${balance}, 确定提交订单吗`, '订单提交').ok((comp) => {
          comp.close();
          this.overlayService.loading('提交订单...');
          Observable.from(this.orders).filter((order: Order) => order.$$Checked).concatMap((order: Order) => {
            return this.orderService.payOrder(order.HMBOrderCode);
          }).subscribe(() => {
            i++;
            if (i == total) {
              this.overlayService.toast('提交订单成功');
            }
          }, () => this.overlayService.hideToast(), () => this.authorizeService.update().subscribe(() => null));
        });
      }
    }).subscribe(() => null);
  }
}