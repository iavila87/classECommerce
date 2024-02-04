export default class UsersDTO {
    constructor(user) {
        this.first_name = user.first_name;
        this.email = user.email;
        this.role = user.role;
        this.last_connection = user.last_connection;
    }
}