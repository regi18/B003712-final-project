export interface ResearchJournalArticle {
  title: string;
  url: string;
  date: string;
  content: string;
}

export default class TheResearchJournalService {
  /**
   * Returns a list of articles with an abstract of content.
   * @param month The month format to use for the title.
   * @returns A promise that resolves to an array of ResearchJournalArticle objects.
   */
  static async getAll(month: 'short' | 'long' = 'short'): Promise<ResearchJournalArticle[]> {
    return (
      Promise.resolve([
        {
          date: '2020-04-03',
          content:
            '2014—Sen. Jerry Moran [R-Kan.], whose top contributor is Koch Industries, reads into the Congressional Record a Wall Street Journal op-ed in which Charles Koch defends his right to spend millions Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
          url: '',
        },
        {
          date: '2020-04-02',
          content:
            '2014—In McCutcheon v. FEC, the Supreme Court rules that rich folks deserve to have more influence in elections than the unwashed proletariat. 1982—U.S. Ambassador to the U.N. Jeanne Kirkpatrick Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
          url: '',
        },
        {
          date: '2017-04-01',
          content:
            '2013—In Portsmouth Harbor, the tanker Harbour Feature allides with the Sarah Mildred Long Bridge. 2004—Britain declassifies “Blue Peacock,” a 1957 plan to bury nukes in Germany with live chickens Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
          url: '',
        },
        {
          date: '2017-03-31',
          content:
            '2016—Darcie Rae Hall, 36, of Troy, N.H., is arrested in Keene for selling “Donald Trump” brand heroin. 2004—Four American contractors are ambushed and killed in Fallujah, their bodies displayed Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
          url: '',
        },
        {
          date: '2017-03-30',
          content:
            '2016—School bus mechanics in Virginia discover plastic explosives inadvertently left behind by the CIA. 2008—As he throws out the first pitch at Washington’s new National Park, George W.[MD] Bush Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ex eu suscipit aliquet. Etiam metus mi, imperdiet in ipsum sed, euismod gravida diam. Vivamus non tincidunt diam. Etiam eget metus dictum nisi ornare varius sed quis nunc. Duis ut rhoncus lacus. Nam aliquam quam at magna sollicitudin, quis scelerisque dui ullamcorper. Nunc vehicula est diam, in tempus magna interdum quis. Integer scelerisque dolor dui, at tempus tortor vestibulum aliquet. Pellentesque mi risus, dapibus sit amet leo sit amet, volutpat aliquam tellus.',
          url: '',
        },
      ])
        .then((articles: any[]) => {
          // Create titles from dates
          articles.forEach(a => (a.title = Intl.DateTimeFormat('en-Us', { weekday: 'short', month, day: 'numeric' }).format(Date.parse(a.date + 'T00:00:00'))));

          // Move to APIs
          const MAX_WORDS = 50;
          articles.forEach((a) => (a.content = a.content.split(' ').splice(0, MAX_WORDS).join(' ') + '…'));

          return articles;
        })
    );
  }

  // TODO /research-journal/{slug} returns a single article. Content is markdown and should be converted to HTML in the component.
  // static async getArticle(): Promise<any> {
  // }
}
