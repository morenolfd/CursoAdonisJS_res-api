'use strict'

const Proyecto = use('App/Models/Proyecto');
const User = use('App/Models/User')

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

    async destroy({ auth, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const proyecto = await Proyecto.find(id);
        if(proyecto.user_id !== user.id){
            return response.status(403).json({
                mensaje: "No puedes eliminar un proyecto del cual no eres dueño"
            });
        }
        await proyecto.delete();
        return proyecto;
    }
}

module.exports = ProyectoController
