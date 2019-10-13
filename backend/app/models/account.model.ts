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

  static async user_exists(name: String): Promise<Boolean> {
    // checks if user already exists in database
    return await Account.findOne({ where: { username: String(name)} }).then(user => {return (user != null)});
  }

  static valid_username(username: String): boolean {
      return (username != null && username != "")
  }

  static valid_password(password: String): boolean {
      return (password != null && password != "")
  }

  static async valid_register(username: String, password: String): Promise<Boolean> {
      return (Account.valid_password(password) && Account.valid_username(username) && !await Account.user_exists(username));
  }

  fromSimplification(simplification: any): void {
    console.log("body: "+simplification)
    this.username = simplification['username'];
    this.password = simplification['password'];
  }

}
