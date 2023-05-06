import { User } from './user';

export interface Users {
  data: Array<User>;
  total: number;
  page: number;
  limit: number;
}
