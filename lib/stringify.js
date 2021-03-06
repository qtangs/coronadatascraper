/*
  Generate a CSV from the given day
*/
function csvForDay(data) {
  // Start with the columns we want first
  let columns = ['city', 'county', 'state', 'country', 'cases', 'deaths', 'recovered', 'tested', 'active', 'population', 'lat', 'long', 'url', 'curatorName', 'curatorEmail'];

  // Get list of columns
  for (const location of data) {
    for (const column in location) {
      if (columns.indexOf(column) === -1) {
        columns.push(column);
      }
    }
  }

  // Drop coordinates
  columns = columns.filter(column => column !== 'coordinates');

  // Turn data into arrays
  const csvData = [columns];
  for (const location of data) {
    const row = [];
    for (const column of columns) {
      // Output lat and long instead
      if (column === 'lat' && location.coordinates) {
        row.push(location.coordinates[1]);
      } else if (column === 'long' && location.coordinates) {
        row.push(location.coordinates[0]);
      } else if (column === 'curatorName') {
        if (location.curator) {
          row.push(location.curator.name);
        }
      } else if (column === 'curatorEmail') {
        if (location.curator) {
          row.push(location.curator.email);
        }
      } else {
        row.push(location[column]);
      }
    }
    csvData.push(row);
  }
  return csvData;
}

// eslint-disable-next-line import/prefer-default-export
export { csvForDay };
