const Joi = require('joi');
const jwt = require('jsonwebtoken');
const Marksheet = require("../models").Marksheet
const BaseController = require("./baseController")
const responseSender = require("../middileware/responseSender")
const config = require("../config")
const operation = require("../models/index")
var op = operation.operatorsAliases;
var baseCtl = new BaseController();

module.exports.marksheet = function (request, response) {
    baseCtl.getAll(Marksheet,att=[], response);
}

module.exports.createMarksheet = function (request, response) {
    body = {
        rollNo: request.body.rollNo,
        name: request.body.name,
        physics: request.body.physics,
        chemistry: request.body.chemistry,
        maths: request.body.maths,
        studentId: request.body.studentId
    }
    const schema = Joi.object().keys({
        rollNo: Joi.string().alphanum().min(3).max(30).required(),
        name: Joi.string().alphanum().min(3).max(30).required(),
        physics: Joi.string().regex(/^[0-9][0-9]?$|^100$/).required(),
        chemistry: Joi.string().regex(/^[0-9][0-9]?$|^100$/).required(),
        maths: Joi.string().regex(/^[0-9][0-9]?$|^100$/).required(),
        studentId: Joi.number().required(),

    }).with('rollNo', ['name', 'physics', 'chemistry', 'maths', 'studentId'])

    const result = Joi.validate(body, schema);
    if (result.error === null) {
        baseCtl.create(Marksheet, body, response)
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.deleteMarksheet = function (request, response) {
    body = {
        id: request.body.id
    }
    const schema = Joi.object().keys({
        id: Joi.number().required()
    }).with('id', []);

    const result = Joi.validate(body, schema);
    if (result.error == null) {
        Marksheet.findAll({
            attributes: ['id'],
            where: {
                id: body.id
            }, raw: true
        }).then(res => {
            if (res && res.length == 0) {
                responseSender(response, false, 409, "Marksheet already deleted", null)
            } else {
                baseCtl.delete(Marksheet, body.id, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.updateMarksheet = function (request, response) {
    body = {
        id: request.body.id
    }
    const schema = Joi.object().keys({
        id: Joi.number().required()
    }).with('id', []);

    const result = Joi.validate(body, schema);
    if (result.error == null) {
        Marksheet.findAll({
            attributes: ['id'],
            where: {
                id: body.id
            }, raw: true
        }).then(res => {
            if (res && res.length == 0) {
                responseSender(response, false, 409, "Marksheet not found", null)
            } else {
                baseCtl.update(Marksheet, body, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}