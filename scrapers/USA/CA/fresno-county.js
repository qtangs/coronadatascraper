import * as fetch from '../../../lib/fetch.js';
import * as parse from '../../../lib/parse.js';

// Set county to this if you only have state data, but this isn't the entire state
// const UNASSIGNED = '(unassigned)';

const scraper = {
  county: 'Fresno County',
  state: 'CA',
  country: 'USA',
  url: 'https://www.co.fresno.ca.us/departments/public-health/covid-19',
  async scraper() {
    const $ = await fetch.page(this.url);
    return {
      cases: parse.number($('li:contains("Total cases")').text()),
      deaths: parse.number($('li:contains("Total deaths")').text())
    };
  }
};

export default scraper;
