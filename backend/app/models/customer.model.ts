import {Table} from 'sequelize-typescript';
import {Account} from './account.model';

@Table
export class Customer extends Account {}