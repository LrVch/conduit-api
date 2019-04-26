import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import UserService from '../services/UserService';

export const init = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'user[email]',
        passwordField: 'user[password]'
      },
      async (email, password, done) => {
        try {
          const user = await UserService.findByEmail(email);

          if (!user || !user.validPassword(password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (e) {
          done(e);
        }
      }
    )
  );
};
