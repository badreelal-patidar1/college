const Joi = require('joi');
const jwt = require('jsonwebtoken');
const User = require("../models").User
const BaseController = require("./baseController")
const responseSender = require("../middileware/responseSender")
const config = require("../config")
const operation = require("../models/index")
var op = operation.operatorsAliases;
var baseCtl = new BaseController();
const secret="onemanarmy";
module.exports.login = function (request, response) {
    body = {
        email: request.body.email,
        password: request.body.password
    }
    const schema = Joi.object().keys({
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    }).with('email', ['password']);

    const result = Joi.validate(body, schema);
    if (result.error == null) {

        User.findAll({
            where: {
                [op.$and]: [{ email: body.email }, { password: body.password }]
            }, raw: true
        }).then(res => {
            if (res.length>0) {
                console.log(res)
                let token = jwt.sign({ email: body.email },
                   secret,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                response.json({
                    status: true,
                    code: 200,
                    message: 'Authentication successful!',
                    token: token,
                    data:{
                        user:{
                            firstName:res[0].firstName,
                            lastName:res[0].lastName,
                            email:res[0].email,
                            phoneNo:res[0].phoneNo
                        }}
                },
                );
            } else {
                responseSender(response, false, 403, 'Incorrect email or password', null)
            }
        }).catch(err => {
            console.log(err)
        })

    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.users = function (request, response) {
    baseCtl.getAll(User,att=[], response);
}

module.exports.createUser = function (request, response) {
    console.log("xcalled")
    body = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        dob: request.body.dob,
        phoneNo: request.body.phoneNo,
        gender: request.body.gender,
        roleId: request.body.roleId
    }
    const schema = Joi.object().keys({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        dob: Joi.string(),
        phoneNo: Joi.string().min(10).max(12).regex(/^((\+?){1}(91)?)([1-9]{1}[0-9]{9})$/),
        gender: Joi.string(),
        roleId: Joi.number().required()
    }).with('firstName', ['lastName', 'email', 'password', 'dob', 'phoneNo', 'gender', "roleId"])

    const result = Joi.validate(body, schema);
    console.log("result",result)
    if (result.error === null) {
        User.findAll({
            attributes: ['email'],
            where: {
                email: body.email
            }, raw: true
        }).then(res => {
            
            if (res && res.length > 0) {

                responseSender(response, false, 409, "Email already taken", null)
            } else {
            
                baseCtl.create(User, body, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })



    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)

    }

}

module.exports.deleteUser = function (request, response) {
    body = {
        id: request.body.id
    }
    const schema = Joi.object().keys({
        id: Joi.number().required()
    }).with('id', []);

    const result = Joi.validate(body, schema);
    if (result.error == null) {
        User.findAll({
            attributes: ['id'],
            where: {
                id: body.id
            }, raw: true
        }).then(res => {
            if (res && res.length == 0) {
                responseSender(response, false, 409, "User already deleted", null)
            } else {
                baseCtl.delete(User, body.id, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}

module.exports.updateUser = function (request, response) {
    body = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        dob: request.body.dob,
        phoneNo: request.body.phoneNo,
        gender: request.body.gender,
        roleId: request.body.roleId,
        id:request.body.id
    }
    const schema = Joi.object().keys({
        firstName: Joi.string().alphanum().min(3).max(30).required(),
        lastName: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        dob: Joi.string(),
        phoneNo: Joi.string().min(10).max(12).regex(/^((\+?){1}(91)?)([1-9]{1}[0-9]{9})$/),
        gender: Joi.string(),
        roleId: Joi.number().required(),
        id:Joi.number().required()
    }).with('firstName', ['lastName', 'email', 'password', 'dob', 'phoneNo', 'gender', "roleId","id"])
   
    const result = Joi.validate(body, schema);
    if (result.error == null) {
        User.findAll({
            attributes: ['id'],
            where: {
                id: body.id
            }, raw: true
        }).then(res => {
            if (res && res.length == 0) {
                responseSender(response, false, 409, "User not found", null)
            } else {
                baseCtl.update(User, body, response)
            }

        }).catch(err => {
            responseSender(response, false, 400, "some thing went wrong", null)
        })
    } else {
        error = result.error.details[0]['message']
        responseSender(response, false, 400, error, null)
    }
}