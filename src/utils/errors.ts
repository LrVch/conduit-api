export const arrayToObjectErrors = <T>(errors: T[]) => ({
  errors: errors.reduce((obj: { [key: string]: any }, err: T): {
    [key: string]: T;
  } => {
    return (obj = { ...obj, ...err });
  }, {})
});
