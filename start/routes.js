'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// permite la respuesta desde api/v1/usuarios/registro
Route.group(() => {
  Route.post('usuarios/registro', 'UserController.store');
  Route.post('usuarios/login', 'UserController.login'); 

  // Rutas de los proyectos
  Route.get('proyectos','ProyectoController.index').middleware('auth'); //middleware
  Route.post('proyectos','ProyectoController.create').middleware('auth'); //middleware
  Route.delete('proyectos/:id','ProyectoController.destroy').middleware('auth'); //middleware
  Route.patch('proyectos/:id','ProyectoController.update').middleware('auth'); //middleware

  // Rutas de las tareas
  Route.get('proyectos/:id/tareas','TareaController.index').middleware('auth'); //middleware
  Route.post('proyectos/:id/tareas','TareaController.create').middleware('auth'); //middleware
  Route.patch('tareas/:id','TareaController.update').middleware('auth'); //middleware
  Route.delete('tareas/:id','TareaController.destroy').middleware('auth'); //middleware
}).prefix('api/v1/');
/*
  Un middleware es una función que se ejecuta antes de que se procese la lógica de la ruta. 
  En este caso, auth es un middleware que verifica si la solicitud contiene un token JWT 
  válido y si ese token corresponde a un usuario existente en la base de datos. Si el token 
  no es válido o no está presente, el middleware bloqueará el acceso a la ruta y retornará 
  un error de autenticación.
*/