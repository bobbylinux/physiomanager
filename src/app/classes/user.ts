import { UserInterface } from "../interfaces/user.interface";

export class User implements UserInterface {
    email: string;
    name: string;
    password: string;
    
    constructor() {
        this.email = "";
        this.name = "";
        this.password = "";
    }
}