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
  if (Account.valid_register(username, password)) {
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
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await Account.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(instance.toSimplification());
});

export const AccountController: Router = router;
