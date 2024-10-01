'use strict'

class ProyectoController {
    async index({ auth }) {
        const user = await auth.getUser();
        console.log(user);
        return { mensaje: "estamos en proyectoController.index" }
    }
}

module.exports = ProyectoController
