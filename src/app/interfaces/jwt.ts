export interface Jwt {
    access_token: string;
    token_type: string;
    expires_in: number;
    name: string;
    email: string;
}