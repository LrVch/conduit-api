import supertest from 'supertest';
import app from './server';
import { doTheTitle } from './utils';

describe('Server', () => {
  describe(doTheTitle('GET /'), () => {
    test('It should response the GET method', async () => {
      const response: any = await supertest(app)
        .get('/')
        .set('Accept', 'application/json');

      const { headers, statusCode, text, body } = response;

      expect(headers['content-type']).toBe('application/json; charset=utf-8');
      expect(headers['content-length']).toBe('26');
      expect(statusCode).toBe(200);
      expect(body).toEqual({ message: 'Hello World!' });
    });
  });
});
