import * as fetch from '../../../lib/fetch.js';
import * as parse from '../../../lib/parse.js';

// Set county to this if you only have state data, but this isn't the entire state
// const UNASSIGNED = '(unassigned)';

const scraper = {
  county: 'Colusa County',
  state: 'CA',
  country: 'USA',
  url: 'http://www.countyofcolusa.org/99/Public-Health',
  async scraper() {
    const $ = await fetch.page(this.url);
    const cases = parse.number(
      $('strong:contains("Confirmed Cases:")')
        .first()
        .text()
        .match(/Confirmed Cases: (\d+)/)[1]
    );
    return { cases };
  }
};

export default scraper;
