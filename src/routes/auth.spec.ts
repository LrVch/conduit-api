import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import auth, { getToken } from './auth';

const genToken = (id: string, secret: string = 'secret') =>
  jwt.sign(
    {
      id,
      username: 'username'
    },
    secret
  );
let mockRequest: Request;
let mockResponse: Response;
let mockNextFunction: NextFunction;

beforeEach(() => {
  mockRequest = {} as any;

  mockResponse = {} as any;

  mockNextFunction = jest.fn((error: any) => {
    return error;
  });
});

describe('Auth middleware', () => {
  describe('getToken', () => {
    test('it should return token', () => {
      const res: any = {
        headers: {
          authorization: `Bearer ${genToken('id')}`
        }
      };
      const token = getToken(res as Request);

      expect(token).toBeDefined();
    });

    test("it shouldn't return token", () => {
      const res: any = {
        headers: {}
      };
      const token = getToken(res as Request);

      expect(token).toBeNull();
    });
  });

  describe('auth', () => {
    test('it should validate token and throw an error "No authorization token was found" if no token was passed', () => {
      const middleware = auth.required;

      middleware(mockRequest, mockResponse, mockNextFunction);

      expect(mockNextFunction).toHaveBeenCalledWith({
        name: 'UnauthorizedError',
        message: 'No authorization token was found',
        code: 'credentials_required',
        status: 401,
        inner: { message: 'No authorization token was found' }
      });
    });
    test('it should validate token and throw an error "invalid signature" if secret is invalid', (done: any) => {
      const middleware = auth.required;
      mockRequest.headers = {
        authorization: `Bearer ${genToken('id', 'invalid secret')}`
      };

      middleware(mockRequest, mockResponse, mockNextFunction);

      setTimeout(() => {
        expect(mockNextFunction).toHaveBeenCalledWith({
          name: 'UnauthorizedError',
          message: 'invalid signature',
          code: 'invalid_token',
          status: 401,
          inner: { name: 'JsonWebTokenError', message: 'invalid signature' }
        });
        expect((mockRequest as any).payload).toBeUndefined();
        done();
      }, 100);
    });

    test('it should validate token and add payload to request if token valid', (done: any) => {
      const middleware = auth.required;
      mockRequest.headers = {
        authorization: `Bearer ${genToken('id', 'secret')}`
      };

      middleware(mockRequest, mockResponse, mockNextFunction);

      setTimeout(() => {
        expect(mockNextFunction).toHaveBeenCalledWith();
        expect((mockRequest as any).payload.id).toBe('id');
        done();
      }, 100);
    });
  });
});
