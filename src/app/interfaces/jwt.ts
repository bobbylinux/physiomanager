import { UserInterface } from './user.interface';

export interface Jwt {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: UserInterface;
}