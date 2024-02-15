export class UserDTO {
    username: string;
    email: string;
    role: string;

    constructor(username: string, email: string, role: string){
        this.email = email;
        this.username = username;
        this.role = role;
    }
}