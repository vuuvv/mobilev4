import { Store } from './store';

export class OrderItem {
  ProductName: string;
  ProductImageUrl: string;
  ProductPrice: number;
  BeSendNum: number;
  ProductProperty: string;
}

export class Order {
  SellOrderCode: string;
  HMBOrderCode: string;
  StoreCode: string;
  State: string;
  AllFreight: number;
  DetailList: OrderItem[] = [];
  $$Checked: boolean = false;
}

export class OrderSyncItem {
  OrderId: string;
  OrderStatus: string;
  LoginId: string;
  Platform: string;
  Success?: boolean;
}

export class OrderSyncItems {
  store: Store;
  items: OrderSyncItem[];
}