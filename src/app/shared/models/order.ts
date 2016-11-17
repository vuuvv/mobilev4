import { OrderItem } from './order-item';

export class Order {
  rawOrderCode: string;
  orderCode: string;
  storeId: string;
  storeName?: string;
  status: string;
  orderItems: OrderItem[] = [];
}