/**
 * The Provider Model extends the account Model, adding a new column to save an email address for the providers
 */

import {Table, Column} from 'sequelize-typescript';
import {Account} from './account.model';

@Table
export class Provider extends Account {

  // provider table adds a new email column to the exisiting password and username columns
  @Column
  email!: string;

  /**
   * This method returns the email of a provider
   * @param username, the provider we want the email from
   */
  static async getEmail(username: string): Promise<any> {
    // returns the email of a provider
    return (await this.findAll({ where: { username: String(username)}, attributes: ["email"], raw: true})).map((event) => event.email)[0];
  }

  toSimplification(): any {
    return {
      'id': this.id,
      'username': this.username,
      'password': this.password,
      'email': this.email,
    };
  }

  fromSimplification(simplification: any): void {
    this.username = simplification['username'];
    this.password = simplification['password'];
    this.email = simplification['email'];
  }
}
