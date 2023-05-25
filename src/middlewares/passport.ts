import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/users.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, payload, callback) => {
      const data = payload._json;

      const user: IUser = await User.findOneAndUpdate(
        { email: data.email },
        {
          firstName: data.given_name,
          lastName: data.family_name,
          email: data.email,
          picture: data.picture,
          isGoogleAuthLogin: true,
        },
        {
          new: true,
          upsert: true,
        }
      );

      const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: '1h',
        }
      );

      callback(null, token);
    }
  )
);

passport.serializeUser<any, any>((payload: any, callback: any) => {
  callback(null, payload);
});

passport.deserializeUser<any, any>((payload: any, callback: any) => {
  callback(null, payload);
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JWTStrategy(jwtOptions, async (payload, callback) => {
    if (payload.exp > Date.now() / 1000) {
      const user = (await User.findOne({
        email: payload.email,
        isActive: true,
      })) as IUser;
      callback(null, user);
    } else {
      callback(null, false);
    }
  })
);
