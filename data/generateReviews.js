const LorenIpsum = require('lorem-ipsum').LoremIpsum;
const fs = require('fs');
const faker = require('faker');

const boolean = ['true', 'false'];
const userTypes = ['Resident', 'Visitor', 'Resident', 'Resident', 'Resident'];

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

const writeReviewsSQL = fs.createWriteStream('reviews.csv');
writeReviewsSQL.write('userId,neighborhoodId,reviewDate,reviewText,'
    + 'likes,community,commute\n', 'utf8');

// const writeReviewsNoSQL = fs.createWriteStream('reviewsByNeighborhood.csv');
// writeReviewsNoSQL.write('neighborhoodId,username,userType,dogOwner,parent,'
//     + 'reviewDate,reviewText,likes,community,commute\n', 'utf8');

function generateReviews(db, numReviews, numUsers, numNeighborhoods, writer, encoding, callback) {
  let i = numReviews;
  let idx = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      idx += 1;
      // for nosql only
      const neighborhoodIdNoSQL = idx;
      const username = faker.name.findName();
      const userType = userTypes[i % 5];
      const dogOwner = boolean[i % 2];
      const parent = boolean[i % 2];
      // for nosql and sql
      const userId = Math.floor(Math.random() * numUsers) + 1;
      const neighborhoodIdSQL = Math.floor(Math.random() * numNeighborhoods) + 1;
      const reviewDate = randomDate();
      const reviewText = textGenerator.generateParagraphs(1);
      const likes = Math.floor(Math.random() * 150) + 1;
      const community = boolean[i % 2];
      const commute = boolean[i % 2];
      const dataNoSQL = `${neighborhoodIdNoSQL},${username},${userType},${dogOwner},${parent},${reviewDate},${reviewText},${likes},${community},${commute}\n`;
      const dataSQL = `${userId},${neighborhoodIdSQL},${reviewDate},${reviewText},${likes},${community},${commute}\n`;
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

// generate 100M reviews with 10M users and 10M neighborhoods
generateReviews('sql', 100000000, 10000000, 10000000, writeReviewsSQL, 'utf-8', () => {
  writeReviewsSQL.end();
});

// generateReviews('nosql', 100000000, 10000000, 10000000, writeReviewsNoSQL, 'utf-8', () => {
//   writeReviewsNoSQL.end();
// });
