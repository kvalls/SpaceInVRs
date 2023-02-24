const request = require('supertest');
const app = require('../server');
const db = require('../models');
const bcrypt = require('bcryptjs');
const utils = require('../utils');

describe('User API', () => {
  beforeAll(async () => {
    // await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.user.destroy({ where: {} });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const password = 'test1234';
      const hashedPassword = bcrypt.hashSync(password);
      const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: password,
        role_id: 1
      };
      const response = await request(app)
        .post('/api/users')
        .field('name', user.name)
        .field('email', user.email)
        .field('password', user.password)
        .field('role_id', user.role_id);
      expect(response.status).toBe(200);
      expect(response.body.user.name).toBe(user.name);
      expect(response.body.user.email).toBe(user.email);
      expect(response.body.user.role_id).toBe(user.role_id);
      expect(bcrypt.compareSync(user.password, response.body.user.password)).toBe(true);
      expect(utils.verifyToken(response.body.access_token)).toBeTruthy();
    });

    it('should return a 400 error if required fields are missing', async () => {
      const user = {
        name: 'John Doe',
        password: 'test1234',
      };
      const response = await request(app)
        .post('/api/users')
        .field('name', user.name)
        .field('password', user.password);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Content can not be empty!');
    });

    it('should return a 401 error if password is incorrect', async () => {
      const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'test1234',
        role_id: 1
      };
      await db.user.create({
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync('differentpassword'),
        role_id: user.role_id
      });
      const response = await request(app)
        .post('/api/users')
        .field('name', user.name)
        .field('email', user.email)
        .field('password', user.password)
        .field('role_id', user.role_id);
      expect(response.status).toBe(401);
      expect(response.text).toBe('Password not valid!');
    });

    it('should return a 500 error if there is a server error', async () => {
      const spyOnCreate = jest.spyOn(db.user, 'create').mockRejectedValueOnce(new Error('test error'));
      const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'test1234',
        role_id: 1
      };
      const response = await request(app)
        .post('/api/users')
        .field('name', user.name)
        .field('email', user.email)
        .field('password', user.password)
        .field('role_id', user.role_id);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('test error');
      spyOnCreate.mockRestore();
    });
  });
});