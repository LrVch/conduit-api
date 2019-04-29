import { NextFunction, Request, Response } from 'express';
import { getUser } from './getUser';
jest.mock('../../../../models/app/User');

let mockRequest: any;
let mockResponse: any;
let mockNextFunction: any;

beforeEach(() => {
  mockRequest = {
    payload: {}
  };

  mockResponse = {
    json: jest.fn(data => data),
    sendStatus: jest.fn(status => status)
  };

  mockNextFunction = jest.fn(error => {
    return error;
  });
});

/*
  500
  no user
  user
*/

describe('authenticateUser', () => {
  test('It should throw an 500 error on model error', async () => {
    mockRequest.payload.id = 'badUser';

    const res = await getUser(mockRequest, mockResponse, mockNextFunction);

    expect(mockNextFunction).toHaveBeenCalled();
    expect((res as any).status).toBe(500);
  });

  test('It should send status 401 if no user found in DB', async () => {
    mockRequest.payload.id = 'unknowUser';

    await getUser(mockRequest, mockResponse, mockNextFunction);

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
  });

  test('It should return user 401 if user found in DB', async () => {
    mockRequest.payload.id = 'knowUser';

    await getUser(mockRequest, mockResponse, mockNextFunction);

    expect(mockResponse.json).toHaveBeenCalledWith({
      user: {
        bio: '',
        email: 'email',
        image: '',
        token: 'token',
        username: 'username'
      }
    });
  });
});
