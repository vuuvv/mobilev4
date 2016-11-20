export class PublishSku {
  skuId?: string;
  title?: string;
  sku?: string;
  skuPrice?: number;
}

export class PublishProduct {
  storeId: string;
  spu_id: string;
  cateIds: string;
  subject: string;
  spuPrice: number;
  skus: PublishSku[] = [];
}