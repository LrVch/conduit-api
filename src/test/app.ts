import * as db from './db';

export const handleSigup = (email: string, password: string) => {
  db.saveUser({ email, password });
};
