'use strict'

class ProyectoController {
    async index({ auth }) {
        const user = await auth.getUser();
        console.log(user.id);
        return await user.proyectos().fetch();
    }
}

module.exports = ProyectoController
