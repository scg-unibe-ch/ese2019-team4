import {Router, Request, Response} from 'express';
import {Customer} from '../models/customer.model';
import {Provider} from '../models/provider.model';
const bodyParser = require('body-parser');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";

const RSA_PRIVATE_KEY = fs.readFileSync('./app/services/private.key');

const router: Router = Router();

//returns the table
router.get('/', async (req: Request, res: Response) => {
  const instances = await Customer.findAll();
  res.statusCode = 200;
  res.send({"columns": Object.keys(Customer.rawAttributes), "values": instances.map(e => e.toSimplification())});
});

// accepts user information in form of {"username": $username, "password": $password}
// return true if the value has been added to the data base
router.post('/', async (req: Request, res: Response) => {
  const username = req.body["username"];
  const password = req.body["password"];
  console.log("here")
  if (await Customer.valid_register(username, password) && await Provider.valid_register(username, password)) {
      const instance = new Customer();
      instance.fromSimplification(req.body);
      await instance.save();
      res.statusCode = 201;
      res.send(true);
  } else {
      res.statusCode = 201;
      res.send(false);
  }
});

router.post('/login/', async (req: Request, res: Response) => {
  const username = req.body["username"];
  const password = req.body["password"];
  console.log(username+password)
  const expiration_time = 120; //time in minutes
  if (await Customer.login(username, password) || await Provider.login(username, password)) {
      //set the type of the logged in profile
      var type = "customer";
      if (await Provider.login(username, password)) type="provider";
      //create a rsa jwt
      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
              algorithm: 'RS256',
              expiresIn: expiration_time, //expiration in minutes
              subject: username});
      res.send({
        idToken: jwtBearerToken,
        expiresIn: expiration_time,
        type: type,
        username: username});
  }
  else {
      // the login failed, either password is wrong or user does not exist
      res.send(false);
  }
});


export const CustomerController: Router = router;
