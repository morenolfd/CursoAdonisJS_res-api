'use strict'

const Proyecto = use('App/Models/Proyecto');
const User = use('App/Models/User')
const AutorizacionService = use ('App/Services/AutorizacionService');

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

    async destroy({ auth, params}){
        const user = await auth.getUser();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto,user);
        await proyecto.delete();
        return proyecto;
    }
}

module.exports = ProyectoController
