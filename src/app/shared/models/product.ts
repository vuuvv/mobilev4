export class ProductSku {
  hmbskucode: string;
  title: string;
  price: number;
  weight: number;
}

export class Product {
  hmbspucode: string;
  firstImageUrl: string;
  item_name: string;
  balancePrice: number;
  selectNum: number;
  images: string[];
  detail: string;
  skuList: ProductSku[];
  weight: string;
  item_desc: string;
  imgurls: string;
  onsale: string;
  storeList: any[];

  prompt: string;
  shipStr: string;
  cateList: any[];
}
