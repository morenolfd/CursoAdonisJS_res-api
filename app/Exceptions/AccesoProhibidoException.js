'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccesoProhibidoException extends LogicalException {
  handle (error, { response }) {
    return response.status(403).json({
      error:"Acceso no permitido al recurso."
    })
  }
}

module.exports = AccesoProhibidoException
