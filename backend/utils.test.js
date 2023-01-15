const jwt = require('jsonwebtoken');
const { generateToken, getCleanUser } = require('./utils');

describe('generateToken', () => {
  test('should return a valid JWT token', () => {
    // set JWT_SECRET in environment variable
    process.env.JWT_SECRET = 'V3RY#1MP0RT@NT$3CR3T#';
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      profile_img: 'http://example.com/avatar.png',
      password: 'password'
    };
    const token = generateToken(user);
    expect(token).toBeTruthy();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toMatchObject({
      id: user.id,
      name: user.name,
      email: user.email,
      profile_img: user.profile_img
    });
  });

  test('should return null if user is not provided', () => {
    const token = generateToken();
    expect(token).toBeFalsy();
  });
});

describe('getCleanUser', () => {
  test('should return a clean user object', () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      profile_img: 'http://example.com/avatar.png',
      password: null
    };
    const cleanUser = getCleanUser(user);
    expect(cleanUser).toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      profile_img: user.profile_img,
      password: user.password
    });
  });

  test('should return null if user is not provided', () => {
    const cleanUser = getCleanUser();
    expect(cleanUser).toBeFalsy();
  });
});