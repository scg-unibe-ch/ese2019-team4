import {Router, Request, Response} from 'express';
import {Post} from '../models/post.model';

const router: Router = Router();

//returns the table
router.get('/posts/',  (req: Request, res: Response) => {
 /* const instances = await Post.findAll();
  res.statusCode = 200;*/
  console.log('booo');
  //res.send({"columns": Object.keys(Post.rawAttributes), "values": instances.map(e => e.toSimplification())});
});

// accepts user information in form of {"username": $username, "password": $password}
// return true if the value has been added to the data base
router.post('/posts', async (req: Request, res: Response) => {
  /*const username = req.body["username"];
  const password = req.body["password"];
  if (await Account.valid_register(username, password)) {*/
    const instance = new Post();
    instance.fromSimplification(req.body);
    await instance.save();
    res.statusCode = 201;
    res.send(true);
 /* } else {
    res.statusCode = 201;
    res.send(false);
  }*/
});
/*
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
*/

export const PostController: Router = router;
