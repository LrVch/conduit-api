import { NextFunction, Request, Response } from 'express';
import { authenticateUser } from './authenticateUser';
jest.mock('../../../../models/app/User');
import { init } from '../../../../libs/passport';

let mockRequest: any;
let mockResponse: any;
let mockNextFunction: any;

beforeEach(() => {
  init();

  mockRequest = {
    body: {
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  };

  mockResponse = {
    json: jest.fn(data => data),
    status: function(status: number) {
      this.statusCode = status;
      return this;
    }
  };

  mockNextFunction = jest.fn(error => error);
});

describe('authenticateUser', () => {
  test('It should throw an error if email is blank', async () => {
    mockRequest.body.user.password = 'validPassword';

    await authenticateUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockResponse.statusCode).toBe(422);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: { email: "can't be blank" }
    });
  });

  test('It should throw an error if password is blank', async () => {
    mockRequest.body.user.email = 'email@email.uganda';

    await authenticateUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockResponse.statusCode).toBe(422);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: { password: "can't be blank" }
    });
  });

  test('It should throw an error if password and are blank', async () => {
    await authenticateUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockResponse.statusCode).toBe(422);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: {
        password: "can't be blank",
        email: "can't be blank"
      }
    });
  });

  test('It should throw an 500 error on model error', async () => {
    mockRequest.body.user.email = 'badUser';
    mockRequest.body.user.password = 'validPassword';

    await authenticateUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockNextFunction).toHaveBeenCalled();
  });

  test('It should return status 422 if email is invalid', async () => {
    mockRequest.body.user.email = 'unknowUser';
    mockRequest.body.user.password = 'validPassword';

    await authenticateUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockResponse.statusCode).toBe(422);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: { 'email or password': 'is invalid' }
    });
  });

  test('It should return status 422 if email is invalid', async () => {
    mockRequest.body.user.email = 'knowUser';
    mockRequest.body.user.password = 'invalidPassword';

    await authenticateUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockResponse.statusCode).toBe(422);
    expect(mockResponse.json).toHaveBeenCalledWith({
      errors: { 'email or password': 'is invalid' }
    });
  });

  test('It should authenticate user successfully', async () => {
    mockRequest.body.user.email = 'knowUser';
    mockRequest.body.user.password = 'validPassword';

    await authenticateUser(
      mockRequest as Request,
      mockResponse as any,
      mockNextFunction as NextFunction
    );

    expect(mockResponse.json).toHaveBeenCalled();
  });
});
