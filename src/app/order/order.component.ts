import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Order, OrderService, AuthorizeService, UserService, Account } from '../shared';

import { DialogService, OverlayService } from '../../components';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
})
export class OrderComponent {
  @Input('order') order: Order = new Order();
  @Input('index') index: number;
  @Input('canCheck') canCheck: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private orderService: OrderService,
    private dialogService: DialogService,
    private overlayService: OverlayService,
    private authorizeService: AuthorizeService) {
  }

  get id() {
    return `HJN_ORDER_${this.index}`;
  }

  can(action: string): boolean {
    switch(action) {
      case 'pay':
        return ['待付款提交'].indexOf(this.order.State) != -1;
      case 'submit':
        return ['付款待提交'].indexOf(this.order.State) != -1;
      case 'refund':
        return ['仓库预处理', '付款待提交', '待仓库交寄'].indexOf(this.order.State) != -1;
    }
  }

  pay() {
    this.userService.balance().map((balance: number) => {
      let fee = this.orderService.totalFee(this.order);
      if (balance < fee) {
        this.dialogService.confirm(`您的余额: ¥${balance}, 您需要支付: ¥${fee}, 需充值: ¥${(fee - balance).toFixed(2)}, 是否去充值`, '余额不足').ok((comp) => {
          comp.close();
          this.router.navigate(['/account/deposit', {amount: (fee - balance).toFixed(2)}]);
        })
      } else {
        this.dialogService.confirm(`本次订单提交需支付: ¥${fee}元, 您的余额为:￥${balance}, 确定提交订单吗`, '订单提交').ok((comp) => {
          comp.close();
          this.overlayService.loading('提交订单...');
          this.orderService.payOrder(this.order.HMBOrderCode).subscribe(() => {
            this.overlayService.toast();
          }, () => this.overlayService.hideToast(), () => this.authorizeService.update().subscribe(() => null));
        })
      }
    }).subscribe(() => null);
  }

  submit() {
    this.dialogService.confirm(`您确认提交订单: ${this.order.HMBOrderCode}`, '提交订单').ok((comp) => {
      comp.close();
      this.overlayService.loading('提交订单...');
      this.orderService.submitOrder(this.order.HMBOrderCode).subscribe(() => {
        this.overlayService.toast();
      }, () => this.overlayService.hideToast());
    })
  }

  refund() {
    this.dialogService.confirm(`您确认取消订单: ${this.order.HMBOrderCode}`, '取消订单').ok((comp) => {
      comp.close();
      this.overlayService.loading('取消订单...');
      this.orderService.cancelOrder(this.order.HMBOrderCode).subscribe(() => {
        this.overlayService.toast();
      }, () => this.overlayService.hideToast(), () => this.authorizeService.update().subscribe(() => null));
    })
  }
}