import { get } from './AjaxService';

export interface CartoonItem {
  id: number;
  src: string;
  caption: string;
}

export default class CartoonsService {
  static getCartoons(): Promise<CartoonItem[]> {
    return get('cartoons').then((res) => {
      return res.map((r: any) => {
        const d = Intl.DateTimeFormat('en-Us', { year: 'numeric', month: 'long', day: 'numeric' }).format(Date.parse(r.createdAt));
        return {
          src: r.img,
          caption: r.title + ' - ' + d,
        };
      });
    });
  }
}
