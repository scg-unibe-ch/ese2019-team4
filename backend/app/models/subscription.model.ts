/**
 * The subscription model is a database that keeps track of who has subscribed to which services
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
  toSimplification(): any {
    return {
      'id': this.id,
      'customer': this.customer,
      'post': this.post
    };
  }

  fromSimplification(simplification: any): void {
    this.customer = simplification['customer'];
    this.post = simplification['post'];
  }
}
