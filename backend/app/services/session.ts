import * as fs from "fs";
import * as jwt from 'jsonwebtoken';
const RSA_PUBLIC_KEY = fs.readFileSync('./app/services/public.key');
const RSA_PRIVATE_KEY = fs.readFileSync('./app/services/private.key');


//creates signed tokens
export const sign = function(username: string, type: string){
  var expiration_time = 120; //expiration time in seconds
  const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
          algorithm: 'RS256',
          expiresIn: expiration_time,
          subject: username});
  return {
    idToken: jwtBearerToken,
    expiresIn: expiration_time,
    type: type,
    username: username};
}

//verifies token of a username
export const verify = function(object: {"username": string, "token": string}) {
  try {
    var username = object["username"];
    var token = object["token"];
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
