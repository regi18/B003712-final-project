export interface SummaryArticle {
  title: string;
  date: string;
  url: string;
  imgSrc: string;
  content: string;
  author: string;
  subtitle: string;
}

export interface DownloadPaper {
  title: string;
  date: string;
  downloadUrl: string;
}

export default class ArticlesService {
  /**
   * Returns a list of Articles with an abstract of content.
   *
   * @param limit The number of latest articles to return (if null, it will return all).
   * @returns A promise that resolves to an array of SummaryArticle objects.
   */
  static async getAll(limit: number | null = null): Promise<SummaryArticle[]> {
    return this.tmp(limit).then((articles) => {
      return articles.map((a) => ({ ...a, subtitle: ArticlesService.makeSubtitle(a.date, a.author) }));
    });
  }

  /**
   * Get the url to download the latest paper.
   * @returns A promise that resolves to a single DownloadPaper object.
   */
  static async getLatestDownload(): Promise<DownloadPaper> {
    return Promise.resolve({
      title: 'Volume 267, No. 20',
      date: '2020-04-03',
      downloadUrl: 'http://www.nhgazette.com/pdf/267_20.pdf',
    });
  }

  /**
   * Get a list of all papers available for download (with links to download them).
   * @returns A promise that resolves to an array of DownloadPaper objects.
   */
  static async getAllDownloads(): Promise<DownloadPaper[]> {
    return Promise.resolve([
      {
        title: 'Volume 267, No. 20',
        date: '2020-04-03',
        downloadUrl: 'http://www.nhgazette.com/pdf/267_20.pdf',
      },
      {
        title: 'Volume 267, No. 19',
        date: '2020-03-20',
        downloadUrl: 'http://www.nhgazette.com/pdf/267_19.pdf',
      },
      {
        title: 'Volume 267, No. 18',
        date: '2020-03-06',
        downloadUrl: 'http://www.nhgazette.com/pdf/267_18.pdf',
      },
    ]);
  }

  // TODO /articles/{slug} returns a single article. Content is markdown and should be converted to HTML in the component.
  // static async getArticle(): Promise<any> {
  // }

  /**
   * TODO remove this function and replace with a call to the backend.
   */
  static async tmp(limit: any): Promise<any[]> {
    return Promise.resolve([
      {
        title: 'Moby Donald and the GOP',
        date: '2020-04-03',
        author: 'John Doe',
        imgSrc: 'https://www.nhgazette.com/wp-content/uploads/2023/06/Moby_Trump.jpg',
        content:
          '2014—Sen. Jerry Moran [R-Kan.], whose top contributor is Koch Industries, reads into the Congressional Record a Wall Street Journal op-ed in which Charles Koch defends his right to spend millions Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
        url: '',
      },
      {
        title: 'Moby Donald and the GOP',
        date: '2020-04-03',
        author: 'John Doe',
        imgSrc: 'https://www.nhgazette.com/wp-content/uploads/2023/06/Moby_Trump.jpg',
        content:
          '2014—In McCutcheon v. FEC, the Supreme Court rules that rich folks deserve to have more influence in elections than the unwashed proletariat. 1982—U.S. Ambassador to the U.N. Jeanne Kirkpatrick Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
        url: '',
      },
      {
        title: 'Moby Donald and the GOP',
        date: '2020-04-03',
        author: 'John Doe',
        imgSrc: 'https://www.nhgazette.com/wp-content/uploads/2023/06/Moby_Trump.jpg',
        content:
          '2013—In Portsmouth Harbor, the tanker Harbour Feature allides with the Sarah Mildred Long Bridge. 2004—Britain declassifies “Blue Peacock,” a 1957 plan to bury nukes in Germany with live chickens Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
        url: '',
      },
      {
        title: 'Moby Donald and the GOP',
        date: '2020-04-03',
        author: 'John Doe',
        imgSrc: 'https://www.nhgazette.com/wp-content/uploads/2023/06/Moby_Trump.jpg',
        content:
          '2016—Darcie Rae Hall, 36, of Troy, N.H., is arrested in Keene for selling “Donald Trump” brand heroin. 2004—Four American contractors are ambushed and killed in Fallujah, their bodies displayed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
        url: '',
      },
      {
        title: 'Moby Donald and the GOP',
        date: '2020-04-03',
        author: 'John Doe',
        imgSrc: 'https://www.nhgazette.com/wp-content/uploads/2023/06/Moby_Trump.jpg',
        content:
          '2016—School bus mechanics in Virginia discover plastic explosives inadvertently left behind by the CIA. 2008—As he throws out the first pitch at Washington’s new National Park, George W.[MD] Bush Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
        url: '',
      },
    ]).then((articles) => {
      if (limit) return articles.slice(0, limit);
      else return articles;
    });
  }

  private static makeSubtitle(date: string, author: string): string {
    const d = Intl.DateTimeFormat('en-Us', { weekday: 'short', month: 'long', day: 'numeric' }).format(Date.parse(date));
    return `${d}, by ${author}`;
  }
}
