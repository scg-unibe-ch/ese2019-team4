import {Router, Request, Response} from 'express';
import {Post} from '../models/post.model';

const router: Router = Router();

//returns the table
router.get('/',  async (req: Request, res: Response) => {
  const instances = await Post.findAll();
  res.statusCode = 200;
  res.send({instances});
});

router.get('/:id', async (req, res) =>{
  await Post.findOne({
    where: {id: req.params.id}
  }).then(post => {if(post!=null) {
    res.send(post.toSimplification());
  }
  })});

// accepts user information in form of {"title": "title", "body": "body, "author": "author"}
// return true if the value has been added to the data base
router.post('/', async (req: Request, res: Response) => {
    const instance = new Post();
    instance.fromSimplification(req.body);
    await instance.save().catch(error => {
      res.send(false);
    });
    res.statusCode = 201;
    res.send(true);
});
router.delete('/:id', async (req, res) =>{
  await Post.destroy({
    where: {id: req.params.id}
  }).then(() => {res.json(`Post with id ${req.params.id} deleted`)})
    .catch(error => {
    res.json('Could not delete');
  })

});
router.delete('/', async (req, res) =>{
  await Post.destroy({
    where: {Author: req.body.author}
  }).then(() => {res.json(`All of ${req.body.author}'s posts deleted`)})
    .catch(error => {
      res.json('Could not delete');
    })

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