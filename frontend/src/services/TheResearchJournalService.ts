import { get } from './AjaxService';
import type { Article } from './ArticlesService';
import removeMd from 'remove-markdown';


export default class TheResearchJournalService {
  /**
   * Returns a list of articles with an abstract of content.
   * @param limit Limits the number of articles returned.
   * @param month The month format to use for the title.
   * @returns A promise that resolves to an array of ResearchJournalArticle objects.
   */
  static async getAll(limit: number | null = null, month: 'short' | 'long' = 'long'): Promise<Article[]> {
    const articles: Article[] = await get('articles', { section: 'the-research-journal', limit });

    articles.forEach((a) => { 
      // Create titles from dates
      a.title = Intl.DateTimeFormat('en-Us', { weekday: 'short', month, day: 'numeric' }).format(Date.parse(a.date)) 

      // Create abstracts from content
      a.content = removeMd(a.content);
      a.content = a.content.split(' ').slice(0, 50).join(' ') + '...';
    });

    return articles;
  }
}
