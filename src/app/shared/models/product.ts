export class ProductSku {
  sku: string;
  spec: string;
  price: number;
  weight: number;
}

export class Product {
  spu: string;
  image: string;
  title: string;
  price: number;
  sales: number;
  images: string[];
  detail: string;
  skus: ProductSku[];
}
