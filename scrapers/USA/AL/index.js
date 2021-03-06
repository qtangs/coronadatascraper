import * as fetch from '../../../lib/fetch.js';
import * as parse from '../../../lib/parse.js';
import * as transform from '../../../lib/transform.js';

// Set county to this if you only have state data, but this isn't the entire state
// const UNASSIGNED = '(unassigned)';

const scraper = {
  state: 'AL',
  country: 'USA',
  url: 'http://www.alabamapublichealth.gov/infectiousdiseases/2019-coronavirus.html',
  type: 'table',
  aggregate: 'county',
  async scraper() {
    const counties = [];
    const $ = await fetch.page(this.url);
    const $table = $('td:contains("(COVID-19) in Alabama")').closest('table');
    const $trs = $table.find('tbody > tr:not(:last-child)');
    $trs.each((index, tr) => {
      if (index < 2) {
        return;
      }
      const $tr = $(tr);
      const countyName = transform.addCounty(parse.string($tr.find('td:first-child').text()));
      if (countyName === 'Out of State County') {
        return;
      }
      counties.push({
        county: countyName,
        cases: parse.number($tr.find('td:last-child').text())
      });
    });
    counties.push(transform.sumData(counties));
    return counties;
  }
};

export default scraper;
