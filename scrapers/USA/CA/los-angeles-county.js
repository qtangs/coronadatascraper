import * as fetch from '../../../lib/fetch.js';
import * as parse from '../../../lib/parse.js';

// Set county to this if you only have state data, but this isn't the entire state
// const UNASSIGNED = '(unassigned)';

const scraper = {
  county: 'Los Angeles County',
  state: 'CA',
  country: 'USA',
  url: 'http://www.publichealth.lacounty.gov/media/Coronavirus/',
  async scraper() {
    const $ = await fetch.page(this.url);
    return {
      cases: parse.number(
        $('.counter')
          .first()
          .text()
      ),
      deaths: parse.number(
        $('.counter')
          .last()
          .text()
      )
    };
  }
};

export default scraper;
