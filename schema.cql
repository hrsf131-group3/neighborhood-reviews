CREATE KEYSPACE homes WITH replication =
  {'class': 'SimpleStrategy', 'replication_factor' : 1};

CREATE TABLE homes.listings (
  listingId int,
  neighborhoodId int,
  PRIMARY KEY (listingId) )
  WITH comment = 'Q1. Find listings';

CREATE TABLE homes.stats_by_neighborhood (
  neighborhood text,
  dogFriendly decimal,
  groceryStores decimal,
  neighborsFriendly decimal,
  parkingEasy decimal,
  yard decimal,
  communityEvents decimal,
  sidewalks decimal,
  walkNight decimal,
  fiveYears decimal,
  kidsOutside decimal,
  car decimal,
  restaurants decimal,
  streets decimal,
  holiday decimal,
  quiet decimal,
  wildlife decimal,
  PRIMARY KEY (neighborhood) )
  WITH comment = 'Q1. Find information about a listing';

CREATE TABLE homes.reviews_by_neighborhood (
  neighborhood text,
  username text,
  userType text,
  dogOwner boolean,
  parent boolean,
  reviewDate date,
  reviewText text,
  likes int,
  community boolean,
  commute boolean,
  PRIMARY KEY ((neighborhood), reviewDate) )
  WITH comment = 'Q2. Find reviews by listing id'
  AND CLUSTERING ORDER BY (reviewDate ASC) ;