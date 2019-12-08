import {Table} from 'sequelize-typescript';
import {Account} from './account.model';


//inherits everything from the basic account model
@Table
export class Customer extends Account {}
