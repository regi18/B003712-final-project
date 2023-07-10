import { get } from './AjaxService';

export interface Article {
  slug: string;
  title: string;
  date: string;
  imgSrc: string;
  content: string;
  author: string;
  issueNumber: number;
}

export interface SummaryArticle extends Article {
  subtitle: string;
  url: string;
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
    const articles = await get('articles', { limit });
    return articles.map((a: any) => {
      return { ...a, subtitle: ArticlesService.makeSubtitle(a.date, a.author), url: `/articles/${a.slug}` };
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

  private static makeSubtitle(date: string, author: string): string {
    const d = Intl.DateTimeFormat('en-Us', { weekday: 'short', month: 'long', day: 'numeric' }).format(Date.parse(date));
    return `${d}, by ${author}`;
  }
}
