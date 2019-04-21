const Joi = require('joi');
const jwt = require('jsonwebtoken');
const Student = require("../models").Student
const BaseController = require("./baseController")
const responseSender = require("../middileware/responseSender")
const config = require("../config")
const operation = require("../models/index")
var op = operation.operatorsAliases;
var baseCtl = new BaseController();

module.exports.student = function (request, response) {
    att = ["id",
        "collegeId",
        "collegeName",
        "firstName",
        "lastName",
        "dob",
        "email",
        "password",
        "gender",
        "phoneNo"]
    baseCtl.getAll(Student,att, response);
}

module.exports.createStudent = function (request, response) {
    body = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        collegeName: request.body.collegeName,
        email: request.body.email,
        password: request.body.password,
        dob: request.body.dob,
        phoneNo: request.body.phoneNo,
        gender: request.body.gender,
        collegeId: request.body.collegeId

    }
    const schema = Joi.object().keys({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        collegeName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        dob: Joi.string(),
        phoneNo: Joi.string().min(10).max(12).regex(/^((\+?){1}(91)?)([1-9]{1}[0-9]{9})$/),
        gender: Joi.string(),
        collegeId: Joi.number().required()
    }).with('firstName', ['lastName', 'email', 'password', 'dob', 'phoneNo', 'gender', "collegeId"])

    const result = Joi.validate(body, schema);
    if (result.error === null) {
        Student.findAll({
            attributes: ['email'],
            where: {
                email: body.email
            }, raw: true
        }).then(res => {
            console.log(res)
            if (res && res.length > 0) {

                responseSender(response, false, 409, "Email already taken", null)
            } else {
                baseCtl.create(Student, body, response)
            }

        }).catch(err => {
            console.log(err)
            responseSender(response, false, 400, "some thing went wrong", null)
        })

    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.deleteStudent = function (request, response) {
    body = {
        id: request.body.id
    }
    const schema = Joi.object().keys({
        id: Joi.number().required()
    }).with('id', []);

    const result = Joi.validate(body, schema);
    if (result.error == null) {
        Student.findAll({
            attributes: ['id'],
            where: {
                id: body.id
            }, raw: true
        }).then(res => {
            if (res && res.length == 0) {
                responseSender(response, false, 409, "Student already deleted", null)
            } else {
                baseCtl.delete(Student, body.id, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.updateStudent = function (request, response) {
    body = {
        id: request.body.id
    }
    const schema = Joi.object().keys({
        id: Joi.number().required()
    }).with('id', []);

    const result = Joi.validate(body, schema);
    if (result.error == null) {
        Student.findAll({
            attributes: ['id'],
            where: {
                id: body.id
            }, raw: true
        }).then(res => {
            if (res && res.length == 0) {
                responseSender(response, false, 409, "Student not found", null)
            } else {
                baseCtl.update(Student, body, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}