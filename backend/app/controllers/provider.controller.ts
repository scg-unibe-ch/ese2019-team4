/**
 * The provider.controller is responsible for handling the registration of providers
 */

import {Router, Request, Response} from 'express';
import {Provider} from '../models/provider.model';
import {Customer} from '../models/customer.model';

const router: Router = Router();

/**
 * This method returns a table of all providers
 */
router.get('/', async (req: Request, res: Response) => {
  const instances = await Provider.findAll();
  res.statusCode = 200;
  res.send({'columns': Object.keys(Provider.rawAttributes), 'values': instances.map(e => e.toSimplification())});
});

/**
 * This method handles the registration. It accepts user information in form of
 * {"username": $username, "password": $password}
 * @return true, if the value has been added to the database
 */
router.post('/', async (req: Request, res: Response) => {
  const username = req.body['username'];
  const password = req.body['password'];
  if (await Provider.valid_register(username, password) && await Customer.valid_register(username, password)) {
      const instance = new Provider();
      instance.fromSimplification(req.body);
      await instance.save();
      res.statusCode = 201;
      res.send(true);
  } else {
      res.statusCode = 201;
      res.send(false);
  }
});


export const ProviderController: Router = router;
