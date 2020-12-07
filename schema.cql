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
  PRIMARY KEY (neighborhoodId) )
  WITH comment = 'Q2. Find stats by neighborhood';

CREATE TABLE homes.reviews_by_neighborhood (
  neighborhoodId int,
  username text,
  userType text,
  dogOwner boolean,
  parent boolean,
  reviewDate date,
  reviewText text,
  likes int,
  community boolean,
  commute boolean,
  PRIMARY KEY ((neighborhoodId), reviewDate) )
  WITH comment = 'Q3. Find reviews by neighborhood'
  AND CLUSTERING ORDER BY (reviewDate ASC) ;
