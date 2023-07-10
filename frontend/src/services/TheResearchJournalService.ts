import { get } from './AjaxService';

export interface ResearchJournalArticle {
  id: number;
  title: string;
  createdAt: string;
  content: string;
}

export default class TheResearchJournalService {
  /**
   * Returns a list of articles with an abstract of content.
   * @param limit Limits the number of articles returned.
   * @param month The month format to use for the title.
   * @returns A promise that resolves to an array of ResearchJournalArticle objects.
   */
  static async getAll(limit: number | null = null, month: 'short' | 'long' = 'long'): Promise<ResearchJournalArticle[]> {
    const articles: ResearchJournalArticle[] = await get('the-research-journal', { limit });

    // Create titles from dates
    articles.forEach(
      (a) => (a.title = Intl.DateTimeFormat('en-Us', { weekday: 'short', month, day: 'numeric' }).format(Date.parse(a.createdAt + 'T00:00:00')))
    );

    return articles;
  }

  
  // TODO /research-journal/{slug} returns a single article. Content is markdown and should be converted to HTML in the component.
  // static async getArticle(): Promise<any> {
  // }
}
