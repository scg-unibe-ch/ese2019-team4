// model for customer and provider data base
import {Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
export class Account extends Model<Account> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  username!: string;

  @Column
  password!: string;

  toSimplification(): any {
    return {
      'id': this.id,
      'username': this.username,
      'password': this.password
    };
  }

  static user_exists(name: String): boolean {
    // TODO: how to get out of here?
    Account.findOne({ where: { username: String(name)} }).then(user => {return (user != null)});
    return false; // mock value
  }

  static valid_username(username: String): boolean {
      return (username != null && username != "" && !Account.user_exists(username))
  }

  static valid_password(password: String): boolean {
      return (password != null && password != "")
  }

  static valid_register(username: String, password: String): boolean {
      return (Account.valid_password(password) && Account.valid_username(username));
  }

  fromSimplification(simplification: any): void {
    this.username = simplification['username'];
    this.password = simplification['password'];
  }

}
