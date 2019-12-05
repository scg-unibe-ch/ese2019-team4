// model for post data base
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

  async toSimplification(): Promise<Object> {
    return {
      'id': this.id,
      'title': this.title,
      'author': this.author,
      'body': this.body,
      'image': this.image,
      'subscriptions': await Subscription.get_customers(this.id),
      'email': await Provider.getEmail(this.author)
    };
  }

  fromSimplification(simplification: any): void {
    this.title = simplification['title'];
    this.body = simplification['body'];
    this.image = simplification['image']
    this.author = simplification['username']; // should be read from jwt token
  }

}
