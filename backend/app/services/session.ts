const expressJwt = require('express-jwt');
import * as fs from "fs";
import * as jwt from 'jsonwebtoken';

const RSA_PUBLIC_KEY = fs.readFileSync('./app/services/private.key');
export const isVerified = function(username: string, token: string) {
  try {
    jwt.verify(token, RSA_PUBLIC_KEY, {
          algorithms: ['RS256'],
          subject: username});
    return true;
  }
  catch(error) {
    console.log(error)
    return false
  }
}
