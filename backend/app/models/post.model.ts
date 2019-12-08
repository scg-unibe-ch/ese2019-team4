/**
 * The Post Model contains the posts on our app
 * Its values are:
 * - author (reference to a provider)
 * - title
 * - body (the content of the post)
 * - image (the id of an image)
 * and a unique id.
 */
import {Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
import { Subscription } from './subscription.model';
import { Provider } from './provider.model';

@Table
export class Post extends Model<Post> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  author!: string;

  @Column
  title!: string;

  @Column
  body!: string;

  @Column
  image!: number;

  /**
  * converts a tuple into an object
  */
  async toSimplification(): Promise<Object> {
    return {
      'id': this.id,
      'title': this.title,
      'author': this.author,
      'body': this.body,
      'image': this.image,
      'subscriptions': await Subscription.get_customers(this.id), //access to other models
      'email': await Provider.getEmail(this.author)
    };
  }

  /**
  * converts an object into a tuple of this model
  */
  fromSimplification(simplification: any): void {
    this.title = simplification['title'];
    this.body = simplification['body'];
    this.image = simplification['image'];
    this.author = simplification['username'];
  }

}
