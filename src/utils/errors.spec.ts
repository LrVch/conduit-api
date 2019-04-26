import { arrayToObjectErrors, formatValidationErrors } from './errors';

describe('Errors utils', () => {
  test("should return errors' object", () => {
    const errors = [
      {
        username: "can't br blank"
      },
      {
        email: "can't br blank"
      }
    ];

    const expected = {
      errors: {
        username: "can't br blank",
        email: "can't br blank"
      }
    };

    const result = arrayToObjectErrors(errors);

    expect(result).toEqual(expected);
  });

  test('should format "Validation error object"', () => {
    const validationErrors = {
      username: { message: "can't br blank" },
      email: { message: "can't br blank" }
    };

    const expected = {
      errors: {
        username: "can't br blank",
        email: "can't br blank"
      }
    };

    const result = formatValidationErrors(validationErrors);

    expect(result).toEqual(expected);
  });
});
