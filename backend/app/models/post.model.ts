// model for post data base
import {Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
import { Subscription } from './subscription.model';

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
    console.log(await Subscription.get_customers(this.id));
    return {
      'id': this.id,
      'title': this.title,
      'author': this.author,
      'body': this.body,
      'image': this.image,
      'subscriptions': await Subscription.get_customers(this.id)
    };
  }

  fromSimplification(simplification: any): void {
    this.title = simplification['title'];
    this.body = simplification['body'];
    this.image = simplification['image']
    this.author = simplification['username']; // should be read from jwt token
  }

}
