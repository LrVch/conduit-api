export const arrayToObjectErrors = <T>(errors: T[]) => ({
  errors: errors.reduce((obj: { [key: string]: any }, err: T): {
    [key: string]: T;
  } => {
    return (obj = { ...obj, ...err });
  }, {})
});

export const formatValidationErrors = (errors: any) => {
  return {
    errors: Object.keys(errors).reduce(
      (errs: { [key: string]: any }, key: any) => {
        errs[key] = errors[key].message;
        return errs;
      },
      {}
    )
  };
};
