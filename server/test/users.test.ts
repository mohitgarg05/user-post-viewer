// tests/users.test.ts

import request from 'supertest';
import app from '../src/index'; 
import axios from 'axios';

  
describe('GET /users', () => {
  it('responds with 200 status code and returns an array of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('responds with 500 status code when an error occurs', async () => {
    // Mocking axios.get to simulate an error
    jest.mock('axios');
    (axios.get as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

    const response = await request(app).get('/users');
    expect(response.status).toBe(500);
  });

  it('returns the correct number of users based on query parameters', async () => {
    const response = await request(app).get('/users?page=2&limit=3');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
});

afterAll(() => {
  app.close();
});
