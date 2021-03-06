import * as fetch from '../../../lib/fetch.js';
import * as parse from '../../../lib/parse.js';
import * as transform from '../../../lib/transform.js';

// Set county to this if you only have state data, but this isn't the entire state
// const UNASSIGNED = '(unassigned)';

const scraper = {
  state: 'SD',
  country: 'USA',
  url: 'https://doh.sd.gov/news/Coronavirus.aspx#SD',
  type: 'table',
  aggregate: 'county',
  async scraper() {
    const counties = [];
    const $ = await fetch.page(this.url);
    const $th = $('h2:contains("South Dakota Counties with COVID-19 Cases")');
    const $table = $th.next('table');
    const $trs = $table.find('tbody > tr');
    $trs.each((index, tr) => {
      const $tr = $(tr);
      counties.push({
        county: transform.addCounty(parse.string($tr.find('> *:first-child').text())),
        cases: parse.number($tr.find('> *:last-child').text())
      });
    });
    return counties;
  }
};

export default scraper;
