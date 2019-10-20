import {Router, Request, Response} from 'express';
import {Account} from '../models/account.model';

const router: Router = Router();

//returns the table
router.get('/', async (req: Request, res: Response) => {
  const instances = await Account.findAll();
  res.statusCode = 200;
  res.send({"columns": Object.keys(Account.rawAttributes), "values": instances.map(e => e.toSimplification())});
});

// accepts user information in form of {"username": $username, "password": $password}
// return true if the value has been added to the data base
router.post('/', async (req: Request, res: Response) => {
  const username = req.body["username"];
  const password = req.body["password"];
  if (await Account.valid_register(username, password)) {
      const instance = new Account();
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
  if (await Account.login(username, password)) {
      res.send(true);
  } else {
      res.send(false);
  }
});


export const AccountController: Router = router;
