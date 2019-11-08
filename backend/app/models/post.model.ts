// model for post data base
import {Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';
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

  toSimplification(): any {
    return {
      'id': this.id,
      'title': this.title,
      'author': this.author,
      'body': this.body
    };
  }
  
  fromSimplification(simplification: any): void {
    console.log("body: "+simplification)
    this.title = simplification['title'];
    this.body = simplification['body'];
    this.author = simplification['author']; // should be read from jwt token
  }

}
