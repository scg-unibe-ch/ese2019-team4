import {Table} from 'sequelize-typescript';
import {Account} from './account.model';

@Table
export class Provider extends Account {}
