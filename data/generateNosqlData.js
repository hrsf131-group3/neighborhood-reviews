const fs = require('fs');
const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const writeStats = fs.createWriteStream('statsByNeighborhood.csv');
writeStats.write('neighborhoodId,neighborhood,dogFriendly,groceryStores,neighborsFriendly,'
    + 'parkingEasy,yard,communityEvents,sidewalks,walkNight,fiveYears,kidsOutside,car,restaurants,'
    + 'streets,holiday,quiet,wildlife\n', 'utf8');

function writeStatsByNeighborhood(numNeighborhoods, writer, encoding, callback) {
  let i = numNeighborhoods;
  let idx = 0;
  bar1.start(numNeighborhoods, 0);

  function write() {
    let ok = true;
    do {
      i -= 1;
      idx += 1;
      if (idx % 100000 === 0) {
        bar1.update(idx);
      }
      const neighborhoodId = idx;
      const neighborhood = `neighborhood${idx}`;
      const dogFriendly = Math.random().toFixed(2);
      const groceryStores = Math.random().toFixed(2);
      const neighborsFriendly = Math.random().toFixed(2);
      const parkingEasy =  Math.random().toFixed(2);
      const yard = Math.random().toFixed(2);
      const communityEvents = Math.random().toFixed(2);
      const sidewalks = Math.random().toFixed(2);
      const walkNight = Math.random().toFixed(2);
      const fiveYears = Math.random().toFixed(2);
      const kidsOutside = Math.random().toFixed(2);
      const car = Math.random().toFixed(2);
      const restaurants = Math.random().toFixed(2);
      const streets = Math.random().toFixed(2);
      const holiday = Math.random().toFixed(2);
      const quiet = Math.random().toFixed(2);
      const wildlife = Math.random().toFixed(2);
      const data = `${neighborhoodId},${neighborhood},${dogFriendly},${groceryStores},${neighborsFriendly},${parkingEasy},${yard},${communityEvents},${sidewalks},${walkNight},${fiveYears},${kidsOutside},${car},${restaurants},${streets},${holiday},${quiet},${wildlife}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

// write records for 10M neighborhoods
writeStatsByNeighborhood(10000000, writeStats, 'utf-8', () => {
  writeStats.end();
});
