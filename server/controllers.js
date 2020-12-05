const db = require('../db/connection.js');

module.exports = {
  getAllStats: (req, res) => {
    let id = req.params.id;
    console.log('id', id);
    db.connection.query('Select * from neighborhoods where id = (Select neighborhood_id from listings where listings.id = ?)', [id], (err, result) => {
      if (err) {
        console.log('getAllStats error', err);
        res.status(404).json(err);
      } else {
        console.log('getAllStats success');
        const formattedResultArr = [];
        for (let i = 0; i < result.length; i += 1) {
          let resultObj = {
            id: result[i].id,
            name: result[i].name,
            stats: {
              dog_friendly: result[i].dog_friendly,
              grocery_stores: result[i].grocery_stores,
              neighbors_friendly: result[i].neighbors_friendly,
              parking_easy: result[i].parking_easy,
              yard: result[i].yard,
              community_events: result[i].community_events,
              sidewalks: result[i].sidewalks,
              walk_night: result[i].walk_night,
              five_years: result[i].five_years,
              kids_outside: result[i].kids_outside,
              car: result[i].car,
              restaurants: result[i].restaurants,
              streets: result[i].streets,
              holiday: result[i].holiday,
              quiet: result[i].quiet,
              wildlife: result[i].wildlife,
            },
          };
          formattedResultArr.push(resultObj);
        }
        res.status(200).json(formattedResultArr);
      }
    });
  },
  getAllReviews: (req, res) => {
    const id = req.params.id;
    let category = req.query.category;
    let query = 'Select * from reviews INNER JOIN users ON reviews.userid = users.id where reviews.neighborhood_id = (Select neighborhood_id from listings where listings.id = ?)';
    if (category === 'parent') {
      query += ' AND users.parent = 1';
    } else if (category === 'dog_owner') {
      query += ' AND users.dog_owner = 1';
    } else if (category === 'community') {
      query += ' AND reviews.community = 1';
    } else if (category === 'commute') {
      query += ' AND reviews.commute = 1';
    }

    db.connection.query(query, [id], (err, result) => {
      if (err) {
        console.log('getAllReviews error', err);
        res.status(404).json(err);
      } else {
        console.log('getAllReviews success');
        // var result = JSON.parse(result);
        console.log('result', result);
        const formattedResultArr = [];
        for (let i = 0; i < result.length; i += 1) {
          let resultObj = {
            username: result[i].name,
            user_type: result[i].user_type,
            review_date: result[i].review_date,
            full_text: result[i].full_text,
            likes: result[i].likes,
            category: {
              parent: result[i].parent === 1 ? true : false,
              commute: result[i].commute === 1 ? true : false,
              dog_owner: result[i].dog_owner === 1 ? true : false,
              community: result[i].community === 1 ? true : false,
            },
          };
          formattedResultArr.push(resultObj);
        }
        // console.log('resultObj', resultObj);
        res.status(200).json(formattedResultArr);
      }
    });
  },

};
