import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../models';

export const init = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'user[email]',
        passwordField: 'user[password]'
      },
      (email, password, done) => {
        User.findOne({ email })
          .then(user => {
            if (!user || !user.validPassword(password)) {
              return done(null, false);
            }
            return done(null, user);
          })
          .catch(done);
      }
    )
  );
};
