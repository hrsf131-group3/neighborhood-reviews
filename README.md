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
* ###### `GET /neighborhoods/{neighborhood-id}/stats`
  * Path params: `neighborhood-id`
  * Request Body:
  * Response Object:
* ###### `PUT /neighborhoods/{neighborhood-id}/stats`
  * Path params: `neighborhood-id`
  * Request Body:
  * Response Object:
* ###### `DELETE /neighborhoods/{neighborhood-id}/stats`
  * Path params: `neighborhood-id`
  * Request Body:
  * Response Object:

### Reviews
* ###### `GET /neighborhoods/{neighborhood-id}/reviews`
  * Path params: `neighborhood-id`
  * Request Body:
  * Response Object:
* ###### `GET /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Path params: `neighborhood-id`, `user-id`
  * Request Body:
  * Response Object:
* ###### `POST /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Path params: `neighborhood-id`, `user-id`
  * Request Body:
  * Response Object:
* ###### `PUT /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Path params: `neighborhood-id`, `user-id`
  * Request Body:
  * Response Object:
* ###### `DELETE /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Path params: `neighborhood-id`, `user-id`
  * Request Body:
  * Response Object:
