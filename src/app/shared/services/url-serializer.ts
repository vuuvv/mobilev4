import { UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';

export class EscapedUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    url = decodeURIComponent(url).trim();
    return super.parse(url);
  }
}

export const EscapedUrlSerializerProvider = {
  provide: UrlSerializer,
  useClass: EscapedUrlSerializer,
}

