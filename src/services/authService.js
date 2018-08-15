import Boom from "boom";
import Admin from "../models/admins";
import AdminToken from "../models/admin_token";

import * as crypt from "../utils/crypt";
import * as jwt from "../utils/token";
import * as tokenService from "../services/tokenService";

/**
 * Get all .
 *
 * @return {Promise}
 */

export function login(credentials) {
  return new Admin({ email: credentials.email }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound("User not found");
    }

    let verifiedPassword = crypt.compare(credentials.password, user.get("password"));
    if (!verifiedPassword) {
      throw new Boom.notFound("Password does not match");
    }

    let tokens = jwt.generateAuthTokens(credentials);
    let { access, refresh } = tokens;

    // generate access token and refresh token
    return AdminToken.forge({ admin_id: user.get("id") })
      .fetch()
      .then(response => {
        if (response) {
          tokenService.deleteTokenByUserId(response.get("admin_id"));

          AdminToken.forge({
            admin_id: user.get("id"),
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
            admin_id: user.get("id"),
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

export function refresh(refreshToken) {
  try {
    return AdminToken.forge({ refresh_token: refreshToken })
      .fetch()
      .then(response => {
        const adminId = response.get("admin_id");
        if (!response) {
          throw new Boom.notFound("User not logged in ");
        }
        // delete that token
        tokenService.deleteTokenByUserId(adminId);

        // generate new token
        let tokens = jwt.generateAuthTokens(adminId);
        let { refresh } = tokens;

        //  save token into database
        AdminToken.forge({
          admin_id: adminId,
          refresh_token: refresh
        }).save();

        // response with access and refresh token

        return tokens;
      });
  } catch (err) {
    throw Boom.badRequest("invalid token  ");
  }
}
