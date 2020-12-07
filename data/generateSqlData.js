const faker = require('faker');
const fs = require('fs');

// const csvWriter = require('csv-write-stream');
// const neighborhoodsWriter = csvWriter();
// const listingsWriter = csvWriter();
// const usersWriter = csvWriter();

const boolean = ['true', 'false'];
const userTypes = ['Resident', 'Visitor', 'Resident', 'Resident', 'Resident'];

const writeNeighborhoods = fs.createWriteStream('neighborhoods.csv');
writeNeighborhoods.write('name,dogFriendly,groceryStores,neighborsFriendly,'
    + 'parkingEasy,yard,communityEvents,sidewalks,walkNight,fiveYears,kidsOutside,car,restaurants,'
    + 'streets,holiday,quiet,wildlife\n', 'utf8');

const writeListings = fs.createWriteStream('listings.csv');
writeListings.write('id,username,avatar\n', 'utf8');

const writeUsers = fs.createWriteStream('users.csv');
writeUsers.write('id,username,avatar\n', 'utf8');

function writeManyNeighborhoods(numNeighborhoods, writer, encoding, callback) {
  let i = numNeighborhoods;
  let id = 0;

  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const name = `neighborhood${id}`;
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

function writeManyUsers(numUsers, writer, encoding, callback) {
  let i = numUsers;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const name = faker.name.findName();
      const userType = userTypes[id % 5];
      const dogOwner = boolean[id % 2];
      const parent = boolean[id % 2];
      const data = `${name},${userType},${dogOwner},${parent}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write();
}

// write 10M neighborhoods
writeManyNeighborhoods(100000, writeNeighborhoods, 'utf-8', () => {
  writeNeighborhoods.end();
});
// write 200M listings with 10M neighborhoods
writeManyListings(100000, writeListings, 'utf-8', () => {
  writeListings.end();
});
// write 10M users
writeManyUsers(100000, writeUsers, 'utf-8', () => {
  writeUsers.end();
});

// const generateNeighborhoods = function (numNeighborhoods) {
//   neighborhoodsWriter.pipe(fs.createWriteStream('neighborhoods.csv'));
//   for (let i = 1; i <= numNeighborhoods; i += 1) {
//     const stats = neighborhoodStatsGenerator();
//     neighborhoodsWriter.write({
//       name: `neighborhood${i}`,
//       ...stats,
//     });
//   }
//   neighborhoodsWriter.end();
//   console.log('neighborhoods csv created');
// };

const generateListings = function (numListings, numNeighborhoods) {
  listingsWriter.pipe(fs.createWriteStream('listings.csv'));
  for (let i = 1; i <= numListings; i += 1) {
    listingsWriter.write({
      neighborhoodId: Math.floor(Math.random() * numNeighborhoods) + 1,
    });
  }
  listingsWriter.end();
  console.log('lisintgs csv created');
};

const generateUsers = function (numUsers) {
  usersWriter.pipe(fs.createWriteStream('users.csv'));
  for (let i = 1; i <= numUsers; i += 1) {
    usersWriter.write({
      name: faker.name.findName(),
      userType: userType[i % 5],
      dogOwner: boolean[i % 2],
      parent: boolean[i % 2],
    });
  }
  usersWriter.end();
  console.log('users csv created');
};

async function generateCSV() {
  // generate 10M neighborhoods
  await generateNeighborhoods(10000000);
  // generate 200M listings with 10M neighborhoods
  // await generateListings(10000000, 100000);
  // generate 10M users
  // await generateUsers(10000000);
}

generateCSV();
