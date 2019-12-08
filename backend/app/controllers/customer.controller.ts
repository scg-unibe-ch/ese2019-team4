/**
 * The customer.controller is responsible for handling the registration and login of customers
 */

import {Router, Request, Response} from 'express';
import {Customer} from '../models/customer.model';
import {Provider} from '../models/provider.model';
import {sign} from '../services/session';
const bodyParser = require('body-parser');

const router: Router = Router();

/**
 * This method returns a table of all customers
 */
router.get('/', async (req: Request, res: Response) => {
  const instances = await Customer.findAll();
  res.statusCode = 200;
  res.send({'columns': Object.keys(Customer.rawAttributes), 'values': instances.map(e => e.toSimplification())});
});

/**
 * This method handles the registration. It accepts user information in form of
 * {"username": $username, "password": $password}
 * @return true, if the value has been added to the database
 */
router.post('/', async (req: Request, res: Response) => {
  const username = req.body['username'];
  const password = req.body['password'];
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

/**
 * This method handles the login. It accepts user information in form of
 * {"username": $username, "password": $password}
 *
 * Note that also providers login through this function.
 * @return true, if the login is successful
 */
router.post('/login/', async (req: Request, res: Response) => {
  const username = req.body['username'];
  const password = req.body['password'];
  const expiration_time = 120; // time in minutes
  if (await Customer.login(username, password) || await Provider.login(username, password)) {
      // set the type of the logged in profile
      var type = 'customer';
      // checks if type is provider
      if (await Provider.login(username, password)){
        type = 'provider';
      }
      res.send(sign(username, type));
  } else {
      // the login failed, either password is wrong or user does not exist
      res.send(false);
  }
});


export const CustomerController: Router = router;
