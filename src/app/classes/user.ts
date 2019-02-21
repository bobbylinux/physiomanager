import { UserInterface } from "../interfaces/user.interface";

export class User implements UserInterface {
    email: string;
    name: string;
    password: string;
    admin: boolean;
    
    constructor() {
        this.email = "";
        this.name = "";
        this.password = "";
        this.admin = false;
    }
}