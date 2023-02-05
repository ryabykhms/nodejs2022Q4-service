import { User } from './users.entity';

export type SafeUser = Omit<User, 'password'>;
