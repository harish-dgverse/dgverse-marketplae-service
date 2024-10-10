const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');
const { userOne, userTwo } = require('../fixtures/user.fixture');

describe('User routes', () => {
  describe('GET /v1/users', () => {
    test('should return 200 and apply the default query options', async () => {
      request(app).get('/v1/users').send().expect(httpStatus.OK);
    });
  });
});
