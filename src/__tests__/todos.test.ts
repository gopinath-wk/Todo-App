import request from 'supertest';
import app from '../index';

describe('GET /todos', () => {
  it('should return 401 if no auth token is provided', async () => {
    const res = await request(app).get('/todos');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

});
