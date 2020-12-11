const { pool } = require('../db/psqlConnection.js');

const getNeighborhoods = (req, res) => {
  const listingId = parseInt(req.params.id);
  pool.query('Select * from neighborhoods where id = (Select neighborhoodid from listings where listings.id = $1)',
    [listingId], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
};

const getReviews = (req, res) => {
  const listingId = parseInt(req.params.id);
  pool.query('Select * from reviews INNER JOIN users ON reviews.userid = users.id where reviews.neighborhoodid = (Select neighborhoodid from listings where listings.id = $1)',
    [listingId], (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    });
};

const addNeighborhood = (req, res) => {
  console.log(req.body);
  const { name, dogfriendly, grocerystores, neighborsfriendly, parkingeasy, yard,
    communityevents, sidewalks, walknight, fiveyears, kidsoutside, car, restaurants,
    streets, holiday, quiet, wildlife } = req.body;

  pool.query(
    `INSERT INTO neighborhoods (name, dogfriendly, grocerystores, neighborsfriendly, parkingeasy, yard, communityevents,
    sidewalks, walknight, fiveyears, kidsoutside, car, restaurants, streets, holiday, quiet, wildlife) VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
    [name, dogfriendly, grocerystores, neighborsfriendly, parkingeasy, yard, communityevents,
      sidewalks, walknight, fiveyears, kidsoutside, car, restaurants, streets, holiday, quiet, wildlife],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.sendStatus(201);
    });
};

module.exports = {
  getNeighborhoods,
  getReviews,
  addNeighborhood,
};
