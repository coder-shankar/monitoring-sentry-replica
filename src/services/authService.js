import Boom from 'boom';
import Admin from '../models/admins';
import AdminToken from '../models/admin_token';

import * as crypt from '../utils/crypt';
import * as jwt from '../utils/token';

import * as tokenService from '../services/tokenService';

/**
 * Get all .
 *
 * @return {Promise}
 */

export function login(credentials) {
  return new Admin({ email: credentials.email }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    let verifiedPassword = crypt.compare(credentials.password, user.get('password'));

    if (!verifiedPassword) {
      throw new Boom.notFound('Password does not match');
    }

    let tokens = jwt.generateAuthTokens(credentials);
    let { access, refresh } = tokens;

    // let temp = jwt.verifyAccessToken(access);

    // extract admin email like this
    // console.log(
    //   "The result is **************************8",
    //    temp.payload.email
    // );

    // generate access token and refresh token
    return AdminToken.forge({ admin_id: user.get('id') })
      .fetch()
      .then(response => {
        console.log('response', response);
        if (response) {
          tokenService.deleteTokenByUserId(response.get('admin_id'));

          AdminToken.forge({
            admin_id: user.get('id'),
            refresh_token: refresh
          }).save();

          return {
            data: user,
            accessToken: access,
            refreshToken: refresh
          };
        }
        if (!response) {
          AdminToken.forge({
            admin_id: user.get('id'),
            refresh_token: refresh
          }).save();

          return {
            data: user,
            accessToken: access,
            refreshToken: refresh
          };
        }
      });
  });
}
