CREATE KEYSPACE homes WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor' : 1};

CREATE TABLE homes.listings (
  listingId int,
  neighborhoodId int,
  neighborhood text,
  PRIMARY KEY (listingId) )
  WITH comment = 'Q1. Find listings';

CREATE TABLE homes.stats_by_neighborhood (
  neighborhoodId int,
  neighborhood text,
  dogFriendly float,
  groceryStores float,
  neighborsFriendly float,
  parkingEasy float,
  yard float,
  communityEvents float,
  sidewalks float,
  walkNight float,
  fiveYears float,
  kidsOutside float,
  car float,
  restaurants float,
  streets float,
  holiday float,
  quiet float,
  wildlife float,
  PRIMARY KEY (neighborhoodId) )
  WITH comment = 'Q2. Find stats by neighborhood';

CREATE TABLE homes.reviews_by_neighborhood (
  neighborhoodId int,
  username text,
  userType text,
  dogOwner boolean,
  parent boolean,
  reviewDate text,
  reviewText text,
  likes int,
  community boolean,
  commute boolean,
  PRIMARY KEY (neighborhoodId) )
  WITH comment = 'Q3. Find reviews by neighborhood'
