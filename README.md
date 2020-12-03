# Neighborhood Reviews

> This projects features a mock version of Truila's neighborhood reviews. Users can see neighborhood stats and filter reviews based on a variety of categories.

## Set-up

1. `npm install`
2. `npm run webpack` to run webpack
3. `npm start` to run the express-server

## Requirements

- Node 14.15.0

## API Endpoints

### Neighborhood Info
__Get neighborhood stats and reviews__
* ###### `GET /neighborhoods/{neighborhood-id}`
  * Path Parameters: `neighborhood-id`
  * Success Status Code: 200
  * Request Body:
    ```
      {
        "neighborhood_id": 2
      }
    ```
  * Response Object: JSON
    ```
    {
      "neighborhood_id": 2,
      “name”: “SOMA",
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
      },
      "reviews": {
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
        },
      },
    }
    ```

### Stats
__Get neighborhood stats__
* ###### `GET /neighborhoods/{neighborhood-id}/stats`
  * Path Parameters: `neighborhood-id`
  * Success Status Code: 200
  * Request Body:
    ```
      {
        "neighborhood_id": 2
      }
    ```
  * Response Object: JSON
    ```
    {
      "neighborhood_id": 2,
      “name”: “SOMA",
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
      },
    }
    ```

__Add neighborhood stats__
* ###### `POST /neighborhoods/stats`
  * Path Parameters: NA
  * Success Status Code: 201
  * Request Body:
    ```
    {
      “name”: “Mission",
      "stats": {
        "dog_friendly": 0.78,
        "grocery_stores": 0.70,
        "neighbors_friendly": 0.82,
        "parking_easy": 0.32,
        "yard": 0.62,
        "community_events": 0.88,
        "sidewalks": 0.77,
        "walk_night": 0.28,
        "five_years": 0.91,
        "kids_outside": 0.65,
        "car": 0.43,
        "restaurants": 0.89,
        "streets": 0.77,
        "holiday": 0.58,
        "quiet": 0.49,
        "wildlife": 0.22,
      },
    }
    ```
  * Response Object: NA


__Update neighborhood stats__
* ###### `PUT /neighborhoods/{neighborhood-id}/stats`
  * Path Parameters: `neighborhood-id`
  * Success Status Code: 201
  * Request Body:
    ```
    {
      "neighborhood_id": 111,
      “name”: “Pacific Heights",
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
      },
    }
    ```
  * Response Object: NA

__Delete neighborhood stats__
* ###### `DELETE /neighborhoods/{neighborhood-id}/stats`
  * Path Parameters: `neighborhood-id`
  * Success Status Code: 204
  * Request Body:
    ```
    {
      "neighborhood_id": 111
    }
    ```
  * Response Object: NA

### Reviews
__Get neighborhood reviews__
* ###### `GET /neighborhoods/{neighborhood-id}/reviews`
  * Path Parameters: `neighborhood-id`
  * Success Status Code: 200
  * Request Body:
    ```
    {
      "neighborhood_id": 111
    }
    ```
  * Response Object: JSON
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

__Get neighborhood reviews by user__
* ###### `GET /neighborhoods/{neighborhood-id}/reviews/{user-id}`
  * Path Parameters: `neighborhood-id`, `user-id`
  * Success Status Code: 200
  * Request Body:
    ```
    {
      "neighborhood_id": 111,
      "user_id": 20
    }
    ```
  * Response Object: JSON
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

__Add neighborhood reviews__
* ###### `POST /neighborhoods/{neighborhood-id}/reviews`
  * Path Parameters: `neighborhood-id`
  * Success Status Code: 201
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

__Update neighborhood reviews by user__
* ###### `PUT /neighborhoods/{neighborhood-id}/reviews/{id}`
  * Path Parameters: `neighborhood-id`, `id` (review id)
  * Success Status Code: 201
  * Request Body:
    ```
    {
      "neighborhood_id": 100,
      "id": 22,
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
  * Response Object: NA

__Delete neighborhood reviews by user__
* ###### `DELETE /neighborhoods/{neighborhood-id}/reviews/{id}`
  * Path Parameters: `neighborhood-id`, `id` (review id)
  * Success Status Code: 204
  * Request Body:
    ```
    {
      "neighborhood_id": 111,
      "id": 20
    }
    ```
  * Response Object: NA
