const request = require('supertest');
const app = require('../src/app');

describe('Optimized App Tests', () => {
  test('Welcome returns enhanced info', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Welcome to Optimized CI/CD Demo!');
    expect(res.body.version).toBe('2.0.0');
    expect(res.body.buildInfo).toBeDefined();
  });

  test('Health returns metrics', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.nodeVersion).toBeDefined();
  });

  test('Performance endpoint works', async () => {
    const res = await request(app).get('/api/performance');
    expect(res.status).toBe(200);
    expect(res.body.memoryUsage).toBeDefined();
  });

  test('API endpoint works', async () => {
    const res = await request(app).get('/api/hello');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('Unknown route 404', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Route not found');
  });
});