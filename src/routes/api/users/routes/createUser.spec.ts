import { NextFunction, Request, Response } from 'express';
import { createUser } from './createUser';
jest.mock('../../../../services/UserService');

const mockRequest = {
  body: {
    user: {
      username: '',
      email: '',
      password: ''
    }
  }
};
const mockResponse: any = {
  json: jest.fn(user => user)
};

const mockNextFunction = jest.fn(error => error);

describe('createUser', () => {
  test('It should create user', async () => {
    mockRequest.body.user.username = 'username';

    await createUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockResponse.json).toHaveBeenCalledWith({ user: 'user' });
  });

  test('It should get an error as a result of creating user', async () => {
    mockRequest.body.user.username = 'failuser';

    await createUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockNextFunction).toHaveBeenCalled();
  });
});
