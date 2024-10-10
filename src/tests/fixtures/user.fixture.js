const { faker } = require('@faker-js/faker');

const password = 'password1';

const userOne = {
  email: faker.internet.email().toLowerCase(),
  password,
};

const userTwo = {
  email: faker.internet.email().toLowerCase(),
  password,
};

module.exports = {
  userOne,
  userTwo,
};
