import { get } from './AjaxService';
import type { Article, SummaryArticle } from './ArticlesService';
import removeMd from 'remove-markdown';

export default class TheResearchJournalService {
  /**
   * Returns a list of articles with an abstract of content.
   * @param limit Limits the number of articles returned.
   * @param month The month format to use for the title.
   * @returns A promise that resolves to an array of ResearchJournalArticle objects.
   */
  static async getAll(limit: number | null = null): Promise<SummaryArticle[]> {
    const articles: SummaryArticle[] = await get('articles', { section: 'the-research-journal', limit });

    articles.forEach((a) => {
      // Create abstracts from content
      a.content = removeMd(a.content);
      a.content = a.content.split(' ').slice(0, 50).join(' ') + '...';
      a.subtitle = TheResearchJournalService.makeSubtitle(a);
      a.url = a.section + '/' + a.slug;
    });

    return articles;
  }

  private static makeSubtitle(a: Article) {
    if (!a) return '';
    const d = Intl.DateTimeFormat('en-Us', { weekday: 'short', month: 'long', day: 'numeric' }).format(Date.parse(a.date));
    return `${a.author} | ${d}`;
  }
}
