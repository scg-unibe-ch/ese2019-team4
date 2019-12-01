// model for customer and provider data base
import {Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
export class Subscription extends Model<Subscription> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  customer!: string;

  @Column
  post!: number;

  toSimplification(): any {
    return {
      'id': this.id,
      'customer': this.customer,
      'post': this.post
    };
  }

  fromSimplification(simplification: any): void {
    this.customer = simplification["customer"];
    this.post = simplification["post"];
  }

  static async get_customers(service: number): Promise<Object> {
    // returns all customers that have subscribed to a service
    return await this.findAll({ where: { post: Number(service)}})
  }
  /*
  static async user_exists(name: String): Promise<Boolean> {
    // checks if user already exists in database
    return await this.findOne({ where: { username: String(name)} }).then(user => {return (user != null)});
  }*/


}
