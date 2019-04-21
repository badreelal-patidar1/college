const Joi = require('joi');
const jwt = require('jsonwebtoken');
const College = require("../models").College
const BaseController = require("./baseController")
const responseSender = require("../middileware/responseSender")
const config = require("../config")
const operation = require("../models/index")
var op = operation.operatorsAliases;
var baseCtl = new BaseController();

module.exports.college = function (request, response) {
    baseCtl.getAll(College, att = [], response);
}

module.exports.createCollege = function (request, response) {
    body = {
        name: request.body.name,
        address: request.body.address,
        state: request.body.state,
        city: request.body.city,
        phoneNo: request.body.phoneNo
    }
    const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        address: Joi.string().alphanum().min(3).max(50).required(),
        state: Joi.string().alphanum().min(3).max(50).required(),
        city: Joi.string().alphanum().min(3).max(50).required(),
        phoneNo: Joi.string().min(10).max(12).regex(/^((\+?){1}(91)?)([1-9]{1}[0-9]{9})$/),
    }).with('name', ['address', 'state', 'city', 'phoneNo'])

    const result = Joi.validate(body, schema);
    if (result.error === null) {
        College.findAll({
            attributes: ['name'],
            where: {
                name: body.name
            }, raw: true
        }).then(res => {
            if (res && res.length > 0) {

                responseSender(response, false, 409, "name already exists", null)
            } else {
                baseCtl.create(College, body, response)
            }
        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.deleteCollege = function (request, response) {
    body = {
        id: request.body.id
    }
    const schema = Joi.object().keys({
        id: Joi.number().required()
    }).with('id', []);

    const result = Joi.validate(body, schema);
    if (result.error == null) {
        College.findAll({
            attributes: ['id'],
            where: {
                id: body.id
            }, raw: true
        }).then(res => {
            if (res && res.length == 0) {
                responseSender(response, false, 409, "College already deleted", null)
            } else {
                baseCtl.delete(College, body.id, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.updateCollege = function (request, response) {
    body = {
        id: request.body.id
    }
    const schema = Joi.object().keys({
        id: Joi.number().required()
    }).with('id', []);

    const result = Joi.validate(body, schema);
    if (result.error == null) {
        College.findAll({
            attributes: ['id'],
            where: {
                id: body.id
            }, raw: true
        }).then(res => {
            if (res && res.length == 0) {
                responseSender(response, false, 409, "College not found", null)
            } else {
                baseCtl.update(College, body, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.getById = function (request, response) {
    body = {
        id: request.body.id
    }
    const schema = Joi.object().keys({
        id: Joi.number().required()
    }).with('id', []);

    const result = Joi.validate(body, schema);
    if (error == null) {
        where = { "id": body.id }
        baseCtl.getSingle(College, where, response);
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}