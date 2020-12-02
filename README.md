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
__Get neighborhood stats__
* ###### `GET /neighborhoods/{neighborhood-id}/stats`
  * Path Parameters: `neighborhood-id`
  * Success Status Code: 200
  * Response Object: JSON
    ```
    {
      "neighborhood_id": 111,
      “name”: “SoMA
      "stats": {
      "dog_friendly": 0.98,
      "grocery_stores": 0.60,
      "neighbors_friendly": 0.82,
      "parking_easy": 0.72,
      "yard": 0.62,
      "community_events": 0.88,
      "sidewalks": 0.77,
      "walk_night": 0.58,
      "five_years": 0.91,
      "kids_outside": 0.65,
      "car": 0.43,
      "restaurants": 0.89,
      "streets": 0.77,
      "holiday": 0.58,
      "quiet": 0.49,
      "wildlife": 0.22,
    }
    ```

__Update neighborhood stats__
* ###### `PUT /neighborhoods/{neighborhood-id}/stats`
  * Request Body:
    ```
    {
      "neighborhood_id": 112,
      “name”: “Pacific Heights
      "stats": {
      "dog_friendly": 0.88,
      "grocery_stores": 0.50,
      "neighbors_friendly": 0.82,
      "parking_easy": 0.72,
      "yard": 0.61,
      "community_events": 0.88,
      "sidewalks": 0.77,
      "walk_night": 0.58,
      "five_years": 0.91,
      "kids_outside": 0.65,
      "car": 0.42,
      "restaurants": 0.89,
      "streets": 0.77,
      "holiday": 0.58,
      "quiet": 0.49,
      "wildlife": 0.22,
    }
    ```
  * Response Object: HTTP Status 201

* ###### `DELETE /neighborhoods/{neighborhood-id}/stats`
  * Request Body:
    ```
    {
      "neighborhood_id": 111
    }
    ```
  * Response Object: HTTP Status 204

### Reviews
* ###### `GET /neighborhoods/{neighborhood-id}/reviews`
  * Request Body:
    ```
    {
      "neighborhood_id": 111
    }
    ```
  * Response Object: HTTP Status 200
    ```
    {
      "username": "Jim",
      “user_type”: “resident”,
      "review_date": "2 months ago",
      "full_text" "This neighborhood is safe",
      "likes": 997,
      “category": {
          "parent": false,
          "commute": false,
          "dog_owner": false,
          "community": false,
          }
      },

    {
      "username": "Sally",
      “user_type”: “resident”,
      "review_date": "5 months ago",
      "full_text" "This neighborhood is great",
      "likes": 45
      “category": {
          "parent": true,
          "commute": false,
          "dog_owner": false,
          "community": false,
          }
      }
      ```

* ###### `GET /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Request Body:
    ```
    {
      "neighborhood_id": 111,
      "user_id": 20
    }
    ```
  * Response Object: HTTP Status 200
    ```
    {
      "username": "John",
      “user_type”: “resident”,
      "review_date": "12 months ago",
      "full_text" "This neighborhood has a great community",
      "likes": 997,
      “category": {
          "parent": true,
          "commute": false,
          "dog_owner": true,
          "community": true,
        }
    }
    ```

* ###### `POST /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Request Body:
    ```
    {
      "neighborhood_id": 100,
      "user_id": 22,
      "username": "Kayla",
      “user_type”: “resident”,
      "review_date": "7 months ago",
      "full_text" "I love the park",
      "likes": 70,
      “category": {
          "parent": true,
          "commute": false,
          "dog_owner": true,
          "community": true,
          }
    }
    ```
  * Response Object: HTTP Status 201

* ###### `PUT /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Request Body:
    ```
    {
      "neighborhood_id": 100,
      "user_id": 22,
      "username": "Kayla",
      “user_type”: “resident”,
      "review_date": "7 months ago",
      "full_text" "I love the park",
      "likes": 70,
      “category": {
          "parent": true,
          "commute": false,
          "dog_owner": true,
          "community": true,
          }
    }
    ```
  * Response Object: HTTP Status 201

* ###### `DELETE /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Request Body:
    ```
    {
      "neighborhood_id": 111,
      "user_id": 20
    }
    ```
  * Response Object: HTTP Status 204
