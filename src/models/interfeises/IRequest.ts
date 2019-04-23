import { Request } from 'express';

export interface IPayloadRequest extends Request {
  payload: { [key: string]: any };
}
