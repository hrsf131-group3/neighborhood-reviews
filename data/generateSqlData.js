const faker = require('faker');
const fs = require('fs');
const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const bar3 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const boolean = ['true', 'false'];
const userTypes = ['Resident', 'Visitor', 'Resident', 'Resident', 'Resident'];

const writeNeighborhoods = fs.createWriteStream('neighborhoods.csv');
writeNeighborhoods.write('name,dogFriendly,groceryStores,neighborsFriendly,'
    + 'parkingEasy,yard,communityEvents,sidewalks,walkNight,fiveYears,kidsOutside,car,restaurants,'
    + 'streets,holiday,quiet,wildlife\n', 'utf8');

function writeManyNeighborhoods(numNeighborhoods, writer, encoding, callback) {
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
      const name = `neighborhood${idx}`;
      const dogFriendly = Math.random().toFixed(2);
      const groceryStores = Math.random().toFixed(2);
      const neighborsFriendly = Math.random().toFixed(2);
      const parkingEasy = Math.random().toFixed(2);
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
      const data = `${name},${dogFriendly},${groceryStores},${neighborsFriendly},${parkingEasy},${yard},${communityEvents},${sidewalks},${walkNight},${fiveYears},${kidsOutside},${car},${restaurants},${streets},${holiday},${quiet},${wildlife}\n`;
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

const writeListings = fs.createWriteStream('listings.csv');
writeListings.write('neighborhoodId\n', 'utf8');

function writeManyListings(numListings, numNeighborhoods, writer, encoding, callback) {
  let i = numListings;
  let idx = 0;
  bar2.start(numListings, 0);

  function write() {
    let ok = true;
    do {
      i -= 1;
      idx += 1;
      if (idx % 100000 === 0) {
        bar2.update(idx);
      }
      const neighborhoodId = Math.floor(Math.random() * numNeighborhoods) + 1;
      const data = `${neighborhoodId}\n`;
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

const writeUsers = fs.createWriteStream('users.csv');
writeUsers.write('name,userType,dogOwner,parent\n', 'utf8');

function writeManyUsers(numUsers, writer, encoding, callback) {
  let i = numUsers;
  let idx = 0;
  bar3.start(numUsers, 0);

  function write() {
    let ok = true;
    do {
      i -= 1;
      idx += 1;
      if (idx % 100000 === 0) {
        bar1.update(idx);
      }
      const name = faker.name.findName();
      const userType = userTypes[idx % 5];
      const dogOwner = boolean[idx % 2];
      const parent = boolean[idx % 2];
      const data = `${name},${userType},${dogOwner},${parent}\n`;
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

async function generateCSV() {
  // write 10M neighborhoods
  await writeManyNeighborhoods(10000000, writeNeighborhoods, 'utf-8', () => {
    writeNeighborhoods.end();
  });
  // write 200M listings with 10M neighborhoods
  await writeManyListings(200000000, 10000000, writeListings, 'utf-8', () => {
    writeListings.end();
  });
  // write 10M users
  await writeManyUsers(10000000, writeUsers, 'utf-8', () => {
    writeUsers.end();
  });
}

generateCSV();
