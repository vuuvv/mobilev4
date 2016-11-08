export class Area {
  Code: string;
  Name: string;
  Count: number;

  static province(code: string): string {
    return `${code.substring(0, 2)}0000`;
  }

  static city(code: string): string {
    if (code === '350002') {
      return '350001';
    }
    return `${code.substring(0, 4)}00`;
  }
}

export type AreaType = 'province' | 'city' | 'county';