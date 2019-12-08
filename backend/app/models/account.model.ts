/**
 * The account model is a basic model for a customer and provider database. It contains methods to validate login and
 * registration
 */
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

  /**
   * checks if a user actually exists
   * @param name
   */
  static async user_exists(name: String): Promise<Boolean> {
    // checks if user already exists in database
    return await this.findOne({ where: { username: String(name)} }).then(user => (user != null));
  }

  /**
   * checks if the entered username is valid (not null and not empty)
   * @param username
   */
  static valid_username(username: String): boolean {
      return (username != null && username != '');
  }

  /**
   * checks if the entered password is valid
   * @param password
   */
  static valid_password(password: String): boolean {
      return (password != null && password != '');
  }

  /**
   * checks if a registration is valid
   * password and username have to be valid, the username can't exist yet
   * @param username
   * @param password
   * @return true, if the registration is valid
   */
  static async valid_register(username: String, password: String): Promise<Boolean> {
      return (this.valid_password(password) && this.valid_username(username) && !await this.user_exists(username));
  }

  /**
   * checks if a login is valid
   * Login is valid if a user with the entered name exists, and the entered password matches the saved password
   * @param username
   * @param password
   * @return true, if the login is valid
   */
  static async login(username: String, password: String): Promise<Boolean> {
    var user = await this.findOne({ where: { username: String(username)} });
    if (user !== null && user.password == password) {
      return true;
    }
    return false;
  }

  toSimplification(): any {
    return {
      'id': this.id,
      'username': this.username,
      'password': this.password
    };
  }
  fromSimplification(simplification: any): void {
    this.username = simplification['username'];
    this.password = simplification['password'];
  }

}
