'use strict'

const Proyecto = use('App/Models/Proyecto');
const AutorizacionService = use('App/Services/AutorizacionService');
const Tarea = use('App/Models/Tarea');

class TareaController {
    async create({ auth, request, response, params}){
        const user = await auth.getUser();
        const { id } = params;
        const { descripcion } = request.all();
        const proyecto = await Proyecto.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        const tarea = new Tarea();
        tarea.fill({
            descripcion
        });
        await proyecto.tareas().save(tarea);
        return tarea;
    }
}

module.exports = TareaController
