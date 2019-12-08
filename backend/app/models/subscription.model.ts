/**
 * The subscription model is a table that keeps track of who has subscribed what services
 */
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

  /**
   * This method returns an array of all customers who have subscripted to a Service
   * @param service, id of the service
   */
  static async get_customers(service: number): Promise<Object> {
    return (await this.findAll({ where: { post: Number(service)}, attributes: ['customer'], raw: true})).map((event) => event.customer);
  }

  /**
   * This method returns an array of all posts of a customer
   * @param customer
   */
  static async get_posts(customer: string): Promise<Object> {
    return (await this.findAll({ where: { customer: String(customer)}, attributes: ['post'], raw: true})).map((event) => event.post);
  }

  /**
  * converts a tuple into an object
  */
  toSimplification(): any {
    return {
      'id': this.id,
      'customer': this.customer,
      'post': this.post
    };
  }

  /**
  * converts an object into a tuple of this model
  */
  fromSimplification(simplification: any): void {
    this.customer = simplification['customer'];
    this.post = simplification['post'];
  }
}
