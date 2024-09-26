'use strict'

const User = use('App/Models/User');

class UserController {
    store({ request }){
        const {email, password} = request.all();
        const user = User.create({
            username: email, // El usuario es el mismo que el mail
            email,
            password,
        });
        return user;
    };
}

module.exports = UserController
