'use strict'

const Proyecto = use('App/Models/Proyecto');

class ProyectoController {
    async index({ auth }) {
        const user = await auth.getUser(); //obtiene usuario
        console.log(user.id); //muestra num de usuario en la terminal
        return await user.proyectos().fetch(); //devuelve el usuario al cliente
    }

    async create({ auth, request }) {
        const user = await auth.getUser(); //obtiene usuario
        const { nombre } = request.all(); //captura de request los parametros
        const proyecto = new Proyecto(); //crea nueva instancia de proyecto
        proyecto.fill({ //autorellena el nombre a partir de los param. capturados
            nombre
        })
        await user.proyectos().save(proyecto); //guarda
        return proyecto //devuelve al usuario el proyecto
    }
}

module.exports = ProyectoController
