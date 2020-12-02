# Neighborhood Reviews

> This projects features a mock version of Turila's neighborhood reviews. Users can see neighborhood stats and filter reviews based on a variety of categories.

## Set-up

1. `npm install`
2. `npm run webpack` to run webpack
3. `npm start` to run the express-server

## Requirements

- Node 14.15.0

## API Endpoints

### Stats
* `GET /neighborhoods/{id}/stats`
  * _Get all stats by 'neighborhood id'_
  * Path params: {id}
  * Request Body:
  * Response Object:
* `PUT /neighborhoods/{id}/stats`: Update all stats identified by 'neighborhood id'
* `DELETE /neighborhoods/{id}/stats`: Delete stats by 'neighborhood id'

### Reviews
* `GET /neighborhoods/{id}/reviews`: Get all reviews identified by 'neighborhood id'
* `GET /neighborhoods/{id}/reviews/{user-id}`: Get user review identified by 'neighborhood & user id'
* `POST /neighborhoods/{id}/reviews/{user-id}`: Create a new user review
* `PUT /neighborhoods/{id}/reviews/{user-id}`: Update user review identified by 'neighborhood & user id'
* `DELETE /neighborhoods/{id}/reviews/{user-id}`: Delete user review identified by 'neighborhood & user id'
