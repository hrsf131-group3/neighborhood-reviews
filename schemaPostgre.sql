DROP DATABASE IF EXISTS homes;
CREATE DATABASE homes;

USE homes;

CREATE TABLE neighborhoods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dogFriendly DECIMAL(3, 2) NOT NULL,
  groceryStores DECIMAL(3, 2) NOT NULL,
  neighborsFriendly DECIMAL(3, 2) NOT NULL,
  parkingEasy DECIMAL(3, 2) NOT NULL,
  yard DECIMAL(3, 2) NOT NULL,
  communityEvents DECIMAL(3, 2) NOT NULL,
  sidewalks DECIMAL(3, 2) NOT NULL,
  walkNight DECIMAL(3, 2) NOT NULL,
  fiveYears DECIMAL(3, 2) NOT NULL,
  kidsOutside DECIMAL(3, 2) NOT NULL,
  car DECIMAL(3, 2) NOT NULL,
  restaurants DECIMAL(3, 2) NOT NULL,
  streets DECIMAL(3, 2) NOT NULL,
  holiday DECIMAL(3, 2) NOT NULL,
  quiet DECIMAL(3, 2) NOT NULL,
  wildlife DECIMAL(3, 2) NOT NULL
);

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  neighborhoodId INT NOT NULL,
  FOREIGN KEY (neighborhoodId) REFERENCES neighborhoods(id)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  userType VARCHAR(45) NOT NULL,
  dogOwner BOOLEAN NOT NULL,
  parent BOOLEAN NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  neighborhoodId INT NOT NULL,
  reviewDate VARCHAR(255) NOT NULL,
  reviewText TEXT NOT NULL,
  likes INT NOT NULL,
  community BOOLEAN NOT NULL,
  commute BOOLEAN NOT NULL,
  FOREIGN KEY (neighborhoodId) REFERENCES neighborhoods(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);