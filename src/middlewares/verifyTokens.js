import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SALT } from '../utils/token';

export function checkAccessToken(req, res, next) {
  let token = req.headers['authorization'];
  console.log('32423333333333333333333333333', token);
  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SALT, function(err) {
      if (err) {
        res.status(401).json({ Error: 'UNAUTHORIZED' });
      } else {
        next();
      }
    });
  } else {
    res.status(404).json({ Error: 'ACCESS TOKEN NOT FOUND' });
  }
}
