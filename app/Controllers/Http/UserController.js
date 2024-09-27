'use strict'

const User = use('App/Models/User');

class UserController {

    async login({ request, auth }) {
        const {email, password} = request.all();
        const token = await auth.attempt(email,password)
        return token;
    }

    async store({ request }){
        const {email, password} = request.all();
        const user = await User.create({
            username: email, // El usuario es el mismo que el mail
            email,
            password,
        });
        return this.login(...arguments);
    };
}

module.exports = UserController
