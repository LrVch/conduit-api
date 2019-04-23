export interface IError {
  status?: number;
  stack?: string;
  message?: string;
  name?: string;
}

export interface IValidationError extends IError {
  errors: [{ [key: string]: any }];
}
