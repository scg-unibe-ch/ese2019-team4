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
    return await this.findOne({ where: { username: String(name)} }).then(user => {return (user != null)});
  }

  static valid_username(username: String): boolean {
      return (username != null && username != "")
  }

  static valid_password(password: String): boolean {
      return (password != null && password != "")
  }

  static async valid_register(username: String, password: String): Promise<Boolean> {
      return (this.valid_password(password) && this.valid_username(username) && !await this.user_exists(username));
  }

  static async login(username: String, password: String): Promise<Boolean> {
    var user = await this.findOne({ where: { username: String(username)} });
    if (user !== null && user.password==password)
      return true
    return false
  }

  fromSimplification(simplification: any): void {
    this.username = simplification['username'];
    this.password = simplification['password'];
  }

}
