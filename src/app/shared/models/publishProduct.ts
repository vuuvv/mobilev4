export class PublishSku {
  skuId: string;
  title: string;
  sku: string;
  skuPrice: number;
}

export class PublishProduct {
  storeId: string;
  spu_id: string;
  _cateIds: string[] = [];
  get cateIds() {
    return this._cateIds.join(',');
  }
  subject: string;
  spuPrice: number;
  skus: PublishSku[] = [];
}