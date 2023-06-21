export interface CartoonItem {
  src: string;
  caption: string;
}

export default class CartoonsService {
  static getCartoons(): Promise<CartoonItem[]> {
    return Promise.resolve([
      {
        src: 'https://www.nhgazette.com/wp-content/uploads/2020/04/01-Chosen-One.jpg',
        caption: 'A Civics Lesson – 264/5 Nov 22, 2019',
      },
      {
        src: 'https://www.nhgazette.com/wp-content/uploads/2020/04/03-Frankenmitch.jpg',
        caption: 'FrankenMitch – 264/9 Jan 17, 2020',
      },
      {
        src: 'https://www.nhgazette.com/wp-content/uploads/2020/04/04-Gimme-a-grawlix.jpg',
        caption: 'Gimme a Grawlix! – 263/22 July 19, 2019',
      },
    ]);
  }
}
