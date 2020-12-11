const LorenIpsum = require('lorem-ipsum').LoremIpsum;
const fs = require('fs');
const faker = require('faker');
const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const bar2 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const boolean = [true, false];
const userTypes = ['Resident', 'Visitor', 'Resident', 'Resident', 'Resident'];

const randomDate = function () {
  const start = new Date(2015, 0, 1);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString('en-US');
};

const textGenerator = new LorenIpsum({
  sentencesPerParagraph: {
    max: 2,
    min: 1,
  },
  wordsPerSentence: {
    max: 10,
    min: 4,
  },
});

const writeReviewsSQL = fs.createWriteStream('reviews.csv');
writeReviewsSQL.write('userId,neighborhoodId,reviewDate,reviewText,'
    + 'likes,community,commute\n', 'utf8');

const writeReviewsNoSQL = fs.createWriteStream('reviewsByNeighborhood.csv');
writeReviewsNoSQL.write('listingId,neighborhoodId,username,userType,dogOwner,parent,'
    + 'reviewDate,reviewText,likes,community,commute\n', 'utf8');

function generateReviews(db, numReviews, numUsers, numNeighborhoods, numListings, writer, encoding, callback) {
  let i = numReviews;
  let idx = 0;
  bar1.start(numReviews, 0);

  function write() {
    let ok = true;
    do {
      i -= 1;
      idx += 1;
      if (idx % 100000 === 0) {
        bar1.update(idx);
      }
      // for nosql only
      const username = faker.name.findName();
      const userType = userTypes[i % 5];
      const dogOwner = boolean[i % 2];
      const parent = boolean[i % 2];
      // for nosql and sql
      const listingId = Math.floor(Math.random() * numListings) + 1;
      const neighborhoodId = Math.floor(Math.random() * numNeighborhoods) + 1;
      const userId = Math.floor(Math.random() * numUsers) + 1;
      const reviewDate = randomDate();
      const reviewText = textGenerator.generateParagraphs(1);
      const likes = Math.floor(Math.random() * 150) + 1;
      const community = boolean[i % 2];
      const commute = boolean[i % 2];
      const dataNoSQL = `${listingId},${neighborhoodId},${username},${userType},${dogOwner},${parent},${reviewDate},${reviewText},${likes},${community},${commute}\n`;
      const dataSQL = `${userId},${neighborhoodId},${reviewDate},${reviewText},${likes},${community},${commute}\n`;
      const data = db === 'sql' ? dataSQL : dataNoSQL;
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

const writeNewReviews = fs.createWriteStream('newreviews.csv');
writeNewReviews.write('neighborhoodId|listingId|reviews\n', 'utf8');

// create list of reviews
const generateReviewSet = function (noUsers, noReviews) {
  const reviews = [];
  for (let i = 1; i <= noReviews; i += 1) {
    const username = `username:${faker.name.findName()}`;
    const userType = `userType:${userTypes[i % 5]}`;
    const dogOwner = `dogOwner:${boolean[i % 2]}`;
    const parent = `parent:${boolean[i % 2]}`;
    const userId = `userId:${Math.floor(Math.random() * noUsers) + 1}`;
    const reviewDate = `reviewDate:${randomDate()}`;
    const reviewText = `reviewText:${textGenerator.generateParagraphs(1)}`;
    const likes = `likes:${Math.floor(Math.random() * 150) + 1}`;
    const community = `community:${boolean[i % 2]}`;
    const commute = `commute:${boolean[i % 2]}`;
    const review = `{${username},${userType},${dogOwner},${parent},${userId},${reviewDate},${reviewText},${likes},${community},${commute}}`;
    reviews.push(review);
  }
  return `[${reviews.toString()}]`;
};
// console.log(generateReviewSet(1, 1));

function generateNewReviews (numReviews, numUsers, numNeighborhoods, numListings, writer, encoding, callback) {
  let i = numNeighborhoods;
  let idx = 0;
  bar2.start(numNeighborhoods, 0);
  function write() {
    let ok = true;
    do {
      i -= 1;
      idx += 1;
      if (idx % 100000 === 0) {
        bar1.update(idx);
      }
      const neighborhoodId = idx;
      const listingId = Math.floor(Math.random() * numListings) + 1;
      const randomReviewNo = Math.floor(Math.random() * 15) + 1;
      const reviews = generateReviewSet(numUsers, randomReviewNo + 2);
      const data = `${neighborhoodId}|${listingId}|${reviews}\n`;
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

// generate 100M reviews with 10M users and 10M neighborhoods
async function generateCSV() {
  await generateReviews('sql', 100000000, 10000000, 10000000, writeReviewsSQL, 'utf-8', () => {
    writeReviewsSQL.end();
  });
  await generateReviews('nosql', 1000, 100, 100, 2000, writeReviewsNoSQL, 'utf-8', () => {
    writeReviewsNoSQL.end();
  });
  await generateReviews('nosql', 100000000, 10000000, 10000000, 200000000, writeReviewsNoSQL, 'utf-8', () => {
    writeReviewsNoSQL.end();
  });
  await generateNewReviews(100000000, 10000000, 10000000, 200000000, writeNewReviews, 'utf-8', () => {
    writeNewReviews.end();
  });
  await generateNewReviews(100, 10, 10, 200, writeNewReviews, 'utf-8', () => {
    writeNewReviews.end();
  });
}

generateCSV();

