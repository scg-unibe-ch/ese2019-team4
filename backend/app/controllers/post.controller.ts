/**
 * The post.controller is responsible for handling the addition of new posts, as well as subscriptions
 */

import {Router, Request, Response} from 'express';
import {Post} from '../models/post.model';
import {Subscription} from '../models/subscription.model';
import {verify} from '../services/session';

const router: Router = Router();

/**
 * This method returns a table of all posts
 */
router.get('/',  async (req: Request, res: Response) => {
  const instances = await Post.findAll({ order: [['id', 'DESC']]});
  res.statusCode = 200;
  res.send({instances});
});

/**
 * This method returns a table of all posts of a specific user
 */
router.get('/profile/:author',  async (req: Request, res: Response) => {
  const instances = await Post.findAll({
    where: {author: req.params.author},
    order: [['id', 'DESC']]
  });
  res.statusCode = 200;
  res.send({instances});
});

/**
* Retuns all subscribed posts
*/
router.get('/subscriptions/:customer',  async (req: Request, res: Response) => {
  var customer = req.params.customer
  var posts = await Subscription.get_posts(customer)
  const instances = await Post.findAll({
    where: {id: posts},
    order: [['id', 'DESC']]
  });
  res.statusCode = 200;
  res.send({instances});
});


/**
 * This method handles the addition of new posts
 * It accepts information in form of
 * {"title": title, "body": body, "username": username, "token": token}
 * @return true, if the post has been added to the database
 */
router.post('/', async (req: Request, res: Response) => {
    if (verify(req.body)) {
      const instance = new Post();
      instance.fromSimplification(req.body);
      await instance.save().catch(error => {
        res.send(false);
      });
      res.statusCode = 201;
      res.send(true);
    } else {
      res.send(false);
    }
});

/**
 * This method deletes posts
 * It requires the authentication of the provider who had posted it and the post id.
 * @return success
 */
router.post('/delete', async (req: Request, res: Response) => {
  if (verify(req.body)) {
    var id = req.body['id'];
    await Post.destroy({ where: { id: Number(id)}})
    await Subscription.destroy({ where: { post: Number(id)}})
    res.statusCode = 201;
    res.send(true);
  } else {
    res.send(false);
  }
});

/**
 * Subscribes customer to a post
 * It requires the authentication of the customer who subscribes it and the post id.
 * @return success
 */
router.post('/subscribe', async (req: Request, res: Response) => {
  // adds a subscription
  if (verify(req.body)) {
    var customer = req.body['customer'];
    var post = req.body['post'];
    if ((await Subscription.findOne({ where: { post: Number(post), customer: String(customer)}}))!==null){
      // subscription already exists
      res.send(false);
      return;
    }
    const instance = new Subscription();
    instance.fromSimplification(req.body);
    await instance.save();
    res.statusCode = 201;
    res.send(true);
  } else {
    res.send(false);
  }
});


/**
 * Unsubscribes customer from a post
 * It requires the authentication of the customer who had subscribed it and the post id.
 * @return success
 */
router.post('/unsubscribe', async (req: Request, res: Response) => {
  // removes a subscription
  if (verify(req.body)) {
    var customer = req.body['customer'];
    var post = req.body['post'];
    // validate?
    await Subscription.destroy({ where: { post: Number(post), customer: String(customer)}})
    console.log('deleted')
    res.statusCode = 201;
    res.send(true);
  } else {
    res.send(false);
  }
});

// returns a post by its id
router.get('/:id', async (req, res) =>{
  console.log(req.params.id)
  if (req.params.id == 'subscriptions') {
    console.log('here')
    const instances = await Subscription.findAll();
    res.statusCode = 200;
    res.send({'columns': Object.keys(Subscription.rawAttributes), 'values': instances.map(e => e.toSimplification())});
    return;
  }
  await Post.findOne({
    where: {id: req.params.id}
  }).then(async post => {if (post != null) {
    res.send(await post.toSimplification());
  }
});
});

export const PostController: Router = router;
