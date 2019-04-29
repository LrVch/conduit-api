import { NextFunction, Request, Response } from 'express';
import UserService from '../../../../services/UserService';
import { getUser } from './getUser';

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

describe('authenticateUser', () => {
  test('It should throw an 500 error on model error', async () => {
    mockRequest.payload.id = 'id';

    const spy = jest.spyOn(UserService, 'findById').mockImplementation(() => {
      const err: any = new Error();
      err.status = 500;
      err.message = 'Ops, something went wrong, cannot get user by id.';
      throw err;
    });

    const error = await getUser(mockRequest, mockResponse, mockNextFunction);

    expect(spy).toHaveBeenCalledWith(mockRequest.payload.id);
    expect(mockNextFunction).toHaveBeenCalled();
    expect((error as any).status).toBe(500);
  });

  test('It should send status 401 if no user found in DB', async () => {
    mockRequest.payload.id = 'id';

    const spy = jest
      .spyOn(UserService, 'findById')
      .mockImplementation(() => null);

    await getUser(mockRequest, mockResponse, mockNextFunction);

    expect(spy).toHaveBeenCalledWith(mockRequest.payload.id);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
  });

  test('It should return user if user found in DB', async () => {
    mockRequest.payload.id = 'id';

    const user: any = {
      toAuthJSON() {
        return {
          bio: '',
          email: '',
          image: '',
          token: 'token',
          username: ''
        };
      }
    };

    const spy = jest
      .spyOn(UserService, 'findById')
      .mockImplementation(() => user);

    await getUser(mockRequest, mockResponse, mockNextFunction);

    expect(spy).toHaveBeenCalledWith(mockRequest.payload.id);
    expect(mockResponse.json).toHaveBeenCalledWith({
      user: user.toAuthJSON()
    });
  });
});
