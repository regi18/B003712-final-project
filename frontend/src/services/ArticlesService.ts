import { get } from './AjaxService';

export interface Article {
  slug: string;
  title: string;
  date: string;
  img: string;
  content: string;
  author: string;
  issueNumber: number;
  section: string;
}

export interface SummaryArticle extends Article {
  subtitle: string;
  url: string;
}

export interface DownloadPaper {
  title: string;
  issueNumber: number;
  pdf: string;
  createdAt: string;
}

export default class ArticlesService {
  /**
   * Returns a list of Articles with an abstract of content.
   *
   * @param limit The number of latest articles to return (if null, it will return all).
   * @returns A promise that resolves to an array of SummaryArticle objects.
   */
  static async getAll(limit: number | null = null, section: string | null = null): Promise<SummaryArticle[]> {
    const articles = await get('articles', { limit, section });
    return articles.map((a: any) => {
      a.content = a.content.split(' ').slice(0, 100).join(' ') + '...';
      return { ...a, subtitle: ArticlesService.makeSubtitle(a.date, a.author), url: `/sections/${a.section}/${a.slug}` };
    });
  }

  /**
   * Get the url to download the latest paper.
   * @returns A promise that resolves to a single DownloadPaper object.
   */
  static async getLatestDownload(): Promise<DownloadPaper> {
    return get('downloads/latest');
  }

  /**
   * Get a list of all papers available for download (with links to download them).
   * @returns A promise that resolves to an array of DownloadPaper objects.
   */
  static async getAllDownloads(): Promise<DownloadPaper[]> {
    return get('downloads');
  }

  /**
   * Get a single article.
   * @param slug The slug of the article to get.
   * @returns A promise that resolves to a single Article object.
   */
  static async getArticle(slug: string): Promise<Article> {
    return get(`articles/${slug}`);
  }

  // --------------------------------------------------

  private static makeSubtitle(date: string, author: string): string {
    const d = Intl.DateTimeFormat('en-Us', { weekday: 'short', month: 'long', day: 'numeric' }).format(Date.parse(date));
    return `${d}, by ${author}`;
  }
}
