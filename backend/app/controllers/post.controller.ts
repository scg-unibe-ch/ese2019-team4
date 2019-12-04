import {Router, Request, Response} from 'express';
import {Post} from '../models/post.model';
import {Subscription} from '../models/subscription.model';
import {verify} from '../services/session'

const router: Router = Router();

// returns the table
router.get('/',  async (req: Request, res: Response) => {
  const instances = await Post.findAll({ order: [['id', 'DESC']]});
  res.statusCode = 200;
  res.send({instances});
});

// returns the table for a user
router.get('/profile/:author',  async (req: Request, res: Response) => {
  const instances = await Post.findAll({
    where: {author: req.params.author},
    order: [['id', 'DESC']]
  });
  res.statusCode = 200;
  res.send({instances});
});

// returns the table for a user
router.get('/name/:title',  async (req: Request, res: Response) => {
  const instances = await Post.findAll({
    where: {title: req.params.title},
    order: [['id', 'DESC']]
  });
  res.statusCode = 200;
  res.send({instances});
});

// accepts user information in form of {"title": title, "body": body, "username": username, "token": token}
// return true if the value has been added to the data base
router.post('/', async (req: Request, res: Response) => {
    if (verify(req.body)){

    const instance = new Post();
    instance.fromSimplification(req.body);
    await instance.save().catch(error => {
      res.send(false);
    });
    res.statusCode = 201;
    res.send(true);} else {res.send(false);}
});

router.post('/delete', async (req: Request, res: Response) => {
  //adds a subscription
  if (verify(req.body)){
    var id = req.body["id"];
    await Post.destroy({ where: { id: Number(id)}})
    await Subscription.destroy({ where: { post: Number(id)}})
    res.statusCode = 201;
    res.send(true);} else {res.send(false);}
});

router.post('/subscribe', async (req: Request, res: Response) => {
  //adds a subscription
  if (verify(req.body)){
    var customer = req.body["customer"];
    var post = req.body["post"];
    //validate?
    if ((await Subscription.findOne({ where: { post: Number(post), customer: String(customer)}}))!==null){
      //subscription already exists
      res.send(false);
      console.log("false");
      return;
    }
    const instance = new Subscription();
    instance.fromSimplification(req.body);
    await instance.save();
    res.statusCode = 201;
    res.send(true);} else {res.send(false);}
});

router.post('/unsubscribe', async (req: Request, res: Response) => {
  //removes a subscription
  if (verify(req.body)){
    var customer = req.body["customer"];
    var post = req.body["post"];
    //validate?
    await Subscription.destroy({ where: { post: Number(post), customer: String(customer)}})
    console.log("deleted")
    res.statusCode = 201;
    res.send(true);} else {res.send(false);}
});

router.get('/:id', async (req, res) =>{
  console.log(req.params.id)
  if (req.params.id == "subscriptions") {
    console.log("here")
    const instances = await Subscription.findAll();
    res.statusCode = 200;
    res.send({"columns": Object.keys(Subscription.rawAttributes), "values": instances.map(e => e.toSimplification())});
    return;
  }
  await Post.findOne({
    where: {id: req.params.id}
  }).then(async post => {if (post != null) {
    res.send(await post.toSimplification());
  }
});
});



router.delete('/:id', async (req, res) => {
  const found = await Post.findOne({
    where: {id: req.params.id}
  });
  if (found) {
    await Post.destroy({
      where: {id: req.params.id}
    }).then(() => {
      res.json(`Post with id: ${req.params.id} deleted`);
    })
      .catch(error => {
        res.json('Could not delete');
      });
  } else {
    res.json(`Post with id: ${req.params.id} not found`);
  }});

router.delete('/', async (req, res) => {
  const found = await Post.findOne({
    where: {author: req.body.author}
  });
  if (found) {
    await Post.destroy({
      where: {Author: req.body.author}
    }).then(() => {res.json(`All of ${req.body.author}'s posts deleted`); })
      .catch(error => {
        res.json('Could not delete');
      });
  } else {
    res.json('No such user found');
  }});

export const PostController: Router = router;
