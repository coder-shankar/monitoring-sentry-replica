import AdminToken from "../models/admin_token";

export function deleteTokenByUserId(id) {
  return new AdminToken({
    admin_id: id
  })
    .fetch()
    .then(token => token.destroy());
}
