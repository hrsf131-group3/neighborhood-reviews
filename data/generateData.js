const LorenIpsum = require('lorem-ipsum').LoremIpsum;
const faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const neighborhoodsWriter = csvWriter();
const listingsWriter = csvWriter();
const usersWriter = csvWriter();
const reviewsWriter = csvWriter();

const neighborhoodStatsGenerator = function () {
  return {
    dogFriendly: Math.random().toFixed(2),
    groceryStores: Math.random().toFixed(2),
    neighborsFriendly: Math.random().toFixed(2),
    parkingEasy: Math.random().toFixed(2),
    yard: Math.random().toFixed(2),
    communityEvents: Math.random().toFixed(2),
    sidewalks: Math.random().toFixed(2),
    walkNight: Math.random().toFixed(2),
    fiveYears: Math.random().toFixed(2),
    kidsOutside: Math.random().toFixed(2),
    car: Math.random().toFixed(2),
    restaurants: Math.random().toFixed(2),
    streets: Math.random().toFixed(2),
    holiday: Math.random().toFixed(2),
    quiet: Math.random().toFixed(2),
    wildlife: Math.random().toFixed(2),
  };
};

const randomDate = function () {
  const start = new Date(2015, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString('en-US');
};

const textGenerator = new LorenIpsum({
  sentencesPerParagraph: {
    max: 4,
    min: 2,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const generateNeighborhoods = function (numNeighborhoods) {
  neighborhoodsWriter.pipe(fs.createWriteStream('neighborhoods.csv'));
  for (let i = 1; i <= numNeighborhoods; i += 1) {
    const stats = neighborhoodStatsGenerator();
    neighborhoodsWriter.write({
      name: `neighborhood${i}`,
      ...stats,
    });
  }
  neighborhoodsWriter.end();
  console.log('neighborhoods csv created');
};

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
      userType: 'Resident',
      dogOwner: Math.random() < 0.5,
      parent: Math.random() < 0.5,
    });
  }
  usersWriter.end();
  console.log('users csv created');
};

const generateReviews = function (numReviews, numUsers, numNeighborhoods) {
  reviewsWriter.pipe(fs.createWriteStream('reviews.csv'));
  for (let i = 1; i < numReviews; i += 1) {
    reviewsWriter.write({
      userId: Math.floor(Math.random() * numUsers) + 1,
      neighborhoodId: Math.floor(Math.random() * numNeighborhoods) + 1,
      reviewDate: randomDate(),
      reviewText: textGenerator.generateParagraphs(1),
      likes: Math.floor(Math.random() * 150) + 1,
      community: Math.random() < 0.5,
      commute: Math.random() < 0.5,
    });
  }
  reviewsWriter.end();
  console.log('reviews csv created');
};

async function generateCSV() {
  // generate 10K neighborhoods
  await generateNeighborhoods(10000);
  // generate 10M listings with 10K neighborhoods
  await generateListings(10000000, 10000);
  // generate 10K users
  await generateUsers(10000);
  // generate 100K reviews with 10K users and 10K neighborhoods
  await generateReviews(100000, 10000, 10000);
}

generateCSV();
