import { NextFunction, Request, Response } from 'express';
import UserService from '../../../../services/UserService';
import { updateUser } from './updateUser';

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

describe('authenticateUser', () => {
  test('It should throw an 500 error while getting user from DB', async () => {
    const spy = jest.spyOn(UserService, 'findById').mockImplementation(() => {
      const err: any = new Error();
      err.status = 500;
      err.message = 'Ops, something went wrong, cannot get user by id.';
      throw err;
    });

    const error = await updateUser(mockRequest, mockResponse, mockNextFunction);

    expect(mockNextFunction).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect((error as any).status).toBe(500);
  });

  test('It should throw an 500 error while saving user to DB', async () => {
    mockRequest.payload.id = 'knowUserFailSave';
    mockRequest.body.user.username = 'username';

    const spy = jest.spyOn(UserService, 'findById').mockImplementation(() => {
      return {
        save() {
          const err: any = new Error();
          err.status = 500;
          err.message = 'Ops, something went wrong, cannot save user to DB.';
          throw err;
        }
      } as any;
    });

    const error = await updateUser(mockRequest, mockResponse, mockNextFunction);

    expect(mockNextFunction).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
    expect((error as any).status).toBe(500);
    expect((error as any).message).toBe(
      'Ops, something went wrong, cannot save user to DB.'
    );
  });

  test('It should throw an 404 error if user is not found in DB', async () => {
    const spy = jest.spyOn(UserService, 'findById').mockImplementation(() => {
      return null;
    });

    await updateUser(mockRequest, mockResponse, mockNextFunction);

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
  });

  test('It should update user and save to DB', async () => {
    mockRequest.payload.id = 'id';
    mockRequest.body.user.username = 'new username';
    mockRequest.body.user.email = 'new email';
    mockRequest.body.user.bio = 'new bio';

    const user: any = {};

    const spy = jest.spyOn(UserService, 'findById').mockImplementation(() => {
      user.save = () => {};
      user.toAuthJSON = () => {
        return {
          bio: user.bio || '',
          email: user.email || '',
          image: user.image || '',
          token: user.token || 'token',
          username: user.username || ''
        };
      };
      return user;
    });

    await updateUser(mockRequest, mockResponse, mockNextFunction);

    expect(spy).toHaveBeenCalledWith(mockRequest.payload.id);
    expect(mockResponse.json).toHaveBeenCalledWith({
      user: {
        bio: 'new bio',
        email: 'new email',
        image: '',
        token: 'token',
        username: 'new username'
      }
    });
  });
});
