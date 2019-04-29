import { NextFunction, Request, Response } from 'express';
import UserService from '../../../../services/UserService';
import { createUser } from './createUser';

let mockRequest: any;
let mockResponse: any;
let mockNextFunction: any;

beforeEach(() => {
  mockRequest = {
    body: {
      user: {}
    },
    payload: {}
  };

  mockResponse = {
    json: jest.fn(data => data),
    status: function(status: number) {
      this.statusCode = status;
      return this;
    },
    sendStatus: jest.fn(data => data)
  };

  mockNextFunction = jest.fn(error => error);
});

describe('createUser', () => {
  test('It should create user', async () => {
    mockRequest.body.user.username = 'username';
    mockRequest.body.user.email = 'email';
    mockRequest.body.user.password = 'password';

    const user: any = {
      toAuthJSON() {
        return 'user';
      }
    };

    const spy = jest
      .spyOn(UserService, 'createAndSave')
      .mockImplementation(() => user);

    await createUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(spy).toHaveBeenCalledWith({
      username: mockRequest.body.user.username,
      email: mockRequest.body.user.email,
      password: mockRequest.body.user.password
    });
    expect(mockResponse.json).toHaveBeenCalledWith({ user: 'user' });
  });

  test('It should get an error as a result of creating user', async () => {
    mockRequest.body.user.username = 'username';
    mockRequest.body.user.email = 'email';
    mockRequest.body.user.password = 'password';

    const spy = jest
      .spyOn(UserService, 'createAndSave')
      .mockImplementation(() => {
        const err: any = new Error();
        err.status = 500;
        err.message = 'Ops, something went wrong, cannot save user to DB.';
        throw err;
      });

    const error = await createUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(spy).toHaveBeenCalledWith({
      username: mockRequest.body.user.username,
      email: mockRequest.body.user.email,
      password: mockRequest.body.user.password
    });
    expect(mockNextFunction).toHaveBeenCalled();
    expect((error as any).status).toBe(500);
    expect((error as any).message).toBe(
      'Ops, something went wrong, cannot save user to DB.'
    );
  });
});
