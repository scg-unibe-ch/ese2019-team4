const expressJwt = require('express-jwt');
import * as fs from "fs";
const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');
export const checkAuthentication = expressJwt({secret: RSA_PUBLIC_KEY});
